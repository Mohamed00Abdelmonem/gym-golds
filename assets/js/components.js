// Shared components: shell renderer and basic interactions
const Components = (function(){
  const STORAGE_KEY = 'goldtech.sidebarCollapsed';
  const THEME_KEY = 'goldtech.theme';
  const NAV_ITEMS = [
    { href: 'landing.html', label: 'Home' },
    { href: 'dashboard.html', label: 'Dashboard' },
    { href: 'programs.html', label: 'Programs' },
    { href: 'workout.html', label: 'Workouts' },
    { href: 'coaches.html', label: 'Coaches' },
    { href: 'crowd.html', label: 'Crowd' },
    { href: 'inbody.html', label: 'InBody' },
    { href: 'machines.html', label: 'Machines' },
    { href: 'nutrition.html', label: 'Nutrition' },
    { href: 'achievements.html', label: 'Achievements' },
    { href: 'store.html', label: 'Store' },
    { href: 'membership.html', label: 'Membership' },
    { href: 'notifications.html', label: 'Notifications' },
    { href: 'settings.html', label: 'Settings' },
    { href: 'support.html', label: 'Support' },
    { href: 'profile.html', label: 'Profile' }
  ];
  const MOBILE_NAV = [
    { href: 'dashboard.html', label: 'Home' },
    { href: 'programs.html', label: 'Programs' },
    { href: 'workout.html', label: 'Scan' },
    { href: 'profile.html', label: 'Profile' }
  ];
  const currentPage = () => window.location.pathname.split('/').pop() || 'index.html';
  const getPreferredTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if(saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };
  const applyTheme = (theme) => {
    const resolved = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', resolved);
    document.body.setAttribute('data-theme', resolved);
    localStorage.setItem(THEME_KEY, resolved);
    const toggle = document.getElementById('themeToggle');
    if(toggle){
      toggle.setAttribute('aria-pressed', String(resolved === 'light'));
      toggle.setAttribute('aria-label', resolved === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      toggle.innerHTML = resolved === 'light'
        ? '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    }
  };
  const resolveActive = (href, page) => {
    const aliases = { 'exercise.html': 'workout.html', 'coach.html': 'coaches.html', 'product.html': 'store.html' };
    return href === (aliases[page] || page) || (page === 'index.html' && href === 'landing.html');
  };
  const injectStyle = () => {
    if(!document.querySelector('link[data-goldtech-style]')){
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/css/style.css';
      link.setAttribute('data-goldtech-style','1');
      document.head.appendChild(link);
    }
  };
  const linkList = (items, page, extraClass = '') => items.map((item) => {
    const active = resolveActive(item.href, page);
    return `<li><a href="${item.href}" aria-current="${active ? 'page' : 'false'}" class="${extraClass} sidebar-link group flex items-center gap-3 p-3 rounded-xl fast-trans border border-transparent hover:bg-white/3 focus-visible-ring ${active ? 'nav-link-active' : ''}"><span class="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-gold to-amber-200 shadow-[0_0_18px_rgba(245,176,65,0.35)]"></span><span class="sidebar-label">${item.label}</span></a></li>`;
  }).join('');

  function renderShell(opts = {}){
    injectStyle();
    const title = opts.title || document.title || 'GoldTech';
    document.title = title;
    const page = currentPage();
    const collapsed = localStorage.getItem(STORAGE_KEY) === '1';
    const root = document.getElementById('app-root') || document.body;
    document.documentElement.setAttribute('data-theme', getPreferredTheme());
    document.body.setAttribute('data-theme', getPreferredTheme());
    root.innerHTML = `
      <div id="shell-root" class="app-shell min-h-screen flex ${collapsed ? 'sidebar-collapsed' : ''}">
        <div class="shell-overlay"></div>
        <aside class="app-sidebar hidden md:flex flex-col w-72 p-5 gap-6 glass rounded-2xl sticky top-6 m-6 h-[calc(100vh-48px)] overflow-hidden">
          <a href="landing.html" class="flex items-center gap-3 sidebar-brand">
            <div class="sidebar-brand-icon rounded-xl p-3 bg-gradient-to-br from-[#1b1b1d] to-[#111112]"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="1" y="1" width="22" height="22" rx="6" stroke="#f5b041" stroke-width="1.2"/></svg></div>
            <div class="sidebar-brand-text"><div class="text-white font-semibold text-lg">GoldTech</div><div class="sidebar-meta text-stone-400 text-xs uppercase tracking-widest">Smart Fitness OS</div></div>
          </a>
          <nav aria-label="Primary" class="flex-1 overflow-y-auto pr-1"><ul class="space-y-1 text-sm">${linkList(NAV_ITEMS, page)}</ul></nav>
          <div class="sidebar-footer pt-3 border-t border-white/6 text-sm"><div class="text-stone-400">Active Membership</div><div class="mt-2 flex items-center justify-between"><div><div class="text-white font-semibold">Gold Elite</div><div class="text-stone-400 text-xs">Valid until May 2027</div></div><div class="bg-gradient-to-br from-[#2a2a2a]/80 to-[#161616]/60 p-2 rounded-lg text-gold">●</div></div></div>
        </aside>
        <main class="flex-1 p-5 md:p-8 overflow-y-auto safe-bottom">
          <header class="sticky top-6 z-30 glass rounded-2xl p-3 md:p-4 mb-6 flex items-center justify-between fast-trans backdrop-blur-xl">
            <div class="flex items-center gap-3 md:gap-4"><button id="mobileMenuBtn" class="md:hidden p-2 rounded-lg bg-white/3 focus-visible-ring" aria-label="Open menu"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M4 12h16M4 17h16" stroke-width="1.6" stroke-linecap="round"/></svg></button><button id="sidebarToggle" class="hidden md:inline-flex sidebar-toggle p-2 rounded-lg bg-white/3 focus-visible-ring" aria-label="Toggle sidebar" aria-pressed="${collapsed ? 'true' : 'false'}"><svg class="w-5 h-5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 6l6 6-6 6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="hidden md:flex items-center gap-4"><h1 class="text-white font-extrabold text-lg">${title}</h1><div class="text-stone-400 text-sm">Premium smart gym platform</div></div></div>
            <div class="flex items-center gap-3"><button id="themeToggle" class="hidden sm:inline-flex p-2 rounded-lg bg-white/3 focus-visible-ring" aria-label="Toggle theme" aria-pressed="false"></button><div class="relative hidden sm:flex items-center"><label for="search" class="sr-only">Search</label><input id="search" class="glass rounded-xl px-3 py-2 pl-10 pr-3 w-64 bg-transparent text-white placeholder:opacity-60 fast-trans focus-visible-ring" placeholder="Search"/><svg class="absolute left-3 w-4 h-4 text-stone-400" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.2"/></svg></div><a href="profile.html" class="flex items-center gap-3 rounded-2xl bg-white/3 px-3 py-2 hover:bg-white/6 fast-trans"><div class="text-right hidden sm:block"><div class="text-white font-semibold">Alex Morgan</div><div class="text-stone-400 text-xs">Gold Elite</div></div><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=64&auto=format&fit=crop&s=placeholder" alt="avatar" class="w-10 h-10 rounded-full object-cover border border-white/6"/></a></div>
          </header>
          <div id="page-content"></div>
          <nav id="mobileNav" class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] md:hidden glass rounded-full p-2 flex items-center justify-between px-4 shadow-glass-strong safe-bottom">${MOBILE_NAV.map((item) => { const active = resolveActive(item.href, page); return `<a href="${item.href}" class="flex flex-col items-center gap-1 ${active ? 'text-white' : 'text-stone-400'}"><span class="w-2 h-2 rounded-full ${active ? 'bg-gold' : 'bg-white/30'}"></span><div class="text-xs ${active ? 'font-semibold' : ''}">${item.label}</div></a>`; }).join('')}</nav>
        </main>
      </div>
    `;
    requestAnimationFrame(() => document.body.classList.add('page-ready'));
  }

  function init(){
    const shellRoot = document.getElementById('shell-root');
    const sidebar = document.querySelector('aside.app-sidebar');
    applyTheme(getPreferredTheme());
    document.getElementById('themeToggle')?.addEventListener('click', () => {
      applyTheme(document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
    document.getElementById('sidebarToggle')?.addEventListener('click', () => {
      if(!shellRoot) return;
      const collapsed = !shellRoot.classList.contains('sidebar-collapsed');
      shellRoot.classList.toggle('sidebar-collapsed', collapsed);
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
      const btn = document.getElementById('sidebarToggle');
      if(btn) btn.setAttribute('aria-pressed', String(collapsed));
    });
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => sidebar?.classList.toggle('hidden'));
    document.getElementById('search')?.addEventListener('focus', (e) => e.target.classList.add('focus-visible-ring'));
    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href]');
      if(!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if(url.origin !== window.location.origin) return;
      if(url.href === window.location.href || (url.pathname === window.location.pathname && url.hash)) return;
      event.preventDefault();
      document.body.classList.add('page-leaving');
      window.setTimeout(() => { window.location.href = url.href; }, 140);
    }, true);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if(entry.isIntersecting) entry.target.classList.add('in-view'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('#page-content [data-reveal], #page-content .reveal').forEach((node) => {
      node.classList.add('reveal');
      revealObserver.observe(node);
    });
    document.body.classList.add('page-ready');
  }

  return { renderShell, init };
})();

window.Components = Components;
