<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-icon">▶</div>
            <span class="logo-text">Medwatch</span>
          </div>
          <p>Your ultimate streaming destination. Watch movies, series, and live TV — all in one place.</p>
        </div>
        <div class="footer-links">
          <h4>Browse</h4>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/movies">Movies</RouterLink>
          <RouterLink to="/series">Series</RouterLink>
          <RouterLink to="/cleanwatch">CleanWatch</RouterLink>
          <RouterLink to="/live">Live TV</RouterLink>
        </div>
        <div class="footer-links">
          <h4>Sources</h4>
          <a href="https://minochinos.com" target="_blank" rel="noopener">Minochinos</a>
          <a href="https://myvidplay.com" target="_blank" rel="noopener">MyVidPlay</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 Medwatch. For entertainment purposes only.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2.5rem;
  padding-bottom: 2rem;
}
.footer-brand .logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
.logo-icon {
  width: 36px; height: 36px;
  background: var(--accent-gradient);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
}
.logo-text {
  font-size: 1.1rem; font-weight: 800;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.footer-brand p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7; }
.footer-links { display: flex; flex-direction: column; gap: 0.5rem; }
.footer-links h4 { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
.footer-links a { font-size: 0.88rem; color: var(--text-secondary); text-decoration: none; transition: var(--transition); }
.footer-links a:hover { color: var(--accent-secondary); }
.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-muted);
}
@media(max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; gap: 1.5rem; }
}
</style>
