require('dotenv').config();

const db = require('./database/db');

const runTest = () => {
  try {
    const bookingCount = db.prepare('SELECT COUNT(*) AS count FROM bookings').get();
    const contactCount = db.prepare('SELECT COUNT(*) AS count FROM contact_messages').get();
    const adminCount = db.prepare('SELECT COUNT(*) AS count FROM admins').get();

    console.log('✅ SQLite connectivity test passed!');
    console.log(`  - bookings rows: ${bookingCount.count}`);
    console.log(`  - contact_messages rows: ${contactCount.count}`);
    console.log(`  - admins rows: ${adminCount.count}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ SQLite connectivity test failed.');
    console.error(error);
    process.exit(1);
  }
};

runTest();
