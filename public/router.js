// public/router.js

const routes = {
  '/': '/index.html',
  '/admin': '/admin/admin.html',
  '/admin/add-book': '/admin/add-book.html',
  '/login': '/auth/login.html',        // BARU
  '/register': '/auth/register.html'  // BARU
};



async function loadPage() {
  let path = window.location.pathname;
  if (!path || path === '/') path = '/';

  const file = routes[path] || '/index.html';

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error('Page not found');

    const html = await response.text();
    document.body.innerHTML = '';
    addNavbar(path);

    const container = document.createElement('div');
    container.id = 'app';
    container.innerHTML = html;
    document.body.appendChild(container);

    const titleEl = container.querySelector('title');
    if (titleEl) document.title = titleEl.textContent || 'Perpustakaan Digital';

    loadScriptForPage(path);
  } catch (err) {
    document.body.innerHTML = '<h1 style="text-align:center;color:red;">Halaman Tidak Ditemukan</h1>';
  }
}

function loadScriptForPage(path) {
  document.querySelectorAll('script[data-dynamic]').forEach(s => s.remove());

  let scriptSrc = '';
  if (path === '/' || path === '') {
    scriptSrc = '/script.js';
  } else if (path.startsWith('/admin')) {
    scriptSrc = '/admin/admin-script.js';
  }
  // Auth tidak butuh script khusus selain yang di dalam HTML-nya sendiri

  if (scriptSrc) {
    const script = document.createElement('script');
    script.src = scriptSrc + '?v=' + Date.now();
    script.dataset.dynamic = 'true';
    document.body.appendChild(script);
  }
}

function addNavbar(currentPath) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const navbar = document.createElement('nav');
  navbar.style = `
    background: linear-gradient(to right, #1e90ff, #ffa500);
    padding: 15px 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    position: sticky;
    top: 0;
    z-index: 100;
  `;
  navbar.innerHTML = `
    <div style="max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
      ${user 
            ? `<span style="color:white; margin-right:20px;">Halo, ${user.username}!</span>
                <a href="${user.role === 'admin' ? '/admin' : '/user/dashboard'}" style="color:white; margin:0 10px; text-decoration:none;">Dashboard</a>
                <button id="logoutBtn" ...>Logout</button>`
            : `...`
        }
    </div>
  `;
  document.body.prepend(navbar);

  // Event logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    });
  }
}

// Event klik link internal
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('/') && !href.includes('.')) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      loadPage();
    }
  }
});

window.addEventListener('popstate', loadPage);
window.onload = loadPage;