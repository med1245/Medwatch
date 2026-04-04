// useM3U.js – parse M3U playlist and return channels list
import { ref } from 'vue'

export function useM3U(url) {
    const channels = ref([])
    const groups = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchPlaylist(playlistUrl) {
        loading.value = true
        error.value = null
        try {
            const res = await fetch(playlistUrl)
            const text = await res.text()
            const parsed = parseM3U(text)
            channels.value = parsed
            const uniqueGroups = [...new Set(parsed.map(c => c.group || 'Other'))]
            groups.value = ['All', ...uniqueGroups]
        } catch (e) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    function parseM3U(text) {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
        const result = []
        let current = null

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            if (line.startsWith('#EXTINF')) {
                current = {}
                // Extract tvg-id
                const idMatch = line.match(/tvg-id="([^"]*)"/)
                current.id = idMatch ? idMatch[1] : `ch-${i}`
                // Extract tvg-logo
                const logoMatch = line.match(/tvg-logo="([^"]*)"/)
                current.logo = logoMatch ? logoMatch[1] : ''
                // Extract group-title
                const groupMatch = line.match(/group-title="([^"]*)"/)
                current.group = groupMatch ? groupMatch[1] : 'Other'
                // Extract name (last part after comma)
                const nameMatch = line.match(/,(.+)$/)
                current.name = nameMatch ? nameMatch[1].trim() : 'Unknown'
            } else if (current && !line.startsWith('#')) {
                current.url = line
                result.push(current)
                current = null
            }
        }
        return result
    }

    if (url) {
        fetchPlaylist(url)
    }

    return { channels, groups, loading, error, fetchPlaylist }
}
