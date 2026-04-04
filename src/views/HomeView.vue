<template>
  <div class="page-content">
    <div class="container">

      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-bg"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-badge">⭐ Featured Today</div>
          <h1 class="hero-title">Watch Movies & Live TV</h1>
          <p class="hero-description">
            Stream thousands of movies, series, and live TV channels — all in one beautiful place.
            No subscription required.
          </p>
          <div class="hero-actions">
            <RouterLink to="/movies" class="btn btn-primary">🎬 Browse Movies</RouterLink>
            <RouterLink to="/live" class="btn btn-outline">📡 Go Live</RouterLink>
          </div>
        </div>
      </div>

      <!-- Movies Section -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title"><span class="dot"></span> Latest Movies</h2>
          <RouterLink to="/movies" class="section-link">View All →</RouterLink>
        </div>
        <div class="content-grid">
          <div
            v-for="item in minochinosMovies.slice(0, 12)"
            :key="item.id"
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
      </section>

      <!-- Series Section -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title"><span class="dot"></span> Popular Series</h2>
          <RouterLink to="/series" class="section-link">View All →</RouterLink>
        </div>
        <div class="content-grid">
          <div
            v-for="item in myvidplaySeries.slice(0, 12)"
            :key="item.id"
            class="content-card"
            @click="watchContent(item)"
          >
            <img v-if="item.poster" :src="item.poster" :alt="item.title" class="card-poster" loading="lazy" @error="e => e.target.style.display='none'" />
            <div v-else class="card-poster-placeholder">📺</div>
            <div class="card-play-overlay"><div class="play-icon">▶</div></div>
            <span class="card-badge">{{ item.source }}</span>
            <div class="card-body">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-meta">
                <span>{{ item.year }}</span>
                <span v-if="item.seasons">{{ item.seasons }}S</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Live TV Preview -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title"><span class="dot"></span> Live TV Channels</h2>
          <RouterLink to="/live" class="section-link">All Channels →</RouterLink>
        </div>
        <div v-if="liveLoading" class="channel-grid">
          <div v-for="i in 6" :key="i" class="skeleton" style="height:120px"></div>
        </div>
        <div v-else class="channel-grid">
          <div
            v-for="ch in liveChannels.slice(0, 10)"
            :key="ch.id"
            class="channel-card"
            @click="watchLive(ch)"
          >
            <img v-if="ch.logo" :src="ch.logo" :alt="ch.name" class="channel-logo" @error="e => e.target.style.display='none'" />
            <div v-else class="channel-logo-fallback">📡</div>
            <div class="channel-name">{{ ch.name }}</div>
            <div class="channel-group">{{ ch.group }}</div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useM3U } from '../composables/useM3U'
import { getMockMovies, getMockSeries } from '../data/mockData'

const router = useRouter()
const { channels: liveChannels, loading: liveLoading, fetchPlaylist } = useM3U()

const minochinosMovies = computed(() => getMockMovies('minochinos'))
const myvidplaySeries = computed(() => getMockSeries('myvidplay'))

function watchContent(item) {
  router.push({ path: '/watch', query: { id: item.id, source: item.source, title: item.title, poster: item.poster } })
}
function watchLive(ch) {
  router.push({ path: '/live/watch', query: { id: ch.id, name: ch.name, logo: ch.logo, url: ch.url } })
}

onMounted(() => {
  fetchPlaylist('/playlist.m3u')
})
</script>
