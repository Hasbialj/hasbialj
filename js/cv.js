/**
 * cv.js — Render data dari SITE_DATA ke halaman CV ATS-Friendly
 * =============================================================
 * Membaca SITE_DATA yang telah dimuat dari data.js dan
 * mengisi elemen-elemen di cv.html secara otomatis.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof SITE_DATA === 'undefined') {
    console.error('SITE_DATA tidak ditemukan. Pastikan data.js dimuat sebelum cv.js.');
    return;
  }

  renderCvHeader();
  renderCvSummary();
  renderCvExperience();
  renderCvProjects();
  renderCvEducation();
  renderCvSkills();
  renderCvCertificates();
});


// ----------------------------------------------------------------
// HEADER: Nama, Kontak, Sosial
// ----------------------------------------------------------------
function renderCvHeader() {
  const p = SITE_DATA.profile;

  // Nama
  const nameEl = document.getElementById('cv-name');
  if (nameEl) nameEl.textContent = p.name;

  // Update title tag
  document.title = `${p.name} — Resume ATS`;

  // Kontak
  const contactEl = document.getElementById('cv-contact');
  if (contactEl) {
    const parts = [];
    if (p.email)    parts.push(`<a href="mailto:${p.email}">${p.email}</a>`);
    if (p.phone)    parts.push(`<a href="tel:${p.phone}">${p.phone}</a>`);
    if (p.location) parts.push(p.location);
    if (p.address)  parts.push(p.address);
    contactEl.innerHTML = parts.join(' &nbsp;|&nbsp; ');
  }

  // Sosial
  const socialsEl = document.getElementById('cv-socials');
  if (socialsEl && p.socials) {
    socialsEl.innerHTML = p.socials.map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener">${s.name}: ${s.url.replace('https://', '')}</a>`
    ).join(' &nbsp;|&nbsp; ');
  }
}


// ----------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------
function renderCvSummary() {
  const p = SITE_DATA.profile;
  const el = document.getElementById('cv-summary');
  if (!el) return;

  const summary = p.bio_long ? p.bio_long.join(' ') : p.bio_short || '';
  el.innerHTML = `<p class="cv-summary-text">${summary}</p>`;
}


// ----------------------------------------------------------------
// EXPERIENCE (timeline type="work" dan type="milestone")
// ----------------------------------------------------------------
function renderCvExperience() {
  const el = document.getElementById('cv-experience');
  if (!el || !SITE_DATA.timeline) return;

  const workItems = SITE_DATA.timeline.filter(t => t.type === 'work');

  if (workItems.length === 0) {
    el.innerHTML = '<p style="color:#888;font-size:13px">Belum ada data pengalaman kerja.</p>';
    return;
  }

  el.innerHTML = workItems.map(item => {
    // Pecah desc berdasarkan titik menjadi bullet points
    const bullets = item.desc
      .split('. ')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => `<li style="margin-bottom:4px">${s.endsWith('.') ? s : s + '.'}</li>`)
      .join('');

    return `
      <div class="cv-item">
        <div class="cv-item-header">
          <div>
            <div class="cv-item-title">${item.title}</div>
            <div class="cv-item-org">${item.org} &mdash; ${item.location}</div>
          </div>
          <div class="cv-item-year">${item.year}</div>
        </div>
        <ul style="margin-top:6px;padding-left:16px;font-size:13px;color:#555;line-height:1.7;">
          ${bullets}
        </ul>
        ${item.tags && item.tags.length ? `
          <div class="cv-item-tags">
            ${item.tags.map(t => `<span class="cv-tag">${t}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}


// ----------------------------------------------------------------
// PROJECTS
// ----------------------------------------------------------------
function renderCvProjects() {
  const el = document.getElementById('cv-projects');
  if (!el || !SITE_DATA.projects) return;

  el.innerHTML = SITE_DATA.projects.map(item => `
    <div class="cv-item">
      <div class="cv-item-header">
        <div>
          <div class="cv-item-title">${item.title}</div>
          <div class="cv-item-org">${item.category}</div>
        </div>
        <div class="cv-item-year">${item.year}</div>
      </div>
      <p class="cv-item-desc">${item.description}</p>
      ${item.tech && item.tech.length ? `
        <div class="cv-item-tags">
          ${item.tech.map(t => `<span class="cv-tag">${t}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
}


// ----------------------------------------------------------------
// EDUCATION (timeline type="education")
// ----------------------------------------------------------------
function renderCvEducation() {
  const el = document.getElementById('cv-education');
  if (!el || !SITE_DATA.timeline) return;

  const eduItems = SITE_DATA.timeline.filter(t => t.type === 'education');

  if (eduItems.length === 0) {
    el.innerHTML = '<p style="color:#888;font-size:13px">Belum ada data pendidikan.</p>';
    return;
  }

  el.innerHTML = eduItems.map(item => `
    <div class="cv-item">
      <div class="cv-item-header">
        <div>
          <div class="cv-item-title">${item.title}</div>
          <div class="cv-item-org">${item.org} &mdash; ${item.location}</div>
        </div>
        <div class="cv-item-year">${item.year}</div>
      </div>
      <p class="cv-item-desc">${item.desc}</p>
    </div>
  `).join('');
}


// ----------------------------------------------------------------
// SKILLS
// ----------------------------------------------------------------
function renderCvSkills() {
  const el = document.getElementById('cv-skills');
  if (!el || !SITE_DATA.skills) return;

  const catLabels = { technical: 'Technical Skills', creative: 'Creative Skills', soft: 'Soft Skills' };
  const grouped = {};

  SITE_DATA.skills.forEach(skill => {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
  });

  let html = '';
  Object.entries(grouped).forEach(([cat, skills]) => {
    html += `
      <div style="margin-bottom:14px">
        <div style="font-size:11px;font-weight:700;color:#888;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">${catLabels[cat] || cat}</div>
        <div style="font-size:13px;color:#222;line-height:1.8;">
          ${skills.map(s => `<span style="display:inline-block;margin-right:8px;">${s.name}</span>`).join('<span style="color:#ccc;">|</span> ')}
        </div>
      </div>
    `;
  });

  el.innerHTML = html;
}


// ----------------------------------------------------------------
// CERTIFICATES & ACHIEVEMENTS
// ----------------------------------------------------------------
function renderCvCertificates() {
  const el = document.getElementById('cv-certificates');
  if (!el || !SITE_DATA.certificates) return;

  el.innerHTML = SITE_DATA.certificates.map(cert => `
    <div class="cv-cert-item">
      <div>
        <div class="cv-cert-title">${cert.title}</div>
        <div class="cv-cert-issuer">${cert.issuer}</div>
      </div>
      <div class="cv-cert-year">${cert.year}</div>
    </div>
  `).join('');
}
