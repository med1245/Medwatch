<template>
  <div class="page-content">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">🎬 Movies</h1>
        <p class="page-subtitle">Stream movies from Minochinos & MyVidPlay</p>
      </div>

      <!-- Search & Filter -->
      <div class="filter-bar">
        <div class="search-box" style="max-width: 360px; flex: 1;">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" type="text" placeholder="Search movies..." />
        </div>
        <div class="source-tabs">
          <button
            v-for="s in sources" :key="s.value"
            class="tab-btn"
            :class="{ active: activeSource === s.value }"
            @click="activeSource = s.value"
          >{{ s.label }}</button>
        </div>
      </div>

      <!-- Grid -->
      <div class="content-grid">
        <div
          v-for="item in filteredMovies"
          :key="item.id + item.source"
          class="content-card"
          @click="watchContent(item)"
        >
          <img v-if="item.poster" :src="item.poster" :alt="item.title" class="card-poster" loading="lazy" @error="e => e.target.style.display='none'" />
          <div v-else class="card-poster-placeholder">🎬</div>
          <div class="card-play-overlay"><div class="play-icon">▶</div></div>
          <span class="card-badge">{{ item.source }}</span>
          <div class="card-body">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-meta">
              <span>{{ item.year }}</span>
              <span v-if="item.rating">⭐ {{ item.rating }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredMovies.length === 0" class="empty-state">
        <div class="icon">🎬</div>
        <h3>No movies found</h3>
        <p>Try a different search or filter</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getMockMovies } from '../data/mockData'
import { useScraper } from '../composables/useScraper'

const router = useRouter()
const route = useRoute()
const searchQuery = ref(route.query.q || '')
const activeSource = ref('all')
const { fetchFromSource } = useScraper()

const sources = [
  { label: 'All', value: 'all' },
  { label: 'Minochinos', value: 'minochinos' },
  { label: 'MyVidPlay', value: 'myvidplay' },
  { label: 'EgyDead', value: 'egydead' },
  { label: 'FaselHD', value: 'faselhdx' },
]

// Start with standard mock data
const allMovies = ref([
  ...getMockMovies('minochinos'),
  ...getMockMovies('myvidplay')
])

onMounted(async () => {
  // Dynamically pull from scrapers
  const egydeadResult = await fetchFromSource('egydead')
  const faselResult = await fetchFromSource('faselhdx')
  
  if (egydeadResult.length > 0) {
    // Only push movies from EgyDead
    allMovies.value.push(...egydeadResult.filter(i => i.type === 'movie'))
  } else {
    // Fallback if local/not running vercel api
    allMovies.value.push(...getMockMovies('egydead'))  
  }

  if (faselResult.length > 0) {
    allMovies.value.push(...faselResult.filter(i => i.type === 'movie'))
  } else {
    allMovies.value.push(...getMockMovies('faselhdx'))
  }
})

const filteredMovies = computed(() => {
  return allMovies.value.filter(m => {
    const matchSource = activeSource.value === 'all' || m.source === activeSource.value
    const matchSearch = !searchQuery.value || m.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchSource && matchSearch
  })
})

function watchContent(item) {
  router.push({ path: '/watch', query: { id: item.id, source: item.source, title: item.title, poster: item.poster } })
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.source-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
</style>
