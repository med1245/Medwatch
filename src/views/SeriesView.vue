<template>
  <div class="page-content">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">📺 Series</h1>
        <p class="page-subtitle">Binge-watch popular series</p>
      </div>

      <div class="filter-bar">
        <div class="search-box" style="max-width: 360px; flex: 1;">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" type="text" placeholder="Search series..." />
        </div>
        <div class="source-tabs">
          <button v-for="g in genres" :key="g" class="tab-btn" :class="{ active: activeGenre === g }" @click="activeGenre = g">{{ g }}</button>
        </div>
      </div>

      <div class="content-grid">
        <div
          v-for="item in filteredSeries"
          :key="item.id"
          class="content-card"
          @click="watchContent(item)"
        >
          <img v-if="item.poster" :src="item.poster" :alt="item.title" class="card-poster" loading="lazy" @error="e => e.target.style.display='none'" />
          <div v-else class="card-poster-placeholder">📺</div>
          <div class="card-play-overlay"><div class="play-icon">▶</div></div>
          <span class="card-badge">{{ item.seasons }}S</span>
          <div class="card-body">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-meta">
              <span>{{ item.year }}</span>
              <span>⭐ {{ item.rating }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredSeries.length === 0" class="empty-state">
        <div class="icon">📺</div>
        <h3>No series found</h3>
        <p>Try a different search</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getMockSeries } from '../data/mockData'

const router = useRouter()
const searchQuery = ref('')
const activeGenre = ref('All')

const allSeries = [
  ...getMockSeries('myvidplay'),
  ...getMockSeries('egydead'),
  ...getMockSeries('faselhdx')
]

const genres = computed(() => {
  const g = new Set(['All'])
  allSeries.forEach(s => s.genres?.forEach(x => g.add(x)))
  return [...g]
})

const filteredSeries = computed(() => {
  return allSeries.filter(s => {
    const matchGenre = activeGenre.value === 'All' || s.genres?.includes(activeGenre.value)
    const matchSearch = !searchQuery.value || s.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchGenre && matchSearch
  })
})

function watchContent(item) {
  router.push({ path: '/watch', query: { id: item.id, source: item.source, title: item.title, poster: item.poster, type: 'series' } })
}
</script>

<style scoped>
.filter-bar { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
.source-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
</style>
