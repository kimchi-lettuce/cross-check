// stores/authStore.js
import { defineStore } from 'pinia'
import { auth } from '@/lib/firebaseConfig'
import { onAuthStateChanged, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as User | null,
		isLoading: true
	}),
	actions: {
		init() {
			onAuthStateChanged(auth, user => {
				this.user = user
				this.isLoading = false
			})
		},
		getUserProfile() {
			return this.user
		}
	},
	getters: {
		isAuthenticated: state => !!state.user
	}
})
