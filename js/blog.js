/**
 * blog.js — Logika halaman Blog
 * ================================
 * Menangani daftar artikel, filter kategori, pencarian,
 * dan render detail artikel dari data.js
 */

document.addEventListener('DOMContentLoaded', () => {

  // Tentukan halaman mana yang sedang aktif
  const isBlogList = document.getElementById('blog-list-page');
  const isPostPage = document.getElementById('post-detail-page');

  if (isBlogList) initBlogList();
  if (isPostPage) initPostDetail();

});


/* ============================================================
   BLOG LIST PAGE
   ============================================================ */

function initBlogList() {
  if (typeof SITE_DATA === 'undefined') return;

  const posts    = SITE_DATA.posts;
  const profile  = SITE_DATA.profile;

  // Render header info
  const headerName = document.getElementById('blog-header-name');
  if (headerName) headerName.textContent = profile.name;

  // Kumpulkan semua kategori unik
  const categories = ['Semua', ...new Set(posts.map(p => p.category))];

  // Render filter buttons
  const filtersEl = document.getElementById('category-filters');
  if (filtersEl) {
    filtersEl.innerHTML = categories.map((cat, i) => `
      <button
        class="filter-btn ${i === 0 ? 'active' : ''}"
        data-category="${cat}"
      >${cat}</button>
    `).join('');

    // Event listener filter
    filtersEl.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
    });
  }

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => applyFilters());
  }

  // Initial render
  renderAllPosts(posts);

  function applyFilters() {
    const activeCategory = filtersEl
      ? filtersEl.querySelector('.filter-btn.active')?.dataset.category || 'Semua'
      : 'Semua';
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = posts.filter(post => {
      const matchCategory = activeCategory === 'Semua' || post.category === activeCategory;
      const matchSearch   = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery) ||
        post.excerpt.toLowerCase().includes(searchQuery);
      return matchCategory && matchSearch;
    });

    renderAllPosts(filtered);
  }
}


function renderAllPosts(posts) {
  const featuredEl = document.getElementById('featured-post');
  const gridEl     = document.getElementById('posts-grid');
  const emptyEl    = document.getElementById('posts-empty');

  if (!gridEl) return;

  if (posts.length === 0) {
    if (featuredEl) featuredEl.innerHTML = '';
    gridEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  // Featured post (pertama)
  const [featured, ...rest] = posts;

  if (featuredEl) {
    featuredEl.innerHTML = `
      <a href="post.html?id=${featured.id}" class="post-featured reveal">
        <div class="post-featured-image" style="background:${featured.cover_color}20">
          <div class="img-bg" style="background:${featured.cover_color}"></div>
          <div class="post-number">01</div>
          <span class="featured-badge">✦ Featured</span>
        </div>
        <div class="post-featured-body">
          <span class="post-category">${featured.category}</span>
          <h2>${featured.title}</h2>
          <p class="post-excerpt">${featured.excerpt}</p>
          <div class="post-meta">
            <span>${featured.date_display}</span>
            <div class="post-meta-dot"></div>
            <span>${featured.read_time} baca</span>
          </div>
        </div>
      </a>
    `;
  }

  // Sisa post dalam grid
  if (rest.length > 0) {
    gridEl.innerHTML = rest.map((post, i) => `
      <a href="post.html?id=${post.id}" class="post-card reveal reveal-delay-${(i % 3) + 1}">
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
  } else {
    gridEl.innerHTML = '';
  }

  // Re-trigger reveal animations
  reObserveAllReveal();
}


/* ============================================================
   POST DETAIL PAGE
   ============================================================ */

function initPostDetail() {
  if (typeof SITE_DATA === 'undefined') return;

  // Ambil ID dari URL query string
  const params  = new URLSearchParams(window.location.search);
  const postId  = params.get('id');
  const posts   = SITE_DATA.posts;

  if (!postId) {
    showNotFound();
    return;
  }

  const postIndex = posts.findIndex(p => p.id === postId);
  const post      = posts[postIndex];

  if (!post) {
    showNotFound();
    return;
  }

  // Update page title & meta
  document.title = `${post.title} — ${SITE_DATA.profile.name}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = post.excerpt;

  // Render hero
  const heroCategory = document.getElementById('post-hero-category');
  if (heroCategory) heroCategory.textContent = post.category;

  const heroTitle = document.getElementById('post-hero-title');
  if (heroTitle) heroTitle.textContent = post.title;

  const heroDate = document.getElementById('post-date');
  if (heroDate) heroDate.textContent = post.date_display;

  const heroReadTime = document.getElementById('post-read-time');
  if (heroReadTime) heroReadTime.textContent = post.read_time + ' baca';

  const heroBg = document.getElementById('post-hero-bg');
  if (heroBg) heroBg.style.background = `radial-gradient(ellipse at center, ${post.cover_color}30 0%, transparent 70%)`;

  // Render konten artikel
  const contentEl = document.getElementById('article-content');
  if (contentEl) contentEl.innerHTML = post.content;

  // Render navigasi prev/next
  renderPostNav(posts, postIndex);

  // Update nav logo
  const logoMark = document.querySelectorAll('.logo-mark');
  logoMark.forEach(el => el.textContent = SITE_DATA.profile.initials);
  const logoText = document.querySelectorAll('.logo-text');
  logoText.forEach(el => el.textContent = SITE_DATA.profile.name);
}


function renderPostNav(posts, currentIndex) {
  const navEl = document.getElementById('post-nav');
  if (!navEl) return;

  const prev = posts[currentIndex + 1] || null;
  const next = posts[currentIndex - 1] || null;

  navEl.innerHTML = `
    ${prev ? `
      <a href="post.html?id=${prev.id}" class="post-nav-item">
        <div class="post-nav-label">← Tulisan sebelumnya</div>
        <div class="post-nav-title">${prev.title}</div>
      </a>
    ` : '<div></div>'}
    ${next ? `
      <a href="post.html?id=${next.id}" class="post-nav-item next">
        <div class="post-nav-label">Tulisan berikutnya →</div>
        <div class="post-nav-title">${next.title}</div>
      </a>
    ` : '<div></div>'}
  `;
}


function showNotFound() {
  const mainEl = document.querySelector('main');
  if (mainEl) {
    mainEl.innerHTML = `
      <div style="text-align:center;padding:160px 32px">
        <div style="font-size:4rem;margin-bottom:16px">404</div>
        <h2>Artikel tidak ditemukan</h2>
        <p style="margin:16px 0 32px;color:var(--color-text-muted)">
          Mungkin artikelnya sudah dipindahkan atau URL-nya salah.
        </p>
        <a href="index.html" class="btn btn-primary">← Kembali ke Blog</a>
      </div>
    `;
  }
}


/* ============================================================
   HELPER — Reobserve Reveal (setelah DOM update)
   ============================================================ */
function reObserveAllReveal() {
  const els = document.querySelectorAll('.reveal:not(.observed)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

  els.forEach(el => {
    el.classList.add('observed');
    obs.observe(el);
  });
}
