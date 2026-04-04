<template>
  <div class="page-content">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">🧼 CleanWatch</h1>
        <p class="page-subtitle">Family-friendly edited movies and TV shows</p>
      </div>

      <!-- Search & Filter -->
      <div class="filter-bar">
        <div class="search-box" style="max-width: 360px; flex: 1;">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" type="text" placeholder="Search clean content..." />
        </div>
        <div class="source-tabs">
          <button
            v-for="s in types" :key="s.value"
            class="tab-btn"
            :class="{ active: activeType === s.value }"
            @click="activeType = s.value"
          >{{ s.label }}</button>
        </div>
      </div>

      <!-- Grid -->
      <div class="content-grid">
        <div
          v-for="item in filteredContent"
          :key="item.id + item.source"
          class="content-card"
          @click="watchContent(item)"
        >
          <img v-if="item.poster" :src="item.poster" :alt="item.title" class="card-poster" loading="lazy" @error="e => e.target.style.display='none'" />
          <div v-else class="card-poster-placeholder">{{ item.type === 'movie' ? '🎬' : '📺' }}</div>
          <div class="card-play-overlay"><div class="play-icon">▶</div></div>
          <span class="card-badge" style="background: #2ed573;">Clean Edited</span>
          <div class="card-body">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-meta">
              <span>{{ item.year }}</span>
              <span v-if="item.rating">⭐ {{ item.rating }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredContent.length === 0" class="empty-state">
        <div class="icon">🧼</div>
        <h3>No content found</h3>
        <p>Try a different search or filter</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCleanContent } from '../data/mockData'

const router = useRouter()
const route = useRoute()
const searchQuery = ref(route.query.q || '')
const activeType = ref('all')

const types = [
  { label: 'All', value: 'all' },
  { label: 'Movies', value: 'movie' },
  { label: 'Series', value: 'series' },
]

const allContent = getCleanContent()

const filteredContent = computed(() => {
  return allContent.filter(item => {
    const matchType = activeType.value === 'all' || item.type === activeType.value
    const matchSearch = !searchQuery.value || item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchType && matchSearch
  })
})

function watchContent(item) {
  router.push({ path: '/watch', query: { id: item.id, source: 'cleanwatch', title: item.title, poster: item.poster, type: item.type } })
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
