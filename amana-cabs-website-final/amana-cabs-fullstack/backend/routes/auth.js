// ─── AUTH ROUTES ───
// Admin login → returns a JWT token

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

// ─── POST /api/auth/login ───
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const valid = bcrypt.compareSync(password, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate token (24 hours)
    const token = jwt.sign(
      { id: admin.id, username: admin.username, name: admin.name, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      admin: { id: admin.id, username: admin.username, name: admin.name, role: admin.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─── POST /api/auth/verify ─── verify if token is still valid
router.get('/verify', (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ valid: false });

  try {
    const decoded = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    return res.json({ valid: true, admin: decoded });
  } catch {
    return res.status(401).json({ valid: false });
  }
});

module.exports = router;
