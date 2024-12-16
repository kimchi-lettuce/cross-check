import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
			meta: { requiresAuth: true }
		},
		{
			path: '/auth',
			name: 'auth',
			component: () => import('../views/AuthView.vue'),
			meta: { noAuth: true }
		},
		{
			path: '/loading',
			name: 'loading',
			component: () => import('../views/LoadingView.vue')
		}
	]
})

// Navigation guard using auth store
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore()
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
	const noAuth = to.matched.some(record => record.meta.noAuth)

	console.log(`%c🚀 Navigating to: ${String(to.name)}`, 'color: #3b82f6; font-weight: bold;', { requiresAuth, noAuth, user: authStore.user })

	// If the first snapshot of the user data is still loading, then show the
	// initial loading page
	if (authStore.isLoading) {
		if (to.name !== 'loading') {
			// If found to be navigating to anything that isn't the loading
			// page, force it to navigate to the loading page anyway
			next({ name: 'loading' })
		} else {
			next()
		}
		return
	}

	if (requiresAuth && !authStore.user) {
		next('/auth')
	} else if (noAuth && authStore.user) {
		next('/')
	} else {
		next()
	}
})

export default router
