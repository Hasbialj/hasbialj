/**
 * main.js — Interaksi Global
 * ===========================
 * Custom cursor, scroll progress, navigasi, reveal animations,
 * skill bar animations, form kontak, dan rendering konten dari data.js
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // CUSTOM CURSOR
  // ============================================================
  const cursorDot  = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  // Hanya aktifkan di perangkat pointer (bukan touchscreen)
  if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left  = mouseX + 'px';
      cursorDot.style.top   = mouseY + 'px';
    });

    // Ring follows with lerp (smooth lag)
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect pada elemen interaktif
    const hoverTargets = document.querySelectorAll('a, button, .post-card, .timeline-item, .value-card, .filter-btn');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '1';
    });
  }

  // ============================================================
  // SCROLL PROGRESS BAR
  // ============================================================
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled    = (window.scrollY / scrollTotal) * 100;
      scrollProgress.style.width = scrolled + '%';
    }, { passive: true });
  }

  // ============================================================
  // NAVBAR — Scrolled State & Active Link
  // ============================================================
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // Active nav link berdasarkan scroll section
  const sections   = document.querySelectorAll('section[id]');
  const navLinks   = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  // ============================================================
  // HAMBURGER MENU (Mobile)
  // ============================================================
  const navToggle  = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Tutup menu saat klik link
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================================
  // THEME TOGGLE (Dark/Light Mode)
  // ============================================================
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.theme-icon-sun');
  const moonIcon = document.querySelector('.theme-icon-moon');

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  }

  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      
      // Update icons
      if (sunIcon) sunIcon.style.display = isLight ? 'none' : 'block';
      if (moonIcon) moonIcon.style.display = isLight ? 'block' : 'none';
      
      // Save to localStorage
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // ============================================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ============================================================
  // SKILL BAR ANIMATIONS
  // ============================================================
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level;
          entry.target.style.width = level + '%';
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => barObserver.observe(bar));
  }

  // ============================================================
  // CONTACT FORM
  // ============================================================
  const contactForm    = document.getElementById('contact-form');
  const formSuccess    = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      btn.textContent = 'Mengirim...';
      btn.disabled = true;

      // Simulasi pengiriman (ganti dengan fetch ke endpoint nyata)
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.classList.add('show');
      }, 1500);
    });
  }

  // ============================================================
  // RENDER KONTEN DARI data.js
  // ============================================================
  if (typeof SITE_DATA !== 'undefined') {
    renderHero();
    renderAbout();
    renderExperience();
    renderProjects();
    renderCertificates();
    renderBlogPreview();
    renderContact();
    renderFooter();
  }

  // ============================================================
  // SMOOTH ANCHOR SCROLL
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

}); // end DOMContentLoaded


/* ============================================================
   RENDER FUNCTIONS
   ============================================================ */

function renderHero() {
  const p = SITE_DATA.profile;

  // Badge lokasi
  const badge = document.querySelector('.hero-badge-text');
  if (badge) badge.textContent = `Tersedia untuk proyek — ${p.location}`;

  // Nama
  const nameEl = document.getElementById('hero-name');
  if (nameEl) {
    const firstName = p.name.split(' ')[0];
    const lastName  = p.name.split(' ').slice(1).join(' ');
    nameEl.innerHTML = `${firstName}<br><span class="highlight">${lastName}</span>`;
  }

  // Profesi
  const profEl = document.getElementById('hero-profession');
  if (profEl) profEl.textContent = p.profession;

  // Tagline
  const tagEl = document.getElementById('hero-tagline');
  if (tagEl) tagEl.textContent = p.tagline;

  // Logo/nav
  const logoText = document.querySelectorAll('.logo-text');
  logoText.forEach(el => el.textContent = p.name);

  const logoMark = document.querySelectorAll('.logo-mark');
  logoMark.forEach(el => el.textContent = p.initials);
}


function renderAbout() {
  const p = SITE_DATA.profile;

  // Bio paragraphs
  const bioContainer = document.getElementById('about-bio');
  if (bioContainer) {
    bioContainer.innerHTML = p.bio_long.map(para => `<p class="reveal">${para}</p>`).join('');
  }

  // Values
  const valuesContainer = document.getElementById('about-values');
  if (valuesContainer) {
    valuesContainer.innerHTML = p.values.map((v, i) => `
      <div class="value-card reveal reveal-delay-${i + 1}">
        <div class="value-icon">${v.icon}</div>
        <div class="value-content">
          <h4>${v.label}</h4>
          <p>${v.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // Profile card
  const avatarEl = document.getElementById('profile-avatar');
  if (avatarEl) {
    if (p.photo) {
      avatarEl.innerHTML = `<img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    } else {
      avatarEl.textContent = p.initials;
    }
  }

  const profileName = document.getElementById('profile-name');
  if (profileName) profileName.textContent = p.name;

  const profileProf = document.getElementById('profile-profession');
  if (profileProf) profileProf.textContent = p.profession;

  const profileLoc = document.getElementById('profile-location');
  if (profileLoc) profileLoc.textContent = p.location;

  const profileEmail = document.getElementById('profile-email');
  if (profileEmail) {
    profileEmail.textContent = p.email;
    profileEmail.href = `mailto:${p.email}`;
  }

  const profilePhone = document.getElementById('profile-phone');
  if (profilePhone && p.phone) {
    profilePhone.textContent = p.phone;
    profilePhone.href = `tel:${p.phone}`;
  }

  // Interests
  const interestsContainer = document.getElementById('interests-tags');
  if (interestsContainer) {
    interestsContainer.innerHTML = p.interests.map(i => `<span class="tag">${i}</span>`).join('');
  }
}


function renderExperience() {
  const { skills, timeline } = SITE_DATA;

  // Skills
  const skillsContainer = document.getElementById('skills-list');
  if (skillsContainer && skills) {
    const categories = [...new Set(skills.map(s => s.category))];
    const catLabels  = { technical: 'Technical', creative: 'Creative', soft: 'Soft Skills' };

    let html = '';
    categories.forEach(cat => {
      html += `<div class="skill-category-sep">${catLabels[cat] || cat}</div>`;
      skills.filter(s => s.category === cat).forEach(skill => {
        html += `
          <div class="skill-item reveal">
            <div class="skill-header">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-bar-fill" data-level="${skill.level}" style="width:0%"></div>
            </div>
          </div>
        `;
      });
    });
    skillsContainer.innerHTML = html;
  }

  // Timeline
  const timelineContainer = document.getElementById('timeline');
  if (timelineContainer && timeline) {
    const typeIcons = {
      work: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
      education: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>`,
      milestone: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`
    };

    timelineContainer.innerHTML = timeline.map(item => `
      <div class="timeline-item reveal" data-type="${item.type}">
        <div class="timeline-dot">${typeIcons[item.type] || ''}</div>
        <div class="timeline-body">
          <div class="timeline-meta">
            <span class="timeline-year">${item.year}</span>
            <span class="timeline-type-badge badge-${item.type}">${item.type === 'work' ? 'Karir' : item.type === 'education' ? 'Pendidikan' : 'Pencapaian'}</span>
          </div>
          <div class="timeline-title">${item.title}</div>
          <div class="timeline-org">${item.org} · ${item.location}</div>
          <p class="timeline-desc">${item.desc}</p>
          <div class="timeline-tags">
            ${item.tags.map(t => `<span class="timeline-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Re-observe reveal elements setelah render
  reObserveReveal();
  reObserveSkillBars();
}


function renderProjects() {
  const projects = SITE_DATA.projects;
  const projectsContainer = document.getElementById('projects-grid');
  
  if (!projectsContainer || !projects) return;
  
  projectsContainer.innerHTML = projects.map((project, i) => `
    <div class="project-card reveal reveal-delay-${(i % 3) + 1}">
      <div class="project-category">${project.category}</div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tech">
        ${project.tech.map(t => `<span>${t}</span>`).join('')}
      </div>
      <div class="project-footer">
        <span class="project-year">${project.year}</span>
        <div class="project-links">
          ${project.url ? `<a href="${project.url}" target="_blank" rel="noopener" title="View Project">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>` : ''}
          ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" title="View Code">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
  
  reObserveReveal();
}


function renderCertificates() {
  const certs   = SITE_DATA.certificates;
  const gridEl  = document.getElementById('cert-grid');
  const filterEl = document.getElementById('cert-filters');
  if (!gridEl || !certs) return;

  // Kumpulkan kategori unik
  const categories = ['Semua', ...new Set(certs.map(c => c.category))];
  const catLabels  = { teknologi: 'Teknologi', kepemimpinan: 'Kepemimpinan', pelatihan: 'Pelatihan', penghargaan: 'Penghargaan' };

  // Render filter buttons
  if (filterEl) {
    filterEl.innerHTML = categories.map((cat, i) =>
      `<button class="cert-filter-btn ${i === 0 ? 'active' : ''}" data-cat="${cat}">${i === 0 ? 'Semua' : (catLabels[cat] || cat)}</button>`
    ).join('');

    filterEl.querySelectorAll('.cert-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterEl.querySelectorAll('.cert-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selected = btn.dataset.cat;
        const filtered = selected === 'Semua' ? certs : certs.filter(c => c.category === selected);
        renderCertGrid(filtered, gridEl);
      });
    });
  }

  // Render initial
  renderCertGrid(certs, gridEl);
}

function renderCertGrid(certs, container) {
  container.innerHTML = certs.map((cert, i) => `
    <div class="cert-card reveal reveal-delay-${(i % 3) + 1}">
      <div class="cert-card-top">
        <span class="cert-icon">${cert.icon}</span>
        <span class="cert-category-badge cert-cat-${cert.category}">${cert.category}</span>
      </div>
      <div class="cert-title">${cert.title}</div>
      <div class="cert-issuer">${cert.issuer}</div>
      <div class="cert-card-footer">
        <span class="cert-year">${cert.year}</span>
        ${cert.url
          ? `<a href="${cert.url}" target="_blank" rel="noopener" class="cert-link">
               Lihat
               <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
             </a>`
          : `<span class="cert-year" style="color:var(--color-text-faint)">✓ Verified</span>`
        }
      </div>
    </div>
  `).join('');
  reObserveReveal();
}


function renderBlogPreview() {
  const container = document.getElementById('blog-preview-grid');
  if (!container || !SITE_DATA.posts) return;

  const posts = SITE_DATA.posts.slice(0, 3);
  container.innerHTML = posts.map((post, i) => `
    <a href="blog/post.html?id=${post.id}" class="post-card reveal reveal-delay-${i + 1}">
      <div class="post-card-top">
        <span class="post-category">${post.category}</span>
        <span class="post-read-time">${post.read_time}</span>
      </div>
      <h3>${post.title}</h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-card-footer">
        <span class="post-date">${post.date_display}</span>
        <div class="post-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </a>
  `).join('');

  reObserveReveal();
}


function renderContact() {
  const p = SITE_DATA.profile;

  // Social links
  const socialLinksEl = document.getElementById('social-links');
  if (socialLinksEl && p.socials) {
    const svgIcons = getSocialIcons();
    socialLinksEl.innerHTML = p.socials.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="contact-link">
        <div class="contact-link-icon">
          ${svgIcons[s.icon] || ''}
        </div>
        <div>
          <div style="font-weight:500;color:var(--color-text);font-size:0.9rem">${s.name}</div>
          <div style="font-size:0.78rem;color:var(--color-text-faint);font-family:var(--font-mono)">${s.url.replace('https://', '')}</div>
        </div>
        <svg style="margin-left:auto;width:14px;height:14px;color:var(--color-text-faint)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
      </a>
    `).join('');
  }

  // Email link
  const emailLinkEl = document.getElementById('email-link');
  if (emailLinkEl) {
    emailLinkEl.href = `mailto:${p.email}`;
    emailLinkEl.querySelector('span') && (emailLinkEl.querySelector('span').textContent = p.email);
  }
}


function renderFooter() {
  const p = SITE_DATA.profile;

  const footerName = document.getElementById('footer-name');
  if (footerName) footerName.textContent = `© ${new Date().getFullYear()} ${p.name}`;

  const footerSocials = document.getElementById('footer-socials');
  if (footerSocials && p.socials) {
    const svgIcons = getSocialIcons();
    footerSocials.innerHTML = p.socials.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-btn" title="${s.name}">
        ${svgIcons[s.icon] || s.name[0]}
      </a>
    `).join('');
  }
}


/* ============================================================
   HELPERS
   ============================================================ */

function reObserveReveal() {
  const newRevealEls = document.querySelectorAll('.reveal:not(.observed)');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  newRevealEls.forEach(el => {
    el.classList.add('observed');
    revealObs.observe(el);
  });
}

function reObserveSkillBars() {
  const newBars = document.querySelectorAll('.skill-bar-fill:not(.observed)');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.dataset.level;
        entry.target.style.width = level + '%';
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  newBars.forEach(bar => {
    bar.classList.add('observed');
    barObs.observe(bar);
  });
}

function getSocialIcons() {
  return {
    github: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`,
    linkedin: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    twitter: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    instagram: `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`
  };
}
