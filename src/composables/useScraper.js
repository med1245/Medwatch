import { ref } from 'vue'

export function useScraper() {
    const loading = ref(false)
    const error = ref(null)

    async function fetchFromSource(source) {
        if (source !== 'egydead' && source !== 'faselhdx') return []

        loading.value = true
        error.value = null

        try {
            // Calls our Vercel Serverless Function proxy
            const res = await fetch(`/api/${source}`)
            if (!res.ok) throw new Error(`API returned ${res.status}`)

            const data = await res.json()
            return data
        } catch (err) {
            console.error(`Error fetching ${source}:`, err)
            error.value = err.message
            return []
        } finally {
            loading.value = false
        }
    }

    return { loading, error, fetchFromSource }
}
