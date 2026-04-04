<template>
  <div class="page-content">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">📡 Live TV</h1>
        <p class="page-subtitle">{{ channels.length }} channels across {{ groups.length - 1 }} categories</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="channel-grid">
        <div v-for="i in 12" :key="i" class="skeleton" style="height:140px; border-radius: 12px;"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="empty-state">
        <div class="icon">⚠️</div>
        <h3>Could not load channels</h3>
        <p>{{ error }}</p>
        <button class="btn btn-primary" style="margin-top:1rem" @click="retryLoad">Retry</button>
      </div>

      <template v-else>
        <!-- Category Tabs -->
        <div class="tabs">
          <button
            v-for="g in groups"
            :key="g"
            class="tab-btn"
            :class="{ active: activeGroup === g }"
            @click="activeGroup = g"
          >{{ g }}</button>
        </div>

        <!-- Search -->
        <div class="search-box" style="max-width: 360px; margin-bottom: 1.5rem;">
          <span class="search-icon">🔍</span>
          <input v-model="searchQuery" type="text" placeholder="Search channels..." />
        </div>

        <!-- Channel Grid -->
        <div class="channel-grid" v-if="filteredChannels.length">
          <div
            v-for="ch in filteredChannels"
            :key="ch.id"
            class="channel-card"
            @click="watchChannel(ch)"
          >
            <img v-if="ch.logo" :src="ch.logo" :alt="ch.name" class="channel-logo" @error="e => e.target.style.display='none'" />
            <div v-else class="channel-logo-fallback">📡</div>
            <div class="channel-name">{{ ch.name }}</div>
            <div class="channel-group">{{ ch.group }}</div>
            <div class="badge badge-live">LIVE</div>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="icon">📡</div>
          <h3>No channels found</h3>
          <p>Try a different search or category</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useM3U } from '../composables/useM3U'

const router = useRouter()
const { channels, groups, loading, error, fetchPlaylist } = useM3U()
const activeGroup = ref('All')
const searchQuery = ref('')

const filteredChannels = computed(() => {
  return channels.value.filter(ch => {
    const matchGroup = activeGroup.value === 'All' || ch.group === activeGroup.value
    const matchSearch = !searchQuery.value || ch.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchGroup && matchSearch
  })
})

function watchChannel(ch) {
  router.push({
    path: '/live/watch',
    query: { id: ch.id, name: ch.name, logo: ch.logo, url: ch.url, group: ch.group }
  })
}

function retryLoad() {
  fetchPlaylist('/playlist.m3u')
}

onMounted(() => {
  fetchPlaylist('/playlist.m3u')
})
</script>
