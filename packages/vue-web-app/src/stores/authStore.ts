// stores/authStore.js
import { defineStore } from 'pinia'
import { auth } from '@/lib/firebaseConfig'
import { onAuthStateChanged, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		/** The firebase user object. Will be undefined if the user is not
		 * loaded yet. Will be null if the user is not logged in
		 * - Alternatively, you can check the `isLoading` state to see if the
		 *   user has been loaded yet */
		user: undefined as User | undefined | null,
		/** Whether the first `onAuthStateChanged` callback has fired yet */
		isLoading: true
	}),
	actions: {
		init() {
			onAuthStateChanged(auth, user => {
				console.log('🔥 User state changed:', user)
				this.user = user
				this.isLoading = false
			})
		}
	},
	getters: {
		isAuthenticated: state => !!state.user
	}
})
