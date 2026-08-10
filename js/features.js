/**
 * features.js — Fitur Tambahan
 * ============================
 * 1. UI Sound Effects
 * 2. Command Palette (Ctrl+K)
 * 3. Project Detail Modal
 * 4. Testimonials Render
 * 5. CLI Terminal Widget
 */


/* =====================================================
   1. UI SOUND EFFECTS
   ===================================================== */
let soundEnabled = localStorage.getItem('sound') !== 'off';
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let _audioCtx = null;

function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new AudioCtx();
  return _audioCtx;
}

function playBeep(freq, type, dur, vol) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq || 440, ctx.currentTime);
    gain.gain.setValueAtTime(vol || 0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (dur || 0.06));
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + (dur || 0.06));
  } catch(e) {}
}

const SFX = {
  click:   function() { playBeep(800, 'sine', 0.05, 0.06); },
  open:    function() { playBeep(660, 'sine', 0.1, 0.08); },
  close:   function() { playBeep(330, 'sine', 0.08, 0.05); },
  select:  function() { playBeep(1100, 'triangle', 0.07, 0.06); },
  success: function() { playBeep(880, 'sine', 0.08, 0.07); setTimeout(function() { playBeep(1100, 'sine', 0.1, 0.07); }, 90); },
  error:   function() { playBeep(200, 'sawtooth', 0.12, 0.08); },
};

function initSoundToggle() {
  var btn = document.getElementById('sound-toggle');
  var iconOn  = document.getElementById('sound-icon-on');
  var iconOff = document.getElementById('sound-icon-off');
  if (!btn) return;

  function updateUI() {
    if (soundEnabled) {
      if (iconOn)  iconOn.style.display  = 'block';
      if (iconOff) iconOff.style.display = 'none';
      btn.classList.remove('muted');
    } else {
      if (iconOn)  iconOn.style.display  = 'none';
      if (iconOff) iconOff.style.display = 'block';
      btn.classList.add('muted');
    }
  }
  updateUI();

  btn.addEventListener('click', function() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('sound', soundEnabled ? 'on' : 'off');
    updateUI();
    if (soundEnabled) SFX.success();
  });
}


/* =====================================================
   2. COMMAND PALETTE
   ===================================================== */
function initCommandPalette() {
  var overlay   = document.getElementById('cmd-overlay');
  var palette   = document.getElementById('cmd-palette');
  var input     = document.getElementById('cmd-input');
  var resultsList = document.getElementById('cmd-results');
  var trigger   = document.getElementById('cmd-palette-trigger');
  if (!palette || !input || !resultsList) return;

  var activeIdx = -1;
  var allItems  = [];

  function smoothScrollTo(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    var offset = 72;
    var top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function buildIndex() {
    var items = [];
    // Navigation
    [
      { icon: '🏠', label: 'Beranda',         sub: 'Navigasi', target: '#hero' },
      { icon: '👤', label: 'Tentang Saya',    sub: 'Navigasi', target: '#about' },
      { icon: '📋', label: 'CV & Pengalaman', sub: 'Navigasi', target: '#experience' },
      { icon: '💼', label: 'Portfolio',        sub: 'Navigasi', target: '#projects' },
      { icon: '🏆', label: 'Sertifikat',      sub: 'Navigasi', target: '#certificates' },
      { icon: '✍️', label: 'Blog',            sub: 'Navigasi', target: '#blog-preview' },
      { icon: '💬', label: 'Kontak',          sub: 'Navigasi', target: '#contact' },
    ].forEach(function(n) {
      items.push({ icon: n.icon, label: n.label, sub: n.sub, action: function() { smoothScrollTo(n.target); } });
    });

    // Actions
    items.push(
      { icon: '📄', label: 'Unduh CV ATS',          sub: 'Aksi', action: function() { window.open('cv.html', '_blank'); } },
      { icon: '🌙', label: 'Toggle Dark/Light Mode', sub: 'Aksi', action: function() { document.getElementById('theme-toggle') && document.getElementById('theme-toggle').click(); } },
      { icon: '🌐', label: 'Ganti Bahasa (ID/EN)',   sub: 'Aksi', action: function() { document.getElementById('lang-toggle') && document.getElementById('lang-toggle').click(); } },
      { icon: '💻', label: 'Buka Terminal CLI',      sub: 'Aksi', action: function() { toggleTerminal(); } }
    );

    // Projects
    if (typeof SITE_DATA !== 'undefined' && SITE_DATA.projects) {
      SITE_DATA.projects.forEach(function(p) {
        var pid = p.id;
        items.push({ icon: '🗂️', label: p.title, sub: 'Project · ' + p.category + ' · ' + p.year, action: function() { openProjectModal(pid); } });
      });
    }

    // Certificates
    if (typeof SITE_DATA !== 'undefined' && SITE_DATA.certificates) {
      SITE_DATA.certificates.slice(0, 8).forEach(function(c) {
        items.push({ icon: c.icon || '🎓', label: c.title, sub: 'Sertifikat · ' + c.issuer, action: function() { smoothScrollTo('#certificates'); } });
      });
    }

    return items;
  }

  function renderResults(query) {
    resultsList.innerHTML = '';
    activeIdx = -1;
    var q = (query || '').toLowerCase();
    var filtered = q
      ? allItems.filter(function(i) { return i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q); })
      : allItems.slice(0, 10);

    // Group
    var groups = {};
    filtered.forEach(function(item) {
      var g = item.sub.split(' · ')[0];
      if (!groups[g]) groups[g] = [];
      groups[g].push(item);
    });

    var idx = 0;
    Object.keys(groups).forEach(function(group) {
      var groupEl = document.createElement('li');
      groupEl.className = 'cmd-item-group';
      groupEl.textContent = group;
      resultsList.appendChild(groupEl);

      groups[group].forEach(function(item) {
        var li = document.createElement('li');
        li.className = 'cmd-item';
        li.setAttribute('role', 'option');
        li.dataset.idx = idx;
        li.innerHTML = '<div class="cmd-item-icon">' + item.icon + '</div><div><div>' + item.label + '</div><div class="cmd-item-meta">' + item.sub + '</div></div>';
        var capturedItem = item;
        li.addEventListener('mousedown', function(e) {
          e.preventDefault();
          SFX.select();
          capturedItem.action();
          closePalette();
        });
        resultsList.appendChild(li);
        idx++;
      });
    });
  }

  function openPalette() {
    allItems = buildIndex();
    palette.style.display = 'block';
    if (overlay) overlay.classList.add('open');
    SFX.open();
    renderResults('');
    setTimeout(function() { input.focus(); }, 50);
    document.body.style.overflow = 'hidden';
  }

  function closePalette() {
    palette.style.display = 'none';
    if (overlay) overlay.classList.remove('open');
    SFX.close();
    input.value = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      palette.style.display === 'none' ? openPalette() : closePalette();
    }
    if (e.key === 'Escape' && palette.style.display !== 'none') closePalette();

    if (palette.style.display !== 'none') {
      var items = resultsList.querySelectorAll('.cmd-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        items.forEach(function(el, i) { el.classList.toggle('active', i === activeIdx); });
        if (items[activeIdx]) items[activeIdx].scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        items.forEach(function(el, i) { el.classList.toggle('active', i === activeIdx); });
        if (items[activeIdx]) items[activeIdx].scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'Enter' && activeIdx >= 0 && items[activeIdx]) {
        items[activeIdx].dispatchEvent(new Event('mousedown'));
      }
    }
  });

  if (trigger) trigger.addEventListener('click', function() { palette.style.display === 'none' ? openPalette() : closePalette(); });
  if (overlay) overlay.addEventListener('mousedown', closePalette);
  if (input)   input.addEventListener('input', function() { renderResults(input.value); });
}


/* =====================================================
   3. PROJECT DETAIL MODAL
   ===================================================== */
var PROJECT_DETAILS = {
  'beligadget': {
    features: ['Shopping cart dengan session management', 'Integrasi payment gateway Midtrans', 'Manajemen produk & kategori admin', 'Sistem order dan tracking status', 'Responsive design mobile-friendly'],
    fullDesc: 'Platform e-commerce lengkap untuk penjualan gadget dengan integrasi payment gateway Midtrans. Dibangun menggunakan CodeIgniter 3 dengan arsitektur MVC. Fitur mencakup manajemen produk, keranjang belanja, proses checkout, dan sistem pembayaran online.'
  },
  'sistem-rekomendasi-bahan-masakan': {
    features: ['Algoritma rekomendasi berbasis preferensi pengguna', 'Database bahan masakan & resep komprehensif', 'Filter berdasarkan kategori & ketersediaan bahan', 'Antarmuka pencarian yang intuitif', 'Project Tugas Akhir / Skripsi'],
    fullDesc: 'Sistem berbasis web yang membantu pengguna menemukan resep masakan berdasarkan bahan yang mereka miliki. Menggunakan algoritma rekomendasi untuk menyarankan kombinasi bahan yang optimal. Dibangun sebagai proyek tugas akhir di Universitas Langlangbuana.'
  },
  'bimbel-adhiwikarta': {
    features: ['Manajemen data siswa & pengajar', 'Penjadwalan kelas otomatis', 'Sistem pembayaran & laporan keuangan', 'Dashboard admin komprehensif', 'Notifikasi jadwal & tagihan'],
    fullDesc: 'Aplikasi manajemen operasional untuk lembaga bimbingan belajar Adhiwikarta. Memudahkan pengelolaan data siswa, penjadwalan kelas, dan pencatatan pembayaran secara digital menggantikan pencatatan manual.'
  },
  'perpustakaan': {
    features: ['Katalog buku digital dengan pencarian canggih', 'Sistem peminjaman & pengembalian otomatis', 'Manajemen denda keterlambatan', 'Laporan inventaris perpustakaan', 'Panel admin lengkap'],
    fullDesc: 'Sistem manajemen perpustakaan digital yang membantu pengelola dalam mengelola koleksi buku, transaksi peminjaman, dan pengembalian. Dilengkapi sistem laporan dan manajemen denda otomatis.'
  },
  'catshop081': {
    features: ['Katalog produk hewan peliharaan', 'Sistem manajemen stok produk', 'Halaman detail produk informatif', 'Panel admin pengelolaan produk', 'Desain ramah pengguna'],
    fullDesc: 'Platform online shop khusus produk kebutuhan hewan peliharaan. Menyediakan katalog produk lengkap dengan sistem manajemen inventaris yang memudahkan pemilik toko mengelola produk dan stok.'
  },
  'personal-portfolio': {
    features: ['Dark/Light mode dengan localStorage', 'Typing animation & scroll reveal', 'Toggle Bahasa Indonesia / English', 'Command Palette (Ctrl+K) interaktif', 'CLI Terminal Widget', 'Filter portfolio & sertifikat', 'CV ATS-friendly', 'Fully responsive'],
    fullDesc: 'Website portfolio profesional yang sedang Anda lihat ini! Dibangun dari nol menggunakan Vanilla HTML, CSS, dan JavaScript tanpa framework apapun. Menampilkan pengalaman, proyek, dan sertifikat secara interaktif dengan berbagai fitur modern.'
  }
};

function openProjectModal(projectId) {
  var overlay = document.getElementById('modal-overlay');
  var modal   = document.getElementById('project-modal');
  var content = document.getElementById('modal-content');
  if (!modal || !content) return;

  var project = (typeof SITE_DATA !== 'undefined') ? SITE_DATA.projects.find(function(p) { return p.id === projectId; }) : null;
  var details = PROJECT_DETAILS[projectId];
  if (!project) return;

  SFX.open();

  var techHtml = project.tech.map(function(t) { return '<span>' + t + '</span>'; }).join('');
  var featuresHtml = details && details.features
    ? '<div class="modal-features"><h4>Fitur Utama</h4><ul>' + details.features.map(function(f) { return '<li>' + f + '</li>'; }).join('') + '</ul></div>'
    : '';

  var actions = '';
  if (project.url) actions += '<a href="' + project.url + '" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:0.85rem">Lihat Live &#8594;</a>';
  if (project.github) actions += '<a href="' + project.github + '" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.85rem">GitHub</a>';

  content.innerHTML =
    '<span class="modal-tag">' + project.category + '</span>' +
    '<h2 class="modal-title">' + project.title + '</h2>' +
    '<p class="modal-desc">' + (details && details.fullDesc ? details.fullDesc : project.description) + '</p>' +
    '<div class="modal-tech-list">' + techHtml + '</div>' +
    featuresHtml +
    '<div class="modal-actions">' + actions + '<span style="margin-left:auto;font-size:0.82rem;color:var(--color-text-faint);align-self:center">' + project.year + '</span></div>';

  if (overlay) { overlay.style.display = 'block'; }
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(function() {
    if (overlay) overlay.classList.add('open');
    modal.classList.add('open');
  });
}

function closeProjectModal() {
  var overlay = document.getElementById('modal-overlay');
  var modal   = document.getElementById('project-modal');
  if (!modal) return;
  SFX.close();
  if (overlay) overlay.classList.remove('open');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(function() {
    if (overlay) overlay.style.display = 'none';
    modal.style.display = 'none';
  }, 260);
}

function initProjectModal() {
  var closeBtn = document.getElementById('modal-close');
  var overlay  = document.getElementById('modal-overlay');
  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (overlay)  overlay.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeProjectModal(); });
}

function initProjectClickHandlers() {
  var grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.addEventListener('click', function(e) {
    var card = e.target.closest('.project-card');
    if (!card) return;
    var titleEl = card.querySelector('.project-title');
    if (!titleEl || typeof SITE_DATA === 'undefined') return;
    var project = SITE_DATA.projects.find(function(p) { return p.title === titleEl.textContent; });
    if (project) openProjectModal(project.id);
  });
}


/* =====================================================
   4. TESTIMONIALS RENDER
   ===================================================== */
function renderTestimonials() {
  var container = document.getElementById('testimonials-grid');
  if (!container || typeof SITE_DATA === 'undefined' || !SITE_DATA.testimonials) return;

  container.innerHTML = SITE_DATA.testimonials.map(function(t, i) {
    return '<div class="testi-card reveal reveal-delay-' + (i + 1) + '">' +
      '<div class="testi-stars">' + '&#9733;'.repeat(t.rating) + '</div>' +
      '<p class="testi-text">&ldquo;' + t.text + '&rdquo;</p>' +
      '<div class="testi-author">' +
        '<div class="testi-avatar" style="background:' + t.color + '">' + t.avatar + '</div>' +
        '<div><div class="testi-name">' + t.name + '</div><div class="testi-role">' + t.role + '</div></div>' +
      '</div></div>';
  }).join('');

  if (typeof reObserveReveal === 'function') reObserveReveal();
}


/* =====================================================
   5. CLI TERMINAL WIDGET
   ===================================================== */
var terminalOpen = false;

function toggleTerminal() {
  var widget = document.getElementById('terminal-widget');
  if (!widget) return;
  terminalOpen = !terminalOpen;
  if (terminalOpen) {
    widget.style.display = 'flex';
    SFX.open();
    var body = document.getElementById('terminal-body');
    if (body && body.children.length === 0) initTerminalWelcome();
    setTimeout(function() { var inp = document.getElementById('terminal-input'); if(inp) inp.focus(); }, 100);
  } else {
    widget.style.display = 'none';
    SFX.close();
  }
}

function appendTerminalLine(html) {
  var body = document.getElementById('terminal-body');
  if (!body) return;
  var div = document.createElement('div');
  div.className = 't-line';
  div.innerHTML = html;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function initTerminalWelcome() {
  appendTerminalLine('<span class="t-success">Selamat datang di Terminal Portfolio Hasbial!</span>');
  appendTerminalLine('<span class="t-info">v1.0.0 &mdash; Ketik <span class="t-highlight">\'help\'</span> untuk melihat perintah.</span>');
  appendTerminalLine('<span class="t-output">&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;&mdash;</span>');
}

function escapeHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function processTerminalCmd(cmd) {
  var c = cmd.trim().toLowerCase();
  appendTerminalLine('<span class="t-prompt">&#10145;</span> <span class="t-cmd">' + escapeHtml(cmd) + '</span>');

  if (c === 'help') {
    var cmds = [['help','Tampilkan daftar perintah'],['skills','Lihat daftar keahlian'],['contact','Info kontak'],['projects','Daftar proyek'],['about','Tentang Hasbial'],['cv','Buka CV ATS'],['clear','Bersihkan terminal'],['sudo hire-me','&#127919; ???']];
    cmds.forEach(function(pair) { appendTerminalLine('<span class="t-highlight" style="min-width:120px;display:inline-block">' + pair[0] + '</span>  <span class="t-output">' + pair[1] + '</span>'); });
  } else if (c === 'skills') {
    appendTerminalLine('<span class="t-info">&#9889; Keahlian Teknis:</span>');
    if (typeof SITE_DATA !== 'undefined') {
      SITE_DATA.skills.filter(function(s) { return s.category === 'technical'; }).slice(0, 6).forEach(function(s) {
        var fill = Math.floor(s.level / 10);
        var bar = '&#9608;'.repeat(fill) + '&#9617;'.repeat(10 - fill);
        appendTerminalLine('<span class="t-output" style="min-width:200px;display:inline-block">' + escapeHtml(s.name) + '</span> <span class="t-success">' + bar + '</span> <span class="t-highlight">' + s.level + '%</span>');
      });
    }
  } else if (c === 'contact') {
    appendTerminalLine('<span class="t-info">&#128235; Info Kontak:</span>');
    appendTerminalLine('<span class="t-output">Email   : <span class="t-highlight">bhie.dia@gmail.com</span></span>');
    appendTerminalLine('<span class="t-output">Phone   : <span class="t-highlight">+62 896-2818-8728</span></span>');
    appendTerminalLine('<span class="t-output">GitHub  : <span class="t-highlight">github.com/Hasbialj</span></span>');
    appendTerminalLine('<span class="t-output">LinkedIn: <span class="t-highlight">linkedin.com/in/hasbial-jamil</span></span>');
  } else if (c === 'about') {
    appendTerminalLine('<span class="t-info">&#128100; Hasbial Jamil Mardia Putra</span>');
    appendTerminalLine('<span class="t-output">Software Developer &amp; IT Support dari Bandung, Jawa Barat.</span>');
    appendTerminalLine('<span class="t-output">S1 Teknik Informatika &mdash; Universitas Langlangbuana (2022&ndash;2026).</span>');
    appendTerminalLine('<span class="t-output">Pengalaman: Operasional gudang, Web dev, IT Support.</span>');
  } else if (c === 'projects') {
    appendTerminalLine('<span class="t-info">&#128188; Daftar Proyek:</span>');
    if (typeof SITE_DATA !== 'undefined') {
      SITE_DATA.projects.forEach(function(p, i) {
        appendTerminalLine('<span class="t-highlight">' + (i+1) + '. ' + escapeHtml(p.title) + '</span> <span class="t-output">(' + p.year + ')</span>');
      });
    }
  } else if (c === 'cv') {
    appendTerminalLine('<span class="t-success">&#10003; Membuka halaman CV ATS...</span>');
    setTimeout(function() { window.open('cv.html', '_blank'); }, 500);
  } else if (c === 'clear') {
    var body = document.getElementById('terminal-body');
    if (body) body.innerHTML = '';
  } else if (c === 'sudo hire-me') {
    SFX.success();
    var msgs = [
      '<span class="t-success">&#127919; Executing: hire Hasbial Jamil...</span>',
      '<span class="t-output">&#10003; Checking skills............. <span class="t-success">PASS</span></span>',
      '<span class="t-output">&#10003; Verifying experience......... <span class="t-success">PASS</span></span>',
      '<span class="t-output">&#10003; Personality assessment....... <span class="t-success">PASS</span></span>',
      '<span class="t-output">&#10003; Culture fit analysis......... <span class="t-success">PASS</span></span>',
      '<span class="t-success">&#128640; Hasbial siap bergabung dengan tim Anda!</span>',
      '<span class="t-info">&#8594; Hubungi: bhie.dia@gmail.com</span>',
    ];
    msgs.forEach(function(msg, i) { setTimeout(function() { appendTerminalLine(msg); }, i * 280); });
  } else if (c === '') {
    // empty, do nothing
  } else {
    SFX.error();
    appendTerminalLine('<span class="t-error">bash: ' + escapeHtml(cmd) + ': command not found</span>');
    appendTerminalLine('<span class="t-output">Ketik <span class="t-highlight">\'help\'</span> untuk melihat perintah.</span>');
  }
}

function initTerminal() {
  var fab      = document.getElementById('terminal-fab');
  var closeBtn = document.getElementById('terminal-close-btn');
  var input    = document.getElementById('terminal-input');

  if (fab)      fab.addEventListener('click', toggleTerminal);
  if (closeBtn) closeBtn.addEventListener('click', toggleTerminal);

  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var cmd = input.value;
        input.value = '';
        processTerminalCmd(cmd);
      }
    });
  }
}


/* =====================================================
   PROJECT CARD CLICK STYLE INJECTION
   ===================================================== */
(function injectProjectCardStyle() {
  var style = document.createElement('style');
  style.textContent = '.project-card { cursor: pointer; }.project-card::after { content: "Lihat Detail \u2192"; position: absolute; bottom: 16px; right: 16px; font-size: 0.72rem; color: var(--color-primary); font-weight: 600; opacity: 0; transition: opacity 0.2s; }.project-card:hover::after { opacity: 1; }';
  document.head.appendChild(style);
})();


/* =====================================================
   INIT ALL FEATURES
   ===================================================== */
document.addEventListener('DOMContentLoaded', function() {
  initSoundToggle();
  initCommandPalette();
  initProjectModal();
  initProjectClickHandlers();
  renderTestimonials();
  initTerminal();
});
