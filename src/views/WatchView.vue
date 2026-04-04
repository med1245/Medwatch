<template>
  <div class="page-content">
    <div class="container">

      <!-- Back button -->
      <button class="back-btn" @click="$router.back()">← Back</button>

      <div class="watch-layout">
        <!-- Main Player -->
        <div>
          <div class="player-wrapper">
            <iframe
              v-if="embedUrl"
              :src="embedUrl"
              allowfullscreen
              allow="autoplay; fullscreen"
              referrerpolicy="no-referrer"
            ></iframe>
            <div v-else class="player-placeholder">
              <div class="placeholder-inner">
                <div class="play-big">▶</div>
                <p>Player loading...</p>
              </div>
            </div>
          </div>

          <div class="watch-info">
            <h1 class="watch-title">{{ title }}</h1>
            <div class="watch-meta">
              <span class="badge" style="background: var(--accent); color: #fff;">{{ source }}</span>
              <span v-if="type">{{ type === 'series' ? '📺 Series' : '🎬 Movie' }}</span>
              <span>{{ poster ? '' : '' }}</span>
            </div>

            <!-- Source Links -->
            <div class="source-links">
              <p class="source-label">Choose player:</p>
              <div class="server-btns">
                <button
                  v-for="srv in servers"
                  :key="srv.label"
                  class="server-btn"
                  :class="{ active: activeServer === srv.label }"
                  @click="activeServer = srv.label; embedUrl = srv.url"
                >{{ srv.label }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
          <div class="sidebar-title">More to Watch</div>
          <div class="sidebar-list">
            <div
              v-for="item in related"
              :key="item.id"
              class="sidebar-item"
              @click="navigateTo(item)"
            >
              <img v-if="item.poster" :src="item.poster" :alt="item.title" class="sidebar-thumb" @error="e => e.target.style.display='none'" />
              <div v-else class="sidebar-thumb-fallback">🎬</div>
              <div class="sidebar-info">
                <div class="sidebar-item-title">{{ item.title }}</div>
                <div class="sidebar-item-meta">{{ item.year }} · ⭐{{ item.rating }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllContent } from '../data/mockData'

const route = useRoute()
const router = useRouter()

const id = route.query.id || ''
const source = route.query.source || 'minochinos'
const title = route.query.title || 'Untitled'
const poster = route.query.poster || ''
const type = route.query.type || 'movie'

// Build embed URLs for all sources
const minoEmbed = `https://minochinos.com/embed/${id}`
const myvidEmbed = `https://myvidplay.com/embed/${id}`
const egydeadEmbed = `https://tv7.egydead.live/embed/${id}`
const faselEmbed = `https://web4412x.faselhdx.bid/embed/${id}`
const cleanEmbed = `https://cleanwatch.local/embed/${id}`
const vidsrcEmbed = `https://vidsrc.to/embed/${type === 'series' ? 'tv' : 'movie'}/${id}`

const servers = computed(() => {
  const list = []
  if (source === 'minochinos') list.push({ label: 'Minochinos', url: minoEmbed })
  if (source === 'myvidplay') list.push({ label: 'MyVidPlay', url: myvidEmbed })
  if (source === 'egydead') list.push({ label: 'EgyDead', url: egydeadEmbed })
  if (source === 'faselhdx') list.push({ label: 'FaselHD', url: faselEmbed })
  if (source === 'cleanwatch') list.push({ label: 'CleanWatch', url: cleanEmbed })
  list.push({ label: 'VidSrc', url: vidsrcEmbed })
  return list
})

const activeServer = ref(servers.value[0]?.label || '')
const embedUrl = ref(servers.value[0]?.url || '')

// Sidebar related content
const related = getAllContent().filter(c => c.id !== id).slice(0, 8)

function navigateTo(item) {
  router.push({ path: '/watch', query: { id: item.id, source: item.source, title: item.title, poster: item.poster } })
}
</script>

<style scoped>
.back-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  transition: var(--transition);
  display: flex; align-items: center; gap: 0.4rem;
}
.back-btn:hover { color: var(--text-primary); }

.player-placeholder {
  background: var(--bg-secondary);
  aspect-ratio: 16/9;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius);
}
.placeholder-inner { text-align: center; color: var(--text-muted); }
.play-big { font-size: 4rem; margin-bottom: 0.5rem; }

.source-links { margin-top: 1.5rem; }
.source-label { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
.server-btns { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.server-btn {
  padding: 0.4rem 1rem;
  border-radius: 50px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: var(--transition);
}
.server-btn.active, .server-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.sidebar { position: sticky; top: calc(var(--nav-height) + 1rem); }
.sidebar-list { display: flex; flex-direction: column; gap: 0.75rem; }
.sidebar-item {
  display: flex; align-items: center; gap: 0.75rem;
  cursor: pointer; padding: 0.5rem; border-radius: 8px;
  transition: var(--transition);
}
.sidebar-item:hover { background: var(--bg-card); }
.sidebar-thumb {
  width: 56px; height: 84px; object-fit: cover;
  border-radius: 6px; flex-shrink: 0; background: var(--bg-secondary);
}
.sidebar-thumb-fallback {
  width: 56px; height: 84px; background: var(--bg-secondary);
  border-radius: 6px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
}
.sidebar-info { flex: 1; min-width: 0; }
.sidebar-item-title { font-size: 0.82rem; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sidebar-item-meta { font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.2rem; }
</style>
