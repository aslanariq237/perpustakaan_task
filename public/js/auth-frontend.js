// public/js/auth-frontend.js

function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function getToken() {
  return localStorage.getItem('token');
}

function updateNavbar() {
  const user = getCurrentUser();
  const authSection = document.getElementById('auth-section');
  const userLinks = document.querySelectorAll('.user-only');
  const adminLinks = document.querySelectorAll('.admin-only');

  if (!authSection) return;

  // Sembunyikan semua menu role-specific dulu
  userLinks.forEach(link => link.style.display = 'none');
  adminLinks.forEach(link => link.style.display = 'none');

  if (user) {
    // Tampilkan menu sesuai role
    if (user.role === 'admin') {
      adminLinks.forEach(link => link.style.display = 'block');
    } else if (user.role === 'user') {
      userLinks.forEach(link => link.style.display = 'block');
    }

    // Dropdown dengan icon user + username
    authSection.innerHTML = `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center text-white" href="#" role="button" data-bs-toggle="dropdown">
          <img src="https://img.icons8.com/color/48/000000/user.png" alt="User" width="32" height="32" class="rounded-circle me-2">
          <span>Halo, ${user.username} <small>(${user.role})</small></span>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          ${user.role === 'user' ? '<li><a class="dropdown-item" href="/user/dashboard.html"><i class="bi bi-speedometer2"></i> Dashboard Saya</a></li>' : ''}
          ${user.role === 'admin' ? '<li><a class="dropdown-item" href="/admin/admin.html"><i class="bi bi-gear"></i> Admin Panel</a></li>' : ''}
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" id="logout-btn"><i class="bi bi-box-arrow-right"></i> Logout</a></li>
        </ul>
      </li>
    `;

    // Event logout
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login.html';
    });

  } else {
    // Belum login
    authSection.innerHTML = `
      <li class="nav-item"><a class="nav-link text-white" href="/auth/login.html">Login</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="/auth/register.html">Register</a></li>
    `;
  }
}

function saveLoginData(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  updateNavbar();
  window.location.href = '/index.html';
}

// Jalankan saat halaman loaded
document.addEventListener('DOMContentLoaded', () => {
  const check = setInterval(() => {
    if (document.getElementById('auth-section')) {
      updateNavbar();
      clearInterval(check);
    }
  }, 100);
});

// Export global kalau perlu
window.saveLoginData = saveLoginData;
window.updateNavbar = updateNavbar;
window.getCurrentUser = getCurrentUser;