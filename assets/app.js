/* Launchpad Engineering Guide — tiny static docs engine (no build step needed) */
(function () {
  'use strict';

  // ---- Add your GitHub repository URL here to enable the "Edit this page" link ----
  var REPO_URL = ''; // e.g. 'https://github.com/your-name/team-build-guide'

  var GROUPS = [
    { title: 'Getting started', items: [
      { id: 'overview', num: 'Start', title: 'Overview & Roadmap', file: 'docs/00-overview.md', blurb: 'The complete plan at a glance' },
      { id: 'team-setup', num: '0', title: 'Team & Tools Setup', file: 'docs/01-team-setup.md', blurb: 'Accounts, tools, laptop ready' }
    ]},
    { title: 'Foundation', items: [
      { id: 'repo-structure', num: '1', title: 'Repo & Project Structure', file: 'docs/02-repo-structure.md', blurb: 'Monorepo, folders, configs' },
      { id: 'git-workflow', num: '2', title: 'Git Workflow: Branch → PR → Merge', file: 'docs/03-git-workflow.md', blurb: 'A practical daily workflow' }
    ]},
    { title: 'Build', items: [
      { id: 'frontend', num: '3', title: 'Next.js + Tailwind Frontend', file: 'docs/04-frontend.md', blurb: 'Pages, components, API client' },
      { id: 'backend', num: '4', title: 'Node.js Backend API', file: 'docs/05-backend.md', blurb: 'Express, validation, errors' },
      { id: 'database', num: '5', title: 'Supabase Database', file: 'docs/06-database.md', blurb: 'Tables, migrations, access' },
      { id: 'auth', num: '6', title: 'Firebase Authentication', file: 'docs/07-auth.md', blurb: 'Login, signup, token verify' },
      { id: 'notifications', num: '7', title: 'Firebase Notifications', file: 'docs/08-notifications.md', blurb: 'Push notifications (FCM)' },
      { id: 'first-feature', num: '8', title: 'First Full Feature (End-to-End)', file: 'docs/09-first-feature.md', blurb: 'A DB → API → UI → PR example' }
    ]},
    { title: 'Quality & Release', items: [
      { id: 'testing', num: '9', title: 'Testing & Code Quality', file: 'docs/10-testing-quality.md', blurb: 'Lint, format, tests, hooks' },
      { id: 'ci-cd', num: '10', title: 'CI/CD with GitHub Actions', file: 'docs/11-ci-cd.md', blurb: 'Auto checks har PR par' },
      { id: 'deployment', num: '11', title: 'Production Deployment', file: 'docs/12-deployment.md', blurb: 'Vercel, Render, env vars' },
      { id: 'scalability', num: '12', title: 'Scalability & Security', file: 'docs/13-scalability-security.md', blurb: 'Production-ready checklist' }
    ]},
    { title: 'Mentor Kit', items: [
      { id: 'mentor', num: 'M', title: 'Mentor Guide: Review & Merge', file: 'docs/14-mentor-guide.md', blurb: 'PR review ka process' },
      { id: 'templates', num: 'T', title: 'Templates & Checklists', file: 'docs/15-templates.md', blurb: 'Copy-paste templates' },
      { id: 'troubleshooting', num: '?', title: 'Troubleshooting & FAQ', file: 'docs/16-troubleshooting.md', blurb: 'Aam errors aur fixes' }
    ]}
  ];

  var FLAT = [];
  GROUPS.forEach(function (g) { g.items.forEach(function (it) { it.group = g.title; FLAT.push(it); }); });

  var cache = {};      // id -> raw markdown
  var current = null;  // current doc id
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) {}
    return null;
  }
  function slugify(t) {
    return t.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-').slice(0, 60);
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ---------- Theme ----------
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    $('#hljs-theme').setAttribute('href', 'assets/vendor/' + (t === 'dark' ? 'hljs-dark.css' : 'hljs-light.css'));
  }
  applyTheme(document.documentElement.getAttribute('data-theme') || 'light');
  $('#themeBtn').addEventListener('click', function () {
    var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    store('guide:theme', t); applyTheme(t);
  });

  // ---------- Sidebar ----------
  function buildNav() {
    var html = '';
    GROUPS.forEach(function (g) {
      html += '<div class="nav-group"><h4>' + esc(g.title) + '</h4>';
      g.items.forEach(function (it) {
        html += '<a class="nav-link" data-id="' + it.id + '" href="#/' + it.id + '"><span class="nav-num"><span>' + esc(it.num) + '</span></span><span>' + esc(it.title) + '</span></a>';
      });
      html += '</div>';
    });
    $('#navList').innerHTML = html;
  }

  // ---------- Progress (checklists) ----------
  function keyFor(id, i) { return 'guide:chk:' + id + ':' + i; }
  var totals = {}; // id -> {total, done}
  function countChecks(id, md) {
    var n = (md.match(/^\s*[-*]\s+\[[ xX]\]\s/gm) || []).length, d = 0;
    for (var i = 0; i < n; i++) if (store(keyFor(id, i)) === '1') d++;
    totals[id] = { total: n, done: d };
  }
  function refreshProgress() {
    var T = 0, D = 0;
    FLAT.forEach(function (it) {
      var t = totals[it.id]; if (!t) return;
      T += t.total; D += t.done;
      var a = $('.nav-link[data-id="' + it.id + '"]');
      if (a) a.classList.toggle('done', t.total > 0 && t.done === t.total);
    });
    var pct = T ? Math.round((D / T) * 100) : 0;
    $('#sideProgressText').textContent = pct + '%';
    $('#sideProgressBar').style.width = pct + '%';
    $$('.rm-card').forEach(function (c) {
      var t = totals[c.getAttribute('data-id')];
      c.classList.toggle('done', !!t && t.total > 0 && t.done === t.total);
    });
  }

  // ---------- Markdown render ----------
  function render(id, md) {
    var html = window.marked.parse(md, { gfm: true, breaks: false });
    var doc = $('#doc');
    doc.innerHTML = html;
    var item = FLAT.filter(function (x) { return x.id === id; })[0];

    // Page crumb above first h1
    var h1 = $('h1', doc);
    if (h1 && item) {
      var crumb = document.createElement('div');
      crumb.className = 'crumb';
      crumb.textContent = (item.num === 'Start' ? 'Getting started' : (/^\d+$/.test(item.num) ? 'Phase ' + item.num : item.group));
      h1.parentNode.insertBefore(crumb, h1);
    }

    // Headings: ids
    var used = {};
    $$('h2, h3', doc).forEach(function (h) {
      var s = slugify(h.textContent) || 'section'; var base = s, n = 2;
      while (used[s]) s = base + '-' + (n++);
      used[s] = 1; h.id = s;
    });

    // Callouts
    $$('blockquote', doc).forEach(function (bq) {
      var p = $('p', bq); if (!p) return;
      var m = p.innerHTML.match(/^\s*\[!(NOTE|TIP|WARNING|DANGER|MENTOR|TASK)\]\s*/i);
      if (!m) return;
      var type = m[1].toLowerCase();
      var titles = { note: 'Note', tip: 'Tip', warning: 'Watch out', danger: 'Danger', mentor: 'Mentor note', task: 'Your task' };
      p.innerHTML = p.innerHTML.replace(m[0], '');
      var box = document.createElement('div');
      box.className = 'callout ' + type;
      var t = document.createElement('span'); t.className = 'co-title'; t.textContent = titles[type];
      box.appendChild(t);
      while (bq.firstChild) box.appendChild(bq.firstChild);
      bq.parentNode.replaceChild(box, bq);
    });

    // Code blocks: header + copy + highlight
    $$('pre', doc).forEach(function (pre) {
      var code = $('code', pre); if (!code) return;
      var cls = (code.className.match(/language-([^\s]+)/) || [])[1] || '';
      var label = cls, text = code.textContent;
      // "lang title=path/to/file" support:  ```js title=src/app.js  -> marked keeps only first word in class, so use first-line comment hint
      var first = text.split('\n')[0];
      var fm = first.match(/^(?:\/\/|#|<!--|--|\/\*)\s*FILE:\s*(.+?)\s*(?:-->|\*\/)?\s*$/);
      if (fm) { label = fm[1]; code.textContent = text.split('\n').slice(1).join('\n'); }
      if (cls && window.hljs && window.hljs.getLanguage(cls)) {
        try { window.hljs.highlightElement(code); } catch (e) {}
      }
      var wrap = document.createElement('div'); wrap.className = 'codeblock';
      var head = document.createElement('div'); head.className = 'codehead';
      var file = document.createElement('span'); file.className = 'file'; file.textContent = label || 'terminal';
      var btn = document.createElement('button'); btn.className = 'copy-btn'; btn.type = 'button'; btn.textContent = 'Copy';
      btn.addEventListener('click', function () {
        var raw = code.textContent;
        var done = function () { btn.textContent = 'Copied ✓'; btn.classList.add('ok'); setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('ok'); }, 1400); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(raw).then(done, fallback);
        else fallback();
        function fallback() {
          var ta = document.createElement('textarea'); ta.value = raw; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {} document.body.removeChild(ta);
        }
      });
      head.appendChild(file); head.appendChild(btn);
      pre.parentNode.insertBefore(wrap, pre); wrap.appendChild(head); wrap.appendChild(pre);
    });

    // Wrap diagrams (svg blocks marked with class)
    $$('svg.dg', doc).forEach(function (svg) {
      var w = document.createElement('div'); w.className = 'diagram';
      svg.parentNode.insertBefore(w, svg); w.appendChild(svg);
    });

    // Interactive checklists
    var idx = 0;
    $$('li', doc).forEach(function (li) {
      var cb = $('input[type="checkbox"]', li);
      if (!cb || cb.parentNode !== li) return;
      var i = idx++;
      cb.disabled = false; cb.removeAttribute('disabled');
      li.classList.add('task-item');
      var label = document.createElement('label');
      var span = document.createElement('span');
      cb.parentNode.removeChild(cb);
      while (li.firstChild) span.appendChild(li.firstChild);
      label.appendChild(cb); label.appendChild(span); li.appendChild(label);
      var on = store(keyFor(id, i)) === '1';
      cb.checked = on; li.classList.toggle('checked', on);
      cb.addEventListener('change', function () {
        store(keyFor(id, i), cb.checked ? '1' : '0');
        li.classList.toggle('checked', cb.checked);
        countChecks(id, cache[id]); refreshProgress();
      });
    });

    // Roadmap grid on overview
    var rg = $('#roadmap-grid', doc);
    if (rg) {
      var g = '<div class="roadmap">';
      FLAT.forEach(function (it) {
        if (it.id === 'overview') return;
        g += '<a class="rm-card" data-id="' + it.id + '" href="#/' + it.id + '"><small>' + (/^\d+$/.test(it.num) ? 'Phase ' + it.num : it.group) + '</small><b>' + esc(it.title) + '</b><span>' + esc(it.blurb) + '</span></a>';
      });
      rg.outerHTML = g + '</div>';
    }

    // External links open in new tab
    $$('a[href^="http"]', doc).forEach(function (a) { a.target = '_blank'; a.rel = 'noopener noreferrer'; });
    // Internal doc links like (#/phase) are left as is.

    // Edit link
    if (REPO_URL && item) {
      var meta = document.createElement('p'); meta.className = 'meta';
      meta.innerHTML = '<span><a href="' + REPO_URL + '/edit/main/' + item.file + '">✎ Edit this page on GitHub</a></span>';
      doc.appendChild(meta);
    }

    buildToc(doc);
    buildPager(id);
    refreshProgress();
  }

  function buildToc(doc) {
    var hs = $$('h2, h3', doc);
    var toc = $('#toc');
    if (hs.length < 2) { toc.innerHTML = ''; return; }
    var html = '<h5>On this page</h5>';
    hs.forEach(function (h) { html += '<a class="' + h.tagName.toLowerCase() + '" href="#" data-t="' + h.id + '">' + esc(h.textContent) + '</a>'; });
    toc.innerHTML = html;
    $$('a', toc).forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var el = document.getElementById(a.getAttribute('data-t'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function buildPager(id) {
    var i = FLAT.findIndex(function (x) { return x.id === id; });
    var p = FLAT[i - 1], n = FLAT[i + 1], html = '';
    if (p) html += '<a class="prev" href="#/' + p.id + '"><small>← Previous</small><b>' + esc(p.title) + '</b></a>';
    if (n) html += '<a class="next" href="#/' + n.id + '"><small>Next →</small><b>' + esc(n.title) + '</b></a>';
    $('#pager').innerHTML = html;
  }

  // ---------- Loading ----------
  function load(id) {
    if (cache[id]) return Promise.resolve(cache[id]);
    var item = FLAT.filter(function (x) { return x.id === id; })[0];
    return fetch(item.file, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error(item.file + ' could not be loaded (HTTP ' + r.status + ')');
      return r.text();
    }).then(function (t) { cache[id] = t; countChecks(id, t); return t; });
  }

  function showError(err) {
    $('#doc').innerHTML = '<div class="error-box"><b>This page could not be loaded.</b><p>' + esc(String(err.message || err)) +
      '</p><p>Agar aap file ko seedha double-click karke khol rahe ho (file://), to browser fetch block kar deta hai. Local preview ke liye folder me terminal kholo aur chalao:</p>' +
      '<p><code>npx serve .</code> &nbsp;ya&nbsp; <code>python -m http.server 8000</code> — phir <code>http://localhost:8000</code> kholo.</p></div>';
  }

  function route() {
    var id = (location.hash.replace(/^#\/?/, '') || 'overview').split('?')[0];
    if (!FLAT.some(function (x) { return x.id === id; })) id = 'overview';
    current = id;
    $$('.nav-link').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-id') === id); });
    document.body.classList.remove('nav-open');
    load(id).then(function (md) {
      if (current !== id) return;
      render(id, md);
      var item = FLAT.filter(function (x) { return x.id === id; })[0];
      document.title = item.title + ' — Launchpad Engineering Guide';
      window.scrollTo(0, 0);
      var act = $('.nav-link.active'); if (act && act.scrollIntoView) act.scrollIntoView({ block: 'nearest' });
    }).catch(showError);
  }

  // ---------- Search ----------
  var searchReady = false;
  function warmSearch() {
    if (searchReady) return Promise.resolve();
    return Promise.all(FLAT.map(function (it) { return load(it.id).catch(function () { return ''; }); })).then(function () { searchReady = true; refreshProgress(); });
  }
  function stripMd(s) { return s.replace(/```[\s\S]*?```/g, function (m) { return m.replace(/```\w*/g, ''); }).replace(/[#>*_`|\[\]]/g, ' ').replace(/\s+/g, ' '); }
  function doSearch(q) {
    var box = $('#searchResults');
    q = q.trim().toLowerCase();
    if (q.length < 2) { box.hidden = true; return; }
    var terms = q.split(/\s+/);
    var out = [];
    FLAT.forEach(function (it) {
      var raw = cache[it.id]; if (!raw) return;
      var text = stripMd(raw), low = text.toLowerCase(), score = 0, firstPos = -1;
      terms.forEach(function (t) {
        var pos = low.indexOf(t); if (pos < 0) { score = -1e9; return; }
        if (firstPos < 0) firstPos = pos;
        score += (low.split(t).length - 1) + (it.title.toLowerCase().indexOf(t) >= 0 ? 25 : 0);
      });
      if (score > 0) out.push({ it: it, score: score, text: text, pos: firstPos });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    var html = '';
    out.slice(0, 8).forEach(function (r) {
      var s = Math.max(0, r.pos - 50), snip = esc(r.text.slice(s, s + 150));
      terms.forEach(function (t) { snip = snip.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
      html += '<a href="#/' + r.it.id + '"><b>' + esc(r.it.title) + '</b><span>…' + snip + '…</span></a>';
    });
    box.innerHTML = html || '<div class="search-empty">No results. Try another search term.</div>';
    box.hidden = false;
  }
  var inp = $('#searchInput');
  inp.addEventListener('focus', function () { warmSearch().then(function () { doSearch(inp.value); }); });
  inp.addEventListener('input', function () { warmSearch().then(function () { doSearch(inp.value); }); });
  document.addEventListener('click', function (e) { if (!$('#search').contains(e.target)) $('#searchResults').hidden = true; });
  $('#searchResults').addEventListener('click', function () { $('#searchResults').hidden = true; inp.value = ''; });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== inp && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); inp.focus(); }
    if (e.key === 'Escape') { $('#searchResults').hidden = true; inp.blur(); document.body.classList.remove('nav-open'); }
  });

  // ---------- Mobile menu, scroll progress, TOC highlight ----------
  $('#menuBtn').addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
  $('#scrim').addEventListener('click', function () { document.body.classList.remove('nav-open'); });
  window.addEventListener('scroll', function () {
    var h = document.documentElement; var max = h.scrollHeight - h.clientHeight;
    $('#progress').style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    var links = $$('#toc a'); if (!links.length) return;
    var active = null;
    links.forEach(function (a) { var el = document.getElementById(a.getAttribute('data-t')); if (el && el.getBoundingClientRect().top < 120) active = a; });
    links.forEach(function (a) { a.classList.toggle('active', a === active); });
  }, { passive: true });

  // ---------- Boot ----------
  buildNav();
  window.addEventListener('hashchange', route);
  // Sab pages ki checklist counts pehle se nikal lo taaki sidebar progress sahi dikhe
  warmSearch();
  route();
})();
