<template>
  <div class="page-content">
    <div class="container">
      <button class="back-btn" @click="$router.back()">← Back to Live TV</button>

      <div class="live-watch-layout">
        <!-- Player -->
        <div>
          <div class="now-playing-header">
            <img v-if="channelLogo" :src="channelLogo" :alt="channelName" class="now-logo" @error="e => e.target.style.display='none'" />
            <div v-else class="now-logo-fallback">📡</div>
            <div>
              <div class="now-name">{{ channelName }}</div>
              <div class="now-group">
                <span class="badge badge-live">● LIVE</span>
                <span style="margin-left: 8px; font-size: 0.8rem; color: var(--text-muted)">{{ channelGroup }}</span>
              </div>
            </div>
          </div>

          <!-- HLS Video Player -->
          <div class="player-wrapper">
            <video ref="videoRef" controls autoplay playsinline></video>
          </div>

          <div v-if="playerError" class="player-error">
            <div>⚠️ Stream unavailable or blocked by CORS. Try another channel.</div>
          </div>
        </div>

        <!-- Channel sidebar -->
        <div class="channel-list-sidebar">
          <div class="sidebar-title">All Channels</div>
          <div v-if="channelsLoading" class="skeleton" style="height: 200px;"></div>
          <template v-else>
            <div
              v-for="ch in allChannels"
              :key="ch.id"
              class="channel-list-item"
              :class="{ active: ch.id === channelId }"
              @click="switchChannel(ch)"
            >
              <img v-if="ch.logo" :src="ch.logo" :alt="ch.name" class="channel-list-logo" @error="e => e.target.style.display='none'" />
              <div v-else style="width:36px;height:36px;background:var(--bg-card);border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center">📡</div>
              <div>
                <div class="channel-list-name">{{ ch.name }}</div>
                <div class="channel-list-group">{{ ch.group }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Hls from 'hls.js'
import { useM3U } from '../composables/useM3U'

const route = useRoute()
const router = useRouter()

const channelId = ref(route.query.id || '')
const channelName = ref(route.query.name || 'Live Channel')
const channelLogo = ref(route.query.logo || '')
const channelGroup = ref(route.query.group || '')
const streamUrl = ref(route.query.url || '')

const videoRef = ref(null)
const playerError = ref(false)
let hlsInstance = null

const { channels: allChannels, loading: channelsLoading, fetchPlaylist } = useM3U()

function initHLS(url) {
  playerError.value = false
  if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null }
  if (!url || !videoRef.value) return

  if (Hls.isSupported()) {
    hlsInstance = new Hls({ enableWorker: false })
    hlsInstance.loadSource(url)
    hlsInstance.attachMedia(videoRef.value)
    hlsInstance.on(Hls.Events.ERROR, (event, data) => {
      if (data.fatal) playerError.value = true
    })
  } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoRef.value.src = url
    videoRef.value.play().catch(() => { playerError.value = true })
  } else {
    playerError.value = true
  }
}

function switchChannel(ch) {
  channelId.value = ch.id
  channelName.value = ch.name
  channelLogo.value = ch.logo
  channelGroup.value = ch.group
  streamUrl.value = ch.url
  router.replace({ path: '/live/watch', query: { id: ch.id, name: ch.name, logo: ch.logo, url: ch.url, group: ch.group } })
  initHLS(ch.url)
}

onMounted(() => {
  fetchPlaylist('/playlist.m3u')
  initHLS(streamUrl.value)
})
onUnmounted(() => { if (hlsInstance) hlsInstance.destroy() })
</script>

<style scoped>
.back-btn {
  background: none; border: none; color: var(--text-secondary); font-size: 0.9rem;
  cursor: pointer; padding: 0.5rem 0; margin-bottom: 1.5rem; transition: var(--transition);
}
.back-btn:hover { color: var(--text-primary); }
.now-playing-header {
  display: flex; align-items: center; gap: 1rem;
  margin-bottom: 1rem; padding: 0.75rem;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius);
}
.now-logo { width: 52px; height: 52px; object-fit: contain; border-radius: 8px; background: var(--bg-secondary); }
.now-logo-fallback { width: 52px; height: 52px; background: var(--bg-secondary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.now-name { font-size: 1.1rem; font-weight: 700; }
.now-group { margin-top: 0.25rem; }
.player-error {
  margin-top: 1rem; padding: 0.75rem 1rem;
  background: rgba(255,71,87,0.1); border: 1px solid rgba(255,71,87,0.3);
  border-radius: 8px; color: #ff4757; font-size: 0.9rem;
}
</style>
