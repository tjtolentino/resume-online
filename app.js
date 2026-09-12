/**
 * RESUME APPLICATION CONTROLLER
 * Handles rendering, theme toggling, view mode switching,
 * skill filtering, search, copy toast, and live edit mode.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderResume();
  initViewSwitcher();
  initSkillSearch();
  initCopyActions();
  initLiveEdit();
});

/* ==========================================================================
   THEME MANAGEMENT (Dark / Light)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('resume-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const nowDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('resume-theme', nowDark ? 'dark' : 'light');
      updateThemeIcon();
      showToast(nowDark ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
    });
  }
}

function updateThemeIcon() {
  const iconSpan = document.getElementById('theme-icon');
  const isDark = document.documentElement.classList.contains('dark');
  if (iconSpan) {
    iconSpan.innerHTML = isDark 
      ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
      : `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
  }
}

/* ==========================================================================
   VIEW MODES: EXECUTIVE VS CLEAN PAPER VIEW
   ========================================================================== */
function initViewSwitcher() {
  const btnExecutive = document.getElementById('view-executive-btn');
  const btnPaper = document.getElementById('view-paper-btn');
  const btnPrint = document.getElementById('print-resume-btn');
  const execCanvas = document.getElementById('executive-canvas');
  const paperCanvas = document.getElementById('paper-canvas');

  if (btnExecutive) {
    btnExecutive.addEventListener('click', () => {
      document.body.classList.remove('view-paper');
      if (execCanvas) execCanvas.classList.remove('hidden');
      if (paperCanvas) paperCanvas.classList.add('hidden');
      btnExecutive.classList.add('bg-sky-500', 'text-white');
      btnExecutive.classList.remove('text-slate-600', 'dark:text-slate-400');
      btnPaper.classList.remove('bg-sky-500', 'text-white');
      btnPaper.classList.add('text-slate-600', 'dark:text-slate-400');
      showToast('🚀 Switched to Executive Portfolio View');
    });
  }

  if (btnPaper) {
    btnPaper.addEventListener('click', () => {
      document.body.classList.add('view-paper');
      if (execCanvas) execCanvas.classList.add('hidden');
      if (paperCanvas) paperCanvas.classList.remove('hidden');
      btnPaper.classList.add('bg-sky-500', 'text-white');
      btnPaper.classList.remove('text-slate-600', 'dark:text-slate-400');
      btnExecutive.classList.remove('bg-sky-500', 'text-white');
      btnExecutive.classList.add('text-slate-600', 'dark:text-slate-400');
      showToast('📄 Switched to Clean A4 Paper View (3 Pages)');
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   RENDER RESUME DATA
   ========================================================================== */
function renderResume() {
  if (typeof RESUME_DATA === 'undefined') {
    console.error('RESUME_DATA is not defined. Ensure resume-data.js is loaded.');
    return;
  }

  renderHeader(RESUME_DATA.personal);
  renderMetrics(RESUME_DATA.metrics);
  renderSummary(RESUME_DATA.summary);
  renderCompetencies(RESUME_DATA.competencies);
  renderExperience(RESUME_DATA.experience);
  renderCertifications(RESUME_DATA.certifications);
  renderAwards(RESUME_DATA.awards);
  renderEducation(RESUME_DATA.education);

  // Render Discrete A4 Sheets for Paper & Print View
  renderPaperSheets(RESUME_DATA);
}

function renderHeader(personal) {
  const container = document.getElementById('header-section');
  if (!container) return;

  container.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800 paper-divider">
      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white" id="person-name">
          ${escapeHtml(personal.name)}
        </h1>
        <p class="text-lg sm:text-xl font-semibold gradient-text-azure" id="person-title">
          ${escapeHtml(personal.title)}
        </p>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-2xl hide-in-paper">
          ${escapeHtml(personal.subtitle)}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row md:flex-col gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        <!-- Location -->
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span id="person-location">${escapeHtml(personal.location)}</span>
        </div>

        <!-- Phone -->
        <div class="flex items-center gap-2 group cursor-pointer" onclick="copyToClipboard('${escapeHtml(personal.phone)}', 'Phone number')">
          <svg class="w-4 h-4 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          <span class="hover:text-sky-500 transition-colors" id="person-phone">${escapeHtml(personal.phone)}</span>
          <span class="text-[10px] text-slate-400 group-hover:text-sky-500 no-print hide-in-paper">(copy)</span>
        </div>

        <!-- Email -->
        <div class="flex items-center gap-2 group cursor-pointer" onclick="copyToClipboard('${escapeHtml(personal.email)}', 'Email address')">
          <svg class="w-4 h-4 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          <a href="mailto:${escapeHtml(personal.email)}" class="hover:text-sky-500 transition-colors" id="person-email">${escapeHtml(personal.email)}</a>
          <span class="text-[10px] text-slate-400 group-hover:text-sky-500 no-print hide-in-paper">(copy)</span>
        </div>

        <!-- LinkedIn -->
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          <a href="${escapeHtml(personal.linkedinUrl)}" target="_blank" rel="noopener noreferrer" class="hover:text-sky-500 underline underline-offset-4 decoration-sky-500/40 transition-colors" id="person-linkedin">
            ${escapeHtml(personal.linkedin)}
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderMetrics(metrics) {
  const container = document.getElementById('metrics-section');
  if (!container || !metrics || !metrics.length) return;

  container.innerHTML = `
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 pb-2 hide-in-paper">
      ${metrics.map(m => `
        <div class="surface-card rounded-xl p-3.5 flex flex-col justify-between border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/50 group">
          <div class="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>${escapeHtml(m.label)}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-sky-500/60 group-hover:scale-150 transition-transform"></span>
          </div>
          <div class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono tracking-tight text-sky-600 dark:text-sky-400">
            ${escapeHtml(m.value)}
          </div>
          <div class="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
            ${escapeHtml(m.desc)}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSummary(summary) {
  const container = document.getElementById('summary-section');
  if (!container) return;

  container.innerHTML = `
    <div class="surface-card rounded-2xl p-6 border-slate-200/80 dark:border-slate-800/80">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-2 h-2 rounded-full bg-sky-500"></div>
        <h2 class="text-xs uppercase tracking-widest font-bold text-sky-600 dark:text-sky-400 font-mono paper-h2">
          Professional Summary
        </h2>
      </div>
      <p class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
        ${escapeHtml(summary)}
      </p>
    </div>
  `;
}

function renderCompetencies(competencies) {
  const container = document.getElementById('competencies-section');
  if (!container) return;

  container.innerHTML = `
    <div class="surface-card rounded-2xl p-6 border-slate-200/80 dark:border-slate-800/80">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
          <h2 class="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono paper-h2">
            Core Technical Competencies
          </h2>
        </div>
        <span class="text-[11px] text-slate-400 hidden sm:inline-block no-print hide-in-paper">
          Click any skill to filter matching projects
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${competencies.map(group => `
          <div class="rounded-xl p-3.5 bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 avoid-break">
            <h3 class="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span class="w-1 h-3 rounded-full bg-sky-500"></span>
              ${escapeHtml(group.category)}
            </h3>
            <div class="flex flex-wrap gap-1.5">
              ${group.skills.map(skill => `
                <button 
                  type="button" 
                  onclick="filterBySkill('${escapeHtml(skill)}')" 
                  class="skill-chip text-xs px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-400 transition-all cursor-pointer select-none tech-tag"
                  data-skill="${escapeHtml(skill)}"
                >
                  ${escapeHtml(skill)}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderExperience(experience) {
  const container = document.getElementById('experience-section');
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
          <h2 class="text-sm uppercase tracking-widest font-bold text-sky-600 dark:text-sky-400 font-mono paper-h2">
            Professional Experience
          </h2>
        </div>
        <span class="text-xs text-slate-400 hide-in-paper no-print">15+ Years Enterprise Track Record</span>
      </div>

      <div class="relative pl-3 sm:pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
        ${experience.map((comp, compIdx) => `
          <div class="relative experience-item avoid-break" data-company="${escapeHtml(comp.company)}">
            <!-- Timeline dot -->
            <div class="absolute -left-[19px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-sky-500 ring-4 ring-white dark:ring-slate-950 no-print"></div>

            <div class="surface-card rounded-2xl p-5 sm:p-6 border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 transition-all">
              <!-- Company Header -->
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    ${escapeHtml(comp.company)}
                  </h3>
                  <span class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(comp.location)}</span>
                </div>
                <div class="text-xs sm:text-sm font-semibold font-mono text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md self-start sm:self-center">
                  ${escapeHtml(comp.period)}
                </div>
              </div>

              <!-- Roles within Company -->
              <div class="space-y-6">
                ${comp.roles.map(role => `
                  <div class="role-block avoid-break">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <h4 class="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        ${escapeHtml(role.title)}
                      </h4>
                      <span class="text-xs font-mono text-slate-500 dark:text-slate-400">${escapeHtml(role.period)}</span>
                    </div>

                    <ul class="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      ${role.highlights.map(item => `
                        <li class="experience-bullet flex items-start gap-2.5 group" data-tags="${(item.tags || []).join(',')}">
                          <span class="text-sky-500 font-bold leading-relaxed">•</span>
                          <div class="flex-1">
                            <span class="bullet-text">${highlightKeyTerms(item.text)}</span>
                            ${item.badge ? `
                              <span class="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 ml-1 badge-pill">
                                🚀 ${escapeHtml(item.badge)}
                              </span>
                            ` : ''}
                            ${item.tags && item.tags.length ? `
                              <div class="flex flex-wrap gap-1 mt-1.5 no-print hide-in-paper">
                                ${item.tags.map(t => `
                                  <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50 hover:text-sky-500 cursor-pointer" onclick="filterBySkill('${escapeHtml(t)}')">
                                    #${escapeHtml(t)}
                                  </span>
                                `).join('')}
                              </div>
                            ` : ''}
                          </div>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCertifications(certifications) {
  const container = document.getElementById('certifications-section');
  if (!container) return;

  container.innerHTML = `
    <div class="surface-card rounded-2xl p-6 border-slate-200/80 dark:border-slate-800/80 cert-section avoid-break">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
        <h2 class="text-xs uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400 font-mono paper-h2">
          Technical Certifications & Training
        </h2>
      </div>

      <div class="space-y-2.5">
        ${certifications.map(cert => `
          <div class="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 hover:border-emerald-500/40 transition-all avoid-break group">
            <div class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug break-words">
                  ${escapeHtml(cert.name)}
                </div>
                <div class="flex flex-wrap items-center justify-between gap-2 mt-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/60">
                  <span class="text-[11px] text-slate-500 dark:text-slate-400 font-medium">${escapeHtml(cert.issuer)}</span>
                  <span class="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/50 flex-shrink-0">
                    ${escapeHtml(cert.badge)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function getAwardCompanyTheme(org) {
  const o = (org || '').toLowerCase();
  if (o.includes('manulife')) {
    return {
      border: 'border-emerald-500/40 dark:border-emerald-500/30 hover:border-emerald-500',
      bg: 'bg-emerald-50/60 dark:bg-emerald-950/20',
      badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30',
      icon: '🏆',
      legendColor: 'bg-emerald-500'
    };
  } else if (o.includes('teletech')) {
    return {
      border: 'border-sky-500/40 dark:border-sky-500/30 hover:border-sky-500',
      bg: 'bg-sky-50/60 dark:bg-sky-950/20',
      badge: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30',
      icon: '🎖️',
      legendColor: 'bg-sky-500'
    };
  } else {
    // eTelecare
    return {
      border: 'border-orange-500/40 dark:border-orange-500/30 hover:border-orange-500',
      bg: 'bg-orange-50/60 dark:bg-orange-950/20',
      badge: 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/30',
      icon: '⭐',
      legendColor: 'bg-orange-500'
    };
  }
}

function renderAwards(awards) {
  const container = document.getElementById('awards-section');
  if (!container) return;

  container.innerHTML = `
    <div class="surface-card rounded-2xl p-6 border-slate-200/80 dark:border-slate-800/80 awards-section avoid-break">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-amber-500"></div>
          <h2 class="text-xs uppercase tracking-widest font-bold text-amber-600 dark:text-amber-400 font-mono paper-h2">
            Professional Awards & Recognition
          </h2>
        </div>
        <!-- Company Color Legend -->
        <div class="flex items-center gap-3 text-[11px] font-medium hide-in-paper">
          <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>Manulife</span>
          <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-sky-500"></span>TeleTech</span>
          <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-orange-500"></span>eTelecare</span>
        </div>
      </div>

      <div class="space-y-2.5">
        ${awards.map(a => {
          const theme = getAwardCompanyTheme(a.organization);
          return `
            <div class="flex items-start gap-2.5 p-3 rounded-xl border ${theme.border} ${theme.bg} hover:shadow-md transition-all avoid-break">
              <span class="text-base flex-shrink-0 mt-0.5">${theme.icon}</span>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                  ${escapeHtml(a.title)}
                </div>
                <div class="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-slate-200/40 dark:border-slate-800/40">
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${theme.badge}">
                    ${escapeHtml(a.organization)}
                  </span>
                  <span class="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    ${escapeHtml(a.year)}
                  </span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderEducation(edu) {
  const container = document.getElementById('education-section');
  if (!container) return;

  container.innerHTML = `
    <div class="surface-card rounded-2xl p-6 border-slate-200/80 dark:border-slate-800/80 education-block avoid-break">
      <div class="flex items-center gap-2 mb-4">
        <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
        <h2 class="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 font-mono paper-h2">
          Education & Academic Achievements
        </h2>
      </div>

      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              ${escapeHtml(edu.institution)}
            </h3>
            <div class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(edu.location)}</div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${edu.degrees.map(deg => `
            <div class="p-3 rounded-lg bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <div class="text-xs font-bold text-slate-800 dark:text-slate-200">${escapeHtml(deg.title)}</div>
              <div class="text-xs font-mono text-sky-600 dark:text-sky-400 mt-0.5">${escapeHtml(deg.year || deg.period)}</div>
            </div>
          `).join('')}
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Academic Honors & Competitions:
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            ${edu.honors.map(h => `
              <li class="flex items-start gap-2">
                <span class="text-indigo-500 font-bold">•</span>
                <span>${escapeHtml(h)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   SKILL SEARCH & FILTERING
   ========================================================================== */
function initSkillSearch() {
  const searchInput = document.getElementById('skill-search-input');
  const clearBtn = document.getElementById('clear-filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      applyFilter(term);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      applyFilter('');
    });
  }
}

window.filterBySkill = function(skillName) {
  const searchInput = document.getElementById('skill-search-input');
  const mobileSearch = document.getElementById('skill-search-input-mobile');
  if (searchInput) {
    const isCurrentlyActive = searchInput.value.toLowerCase() === skillName.toLowerCase();
    if (isCurrentlyActive) {
      searchInput.value = '';
      if (mobileSearch) mobileSearch.value = '';
      applyFilter('');
      showToast(`✨ Filter cleared`);
    } else {
      searchInput.value = skillName;
      if (mobileSearch) mobileSearch.value = skillName;
      applyFilter(skillName.toLowerCase());
      showToast(`🔍 Filtering by "${skillName}"`);
    }
  }
};

function applyFilter(term) {
  const clearBtn = document.getElementById('clear-filter-btn');
  const bullets = document.querySelectorAll('.experience-bullet');
  const chips = document.querySelectorAll('.skill-chip');

  if (!term) {
    if (clearBtn) clearBtn.classList.add('hidden');
    bullets.forEach(b => {
      b.classList.remove('highlight-match', 'dimmed');
    });
    chips.forEach(c => {
      c.classList.remove('highlight-tag');
    });
    return;
  }

  if (clearBtn) clearBtn.classList.remove('hidden');

  // Highlight matching chips
  chips.forEach(c => {
    const sName = (c.getAttribute('data-skill') || '').toLowerCase();
    if (sName.includes(term)) {
      c.classList.add('highlight-tag');
    } else {
      c.classList.remove('highlight-tag');
    }
  });

  // Filter bullets
  let matchCount = 0;
  bullets.forEach(b => {
    const text = b.textContent.toLowerCase();
    const tags = (b.getAttribute('data-tags') || '').toLowerCase();
    if (text.includes(term) || tags.includes(term)) {
      b.classList.add('highlight-match');
      b.classList.remove('dimmed');
      matchCount++;
    } else {
      b.classList.remove('highlight-match');
      b.classList.add('dimmed');
    }
  });
}

/* ==========================================================================
   INTERACTIVE COPY TO CLIPBOARD
   ========================================================================== */
function initCopyActions() {
  // Attached via onclick inline for maximum cross-browser reliability
}

window.copyToClipboard = function(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`📋 ${label} copied to clipboard!`);
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
};

function fallbackCopy(text, label) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast(`📋 ${label} copied to clipboard!`);
}

function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   LIVE EDIT MODE (Easy to modify on the fly)
   ========================================================================== */
function initLiveEdit() {
  const editBtn = document.getElementById('toggle-edit-btn');
  let isEditing = false;

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      isEditing = !isEditing;
      const editableElements = document.querySelectorAll(
        '#person-name, #person-title, #person-location, #person-phone, #person-email, #summary-section p, .experience-bullet .bullet-text, .role-block h4'
      );

      editableElements.forEach(el => {
        el.contentEditable = isEditing ? "true" : "false";
        if (isEditing) {
          el.classList.add('ring-2', 'ring-amber-500/50', 'rounded', 'px-1', 'bg-amber-500/5');
        } else {
          el.classList.remove('ring-2', 'ring-amber-500/50', 'rounded', 'px-1', 'bg-amber-500/5');
        }
      });

      editBtn.classList.toggle('bg-amber-500', isEditing);
      editBtn.classList.toggle('text-white', isEditing);
      showToast(isEditing ? '✏️ Live Edit enabled. Click text to edit.' : '💾 Live Edit disabled. Remember to update resume-data.js for persistence.');
    });
  }
}

/* ==========================================================================
   HELPERS
   ========================================================================== */
function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightKeyTerms(text) {
  // Subtle highlighting for key technology keywords
  const keywords = ['Azure', '100+ servers', '99.98%', 'CAD$200K', '90% cost reduction', '300,000+', '9,000+', 'PowerShell', 'C#', 'Python', 'Varonis', 'Active Directory', 'Failover Clustering'];
  let safeText = escapeHtml(text);
  
  keywords.forEach(kw => {
    const escapedKw = escapeHtml(kw);
    const regex = new RegExp(`(${escapedKw})`, 'gi');
    safeText = safeText.replace(regex, '<span class="font-semibold text-slate-900 dark:text-slate-100">$1</span>');
  });

  return safeText;
}

/* ==========================================================================
   DISCRETE A4 SHEETS RENDERING (Pages 1, 2, and 3)
   ========================================================================== */
function renderPaperSheets(data) {
  const sheet1 = document.getElementById('a4-sheet-1');
  const sheet2 = document.getElementById('a4-sheet-2');
  const sheet3 = document.getElementById('a4-sheet-3');

  if (!sheet1 || !sheet2 || !sheet3) return;

  const manulifeComp = data.experience.find(e => e.company.includes('Manulife'));
  const manulifeHighlights = (manulifeComp && manulifeComp.roles && manulifeComp.roles[0]) ? manulifeComp.roles[0].highlights : [];
  
  // Original PDF pagination: first 8 bullets on page 1, remaining on page 2
  const manulifePage1Bullets = manulifeHighlights.slice(0, 8);
  const manulifePage2Bullets = manulifeHighlights.slice(8);

  const teletechComp = data.experience.find(e => e.company.includes('TeleTech'));
  const etelecareComp = data.experience.find(e => e.company.includes('eTelecare'));
  const stiComp = data.experience.find(e => e.company.includes('STI College') && e.roles);

  // --------------------------------------------------------------------------
  // PAGE 1: Header, Professional Summary, Core Competencies, Manulife (Part 1)
  // --------------------------------------------------------------------------
  sheet1.innerHTML = `
    <div class="a4-content">
      <!-- Candidate Main Header -->
      <div class="text-center pb-2.5 mb-2.5 border-b-2 border-slate-900">
        <h1 class="text-2xl font-black tracking-tight text-slate-950 uppercase font-sans">
          ${escapeHtml(data.personal.name)}
        </h1>
        <div class="text-[9.5pt] font-semibold text-sky-700 mt-0.5">
          ${escapeHtml(data.personal.title)}
        </div>
        <div class="text-[8.5pt] text-slate-700 mt-1 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-0.5">
          <span>${escapeHtml(data.personal.location)}</span>
          <span>&bull;</span>
          <span>${escapeHtml(data.personal.phone)}</span>
          <span>&bull;</span>
          <a href="mailto:${escapeHtml(data.personal.email)}" class="hover:underline">${escapeHtml(data.personal.email)}</a>
          <span>&bull;</span>
          <a href="${escapeHtml(data.personal.linkedinUrl)}" target="_blank" class="hover:underline">${escapeHtml(data.personal.linkedin)}</a>
        </div>
      </div>

      <!-- Professional Summary -->
      <div class="mb-3">
        <h2 class="a4-section-title">Professional Summary</h2>
        <p class="text-[8.8pt] leading-relaxed text-slate-800 text-justify">
          ${escapeHtml(data.summary)}
        </p>
      </div>

      <!-- Core Technical Competencies -->
      <div class="mb-3">
        <h2 class="a4-section-title">Core Technical Competencies</h2>
        <div class="space-y-1 text-[8.5pt] text-slate-800">
          ${data.competencies.map(c => `
            <div class="leading-tight">
              <span class="font-bold text-slate-950 uppercase text-[8pt] tracking-wide">${escapeHtml(c.category)}:</span>
              <span class="text-slate-700">${c.skills.map(s => escapeHtml(s)).join(', ')}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Professional Experience: Manulife Part 1 -->
      <div>
        <h2 class="a4-section-title">Professional Experience</h2>
        <div class="mt-1">
          <div class="flex justify-between items-baseline font-bold text-[9.5pt] text-slate-950">
            <span>Manulife Business Processing Services</span>
            <span class="font-mono text-[8.5pt] text-slate-600">2017 – 2025</span>
          </div>
          <div class="text-[8.5pt] italic font-semibold text-slate-700 mb-1">
            Systems Administrator &gt; Senior Infrastructure Administrator
          </div>
          <ul class="list-disc pl-4 space-y-1 text-[8.4pt] text-slate-800 leading-snug">
            ${manulifePage1Bullets.map(b => `<li>${escapeHtml(b.text)}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- Sheet 1 Footer -->
    <div class="a4-footer">
      <span>Thristan Jericho Tolentino &bull; Senior Infrastructure Administrator / Full Stack Developer</span>
      <span>Page 1 of 3</span>
    </div>
  `;

  // --------------------------------------------------------------------------
  // PAGE 2: Manulife (Part 2), TeleTech, eTelecare, STI College (Experience)
  // --------------------------------------------------------------------------
  sheet2.innerHTML = `
    <div class="a4-content">
      <!-- Mini Header -->
      <div class="a4-header-mini">
        <span class="font-bold text-[9pt] tracking-tight uppercase text-slate-900">${escapeHtml(data.personal.name)}</span>
        <span class="text-[8pt] text-slate-500 font-mono">PROFESSIONAL EXPERIENCE (CONTINUED)</span>
      </div>

      <!-- Manulife Continued -->
      <div class="mb-2.5">
        <ul class="list-disc pl-4 space-y-1 text-[8.4pt] text-slate-800 leading-snug">
          ${manulifePage2Bullets.map(b => `<li>${escapeHtml(b.text)}</li>`).join('')}
        </ul>
      </div>

      <!-- TeleTech Philippines -->
      ${teletechComp ? `
        <div class="mb-2.5 border-t border-slate-300 pt-1.5">
          <div class="flex justify-between items-baseline font-bold text-[9.5pt] text-slate-950 mb-1">
            <span>${escapeHtml(teletechComp.company)}</span>
            <span class="font-mono text-[8.5pt] text-slate-600">${escapeHtml(teletechComp.period)}</span>
          </div>
          <div class="space-y-2">
            ${teletechComp.roles.map(role => `
              <div>
                <div class="text-[8.5pt] font-semibold italic text-slate-800 flex justify-between">
                  <span>${escapeHtml(role.title)}</span>
                  <span class="font-mono not-italic text-[8pt] text-slate-600">${escapeHtml(role.period)}</span>
                </div>
                <ul class="list-disc pl-4 space-y-0.5 text-[8.3pt] text-slate-800 leading-snug mt-0.5">
                  ${role.highlights.map(h => `<li>${escapeHtml(h.text)}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- eTelecare Global Solutions -->
      ${etelecareComp ? `
        <div class="mb-2.5 border-t border-slate-300 pt-1.5">
          <div class="flex justify-between items-baseline font-bold text-[9.5pt] text-slate-950">
            <span>${escapeHtml(etelecareComp.company)}</span>
            <span class="font-mono text-[8.5pt] text-slate-600">${escapeHtml(etelecareComp.period)}</span>
          </div>
          <div class="text-[8.5pt] italic font-semibold text-slate-700 mb-0.5">
            ${escapeHtml(etelecareComp.roles[0].title)}
          </div>
          <ul class="list-disc pl-4 text-[8.3pt] text-slate-800 leading-snug">
            ${etelecareComp.roles[0].highlights.map(h => `<li>${escapeHtml(h.text)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- STI College Santa Rosa (Work Experience) -->
      ${stiComp ? `
        <div class="border-t border-slate-300 pt-1.5">
          <div class="flex justify-between items-baseline font-bold text-[9.5pt] text-slate-950">
            <span>${escapeHtml(stiComp.company)}</span>
            <span class="font-mono text-[8.5pt] text-slate-600">${escapeHtml(stiComp.period)}</span>
          </div>
          <div class="text-[8.5pt] italic font-semibold text-slate-700 mb-0.5">
            ${escapeHtml(stiComp.roles[0].title)}
          </div>
          <ul class="list-disc pl-4 text-[8.3pt] text-slate-800 leading-snug">
            ${stiComp.roles[0].highlights.map(h => `<li>${escapeHtml(h.text)}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>

    <!-- Sheet 2 Footer -->
    <div class="a4-footer">
      <span>Thristan Jericho Tolentino &bull; Senior Infrastructure Administrator / Full Stack Developer</span>
      <span>Page 2 of 3</span>
    </div>
  `;

  // --------------------------------------------------------------------------
  // PAGE 3: Certifications, Professional Awards, Education & Achievements
  // --------------------------------------------------------------------------
  sheet3.innerHTML = `
    <div class="a4-content">
      <!-- Mini Header -->
      <div class="a4-header-mini">
        <span class="font-bold text-[9pt] tracking-tight uppercase text-slate-900">${escapeHtml(data.personal.name)}</span>
        <span class="text-[8pt] text-slate-500 font-mono">CREDENTIALS, AWARDS &amp; EDUCATION</span>
      </div>

      <!-- Technical Certifications & Training -->
      <div class="mb-3">
        <h2 class="a4-section-title">Technical Certifications &amp; Training</h2>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-[8.2pt] text-slate-800 leading-tight">
          ${data.certifications.map(c => `
            <div class="flex items-start gap-1.5">
              <span class="text-sky-600 font-bold">&bull;</span>
              <span>${escapeHtml(c.name)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Professional Awards -->
      <div class="mb-3">
        <div class="flex justify-between items-center border-b-2 border-slate-900 pb-1 mt-2 mb-1.5">
          <h2 class="text-[10.5pt] font-extrabold uppercase tracking-tight text-slate-950">Professional Awards</h2>
          <div class="flex items-center gap-2.5 text-[7.5pt] font-medium font-mono text-slate-600">
            <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>Manulife (Green)</span>
            <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-sky-500"></span>TeleTech (Blue)</span>
            <span class="inline-flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-orange-500"></span>eTelecare (Orange)</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[8.2pt]">
          ${data.awards.map(a => {
            const t = getAwardCompanyTheme(a.organization);
            return `
              <div class="flex items-center justify-between p-1 px-2 rounded border ${t.border} ${t.bg}">
                <span class="font-medium text-slate-900 leading-tight pr-1">${escapeHtml(a.title)}</span>
                <span class="font-mono text-[7.5pt] ${t.badge} font-bold px-1.5 py-0.2 rounded flex-shrink-0">${escapeHtml(a.year)}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Education & Academic Achievements -->
      <div>
        <h2 class="a4-section-title">Education &amp; Academic Achievements</h2>
        <div class="mb-2">
          <div class="font-bold text-[9pt] text-slate-950">${escapeHtml(data.education.institution)}</div>
          <div class="space-y-0.5 text-[8.4pt] text-slate-800">
            ${data.education.degrees.map(d => `
              <div>&bull; ${escapeHtml(d.title)} | ${escapeHtml(d.year || d.period)}</div>
            `).join('')}
          </div>
        </div>

        <div>
          <div class="font-bold text-[8.4pt] text-slate-950 mb-0.5">Academic Achievements:</div>
          <ul class="list-disc pl-4 space-y-0.5 text-[8.2pt] text-slate-800 leading-snug">
            ${data.education.honors.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- Sheet 3 Footer -->
    <div class="a4-footer">
      <span>Thristan Jericho Tolentino &bull; Senior Infrastructure Administrator / Full Stack Developer</span>
      <span>Page 3 of 3</span>
    </div>
  `;
}
