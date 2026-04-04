<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="header-inner">
        <!-- Logo -->
        <RouterLink to="/" class="logo">
          <div class="logo-icon">▶</div>
          <span class="logo-text">Medwatch</span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="nav-desktop">
          <RouterLink to="/" class="nav-link" :class="{ active: $route.name === 'Home' }">
            🏠 Home
          </RouterLink>
          <RouterLink to="/movies" class="nav-link" :class="{ active: $route.name === 'Movies' }">
            🎬 Movies
          </RouterLink>
          <RouterLink to="/series" class="nav-link" :class="{ active: $route.name === 'Series' }">
            📺 Series
          </RouterLink>
          <RouterLink to="/cleanwatch" class="nav-link" :class="{ active: $route.name === 'CleanWatch' }">
            🧼 CleanWatch
          </RouterLink>
          <RouterLink to="/live" class="nav-link live-link" :class="{ active: $route.name === 'Live' }">
            <span class="live-dot"></span> Live TV
          </RouterLink>
        </nav>

        <!-- Search & Menu -->
        <div class="header-actions">
          <button class="icon-btn" @click="showSearch = !showSearch" title="Search">
            {{ showSearch ? '✕' : '🔍' }}
          </button>
          <button class="icon-btn mobile-menu-btn" @click="showMobile = !showMobile">☰</button>
        </div>
      </div>

      <!-- Search Bar -->
      <Transition name="slide-down">
        <div v-if="showSearch" class="header-search">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search movies, series, channels..."
              autofocus
              @keyup.enter="doSearch"
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="fade">
      <div v-if="showMobile" class="mobile-overlay" @click="showMobile = false">
        <div class="mobile-drawer" @click.stop>
          <div class="mobile-drawer-header">
            <div class="logo">
              <div class="logo-icon">▶</div>
              <span class="logo-text">Medwatch</span>
            </div>
            <button class="icon-btn" @click="showMobile = false">✕</button>
          </div>
          <nav class="mobile-nav">
            <RouterLink to="/" @click="showMobile = false">🏠 Home</RouterLink>
            <RouterLink to="/movies" @click="showMobile = false">🎬 Movies</RouterLink>
            <RouterLink to="/series" @click="showMobile = false">📺 Series</RouterLink>
            <RouterLink to="/cleanwatch" @click="showMobile = false">🧼 CleanWatch</RouterLink>
            <RouterLink to="/live" @click="showMobile = false">📡 Live TV</RouterLink>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isScrolled = ref(false)
const showSearch = ref(false)
const showMobile = ref(false)
const searchQuery = ref('')

function doSearch() {
  if (!searchQuery.value.trim()) return
  // Store query and navigate to movies (search across all content)
  router.push({ path: '/movies', query: { q: searchQuery.value } })
  showSearch.value = false
  searchQuery.value = ''
}

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  height: var(--nav-height);
  background: rgba(13, 15, 20, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: var(--transition);
}
.app-header.scrolled {
  background: rgba(13, 15, 20, 0.95);
  border-bottom-color: var(--border);
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
}
.header-inner {
  display: flex;
  align-items: center;
  height: var(--nav-height);
  gap: 2rem;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-icon {
  width: 36px; height: 36px;
  background: var(--accent-gradient);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem;
  color: #fff;
  box-shadow: 0 4px 12px rgba(108,99,255,0.4);
}
.logo-text {
  font-size: 1.1rem;
  font-weight: 800;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}
.nav-link {
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: var(--transition);
  text-decoration: none;
}
.nav-link:hover, .nav-link.active {
  color: var(--text-primary);
  background: var(--glass-bg);
}
.nav-link.active { color: var(--accent-secondary); }
.live-link .live-dot {
  display: inline-block;
  width: 7px; height: 7px;
  background: #ff4757;
  border-radius: 50%;
  margin-right: 4px;
  animation: pulse-live 1.5s ease infinite;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}
.icon-btn {
  width: 38px; height: 38px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem;
  color: var(--text-secondary);
  transition: var(--transition);
}
.icon-btn:hover { background: var(--bg-card-hover); color: var(--text-primary); border-color: var(--border-hover); }
.mobile-menu-btn { display: none; }
.header-search {
  padding-bottom: 0.75rem;
}
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from { opacity: 0; transform: translateY(-10px); }
.slide-down-leave-to { opacity: 0; transform: translateY(-10px); }

/* Mobile Drawer */
.mobile-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  z-index: 2000;
}
.mobile-drawer {
  position: absolute;
  top: 0; left: 0;
  width: 280px;
  height: 100vh;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border);
  padding: 1.5rem;
  display: flex; flex-direction: column; gap: 2rem;
}
.mobile-drawer-header { display: flex; align-items: center; justify-content: space-between; }
.mobile-nav { display: flex; flex-direction: column; gap: 0.5rem; }
.mobile-nav a {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition);
}
.mobile-nav a:hover { background: var(--bg-card); color: var(--text-primary); }

@media(max-width: 768px) {
  .nav-desktop { display: none; }
  .mobile-menu-btn { display: flex; }
}
</style>
