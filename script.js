  // ── Side nav config ──
  const sections = [
    { id: 'home',     label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact',  label: 'Contact' },
  ];

  // Build side nav
  const sideNav = document.getElementById('sideNav');
  sections.forEach((sec, i) => {
    const item = document.createElement('div');
    item.className = 'side-nav-item';
    item.dataset.target = sec.id;
    item.innerHTML = `<div class="dot"><span class="dot-label">${sec.label}</span></div>`;
    item.addEventListener('click', () =>
      document.getElementById(sec.id).scrollIntoView({ behavior: 'smooth' })
    );
    sideNav.appendChild(item);

    if (i < sections.length - 1) {
      const line = document.createElement('div');
      line.className = 'side-nav-line';
      sideNav.appendChild(line);
    }
  });

  // Active state
  const topLinks = document.querySelectorAll('.nav-links a');

  function updateActive() {
    let current = sections[0].id;
    sections.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el && window.scrollY >= el.offsetTop - window.innerHeight * 0.45) {
        current = sec.id;
      }
    });

    document.querySelectorAll('.side-nav-item').forEach(item =>
      item.classList.toggle('active', item.dataset.target === current)
    );
    topLinks.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + current)
    );
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .project').forEach(el => observer.observe(el));