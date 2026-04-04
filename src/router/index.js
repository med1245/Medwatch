import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/movies',
            name: 'Movies',
            component: () => import('../views/MoviesView.vue'),
        },
        {
            path: '/series',
            name: 'Series',
            component: () => import('../views/SeriesView.vue'),
        },
        {
            path: '/cleanwatch',
            name: 'CleanWatch',
            component: () => import('../views/CleanWatchView.vue'),
        },
        {
            path: '/live',
            name: 'Live',
            component: () => import('../views/LiveTV.vue'),
        },
        {
            path: '/watch',
            name: 'Watch',
            component: () => import('../views/WatchView.vue'),
        },
        {
            path: '/live/watch',
            name: 'LiveWatch',
            component: () => import('../views/LiveWatchView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
})

export default router
