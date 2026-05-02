// ── SHARED LAYOUT ──
// Injects nav, footer, WhatsApp button into every non-admin page
(function(){
  if(document.body.classList.contains('admin-page')){initCore();return;}

  const NAV_HTML=`<nav class="nav" id="main-nav">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-icon">A</div>
      <div class="nav-logo-text">Amana Cab's<small>Hyderabad</small></div>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="packages.html">Packages</a></li>
      <li><a href="fleet.html">Fleet</a></li>
      <li><a href="about.html">About Us</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-right">
      <span class="nav-phone">📞 <b>+91 98765 43210</b></span>
      <a href="booking.html" class="nav-cta">Book a Trip</a>
    </div>
    <div class="nav-burger" id="nav-burger"><span></span><span></span><span></span></div>
  </nav>
  <div class="mob-menu" id="mob-menu">
    <a href="index.html">🏠 Home</a>
    <a href="packages.html">📦 Packages</a>
    <a href="fleet.html">🚗 Fleet</a>
    <a href="about.html">ℹ️ About</a>
    <a href="contact.html">📞 Contact</a>
    <a href="booking.html" class="mob-book">✅ Book a Trip</a>
  </div>`;

  const FOOTER_HTML=`<footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="fb-logo"><div class="fb-icon">A</div><div class="fb-text">Amana Cab's<small>Hyderabad</small></div></div>
          <p>Driven by Comfort, Defined by Class. Your trusted travel partner across Hyderabad for city rides, airport transfers, and outstation journeys.</p>
          <div class="f-social">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="YouTube">📺</a>
            <a href="https://wa.me/919876543210" aria-label="WhatsApp">💬</a>
          </div>
        </div>
        <div class="f-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="packages.html">Packages</a></li>
            <li><a href="fleet.html">Our Fleet</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="booking.html">Book a Trip</a></li>
          </ul>
        </div>
        <div class="f-col">
          <h4>Services</h4>
          <ul>
            <li><a href="packages.html">4 Hr / 40 Km City</a></li>
            <li><a href="packages.html">8 Hr / 80 Km Full Day</a></li>
            <li><a href="packages.html">Airport Pickup/Drop</a></li>
            <li><a href="packages.html">Outstation Trips</a></li>
            <li><a href="packages.html">Corporate Travel</a></li>
            <li><a href="packages.html">Tour Packages</a></li>
          </ul>
        </div>
        <div class="f-col">
          <h4>Contact</h4>
          <div class="f-contact-row"><span class="icon">📞</span><p>+91 98765 43210<br>+91 98765 43211</p></div>
          <div class="f-contact-row"><span class="icon">✉️</span><p>hello@amanacabs.in</p></div>
          <div class="f-contact-row"><span class="icon">📍</span><p>Hyderabad, Telangana, India</p></div>
          <div class="f-contact-row"><span class="icon">⏰</span><p>24 × 7 Available</p></div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Amana Cab's. All rights reserved. | Driven by Comfort, Defined by Class.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="admin.html">Admin Login</a>
        </div>
      </div>
    </div>
  </footer>`;

  const WA=`<a href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20book%20a%20cab%20with%20Amana%20Cab's" class="wa-float" target="_blank" title="WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>`;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML + WA);
  initCore();
})();

function initCore(){
  // Active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob-menu a').forEach(a=>{
    if(a.getAttribute('href')===page) a.classList.add('active');
  });
  // Solid nav on inner pages
  const isHome = page==='' || page==='index.html';
  const nav = document.getElementById('main-nav');
  if(nav && !isHome) nav.classList.add('solid');
  // Scroll
  window.addEventListener('scroll',()=>{
    if(nav) nav.classList.toggle('scrolled', window.scrollY>60);
  });
  // Mobile menu
  const burger = document.getElementById('nav-burger');
  const mob = document.getElementById('mob-menu');
  if(burger && mob){
    burger.addEventListener('click', e=>{e.stopPropagation(); mob.classList.toggle('open');});
    document.addEventListener('click', e=>{
      if(!burger.contains(e.target)&&!mob.contains(e.target)) mob.classList.remove('open');
    });
  }
  // Reveal on scroll
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  // Toast helper
  window.showToast = function(msg, type='ok'){
    let t = document.querySelector('.toast');
    if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);}
    t.textContent=msg; t.className=`toast ${type} show`;
    setTimeout(()=>t.classList.remove('show'),3500);
  };
}
