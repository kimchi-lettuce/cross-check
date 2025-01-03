// stores/authStore.js
import { defineStore } from 'pinia'
import { auth } from '@/lib/firebaseConfig'
import { onAuthStateChanged, type User } from 'firebase/auth'
import type { Router } from 'vue-router'
import type { Typesaurus } from 'typesaurus'

type AuthStoreState = {
	/** The firebase user object. Will be undefined if the user is not loaded
	 * yet. Will be null if the user is not logged in
	 * - Alternatively, you can check the `isLoading` state to see if the user
	 *   has been loaded yet */
	user: User | undefined | null
	/** Whether the first `onAuthStateChanged` callback has fired yet */
	isLoading: boolean
	/** The path to redirect to after the user has been signed in. Used to
	 * preserve the intended path after the initial loading of the firebase user
	 * has been completed */
	onSignInRedirect: string | null
}

export const useAuthStore = defineStore('auth', {
	state: (): AuthStoreState => ({
		user: undefined,
		isLoading: true,
		onSignInRedirect: null
	}),
	actions: {
		init(router: Router) {
			onAuthStateChanged(auth, user => {
				console.log('🧑 User state changed:', user)

				const wasSignedIn = !!this.user
				const isSignedIn = !!user

				this.isLoading = false
				this.user = user

				// Handle navigation based on auth state changes
				if (!wasSignedIn && isSignedIn) {
					// User just signed in
					router.push(this.onSignInRedirect || '/')
					this.onSignInRedirect = null
				} else if (!isSignedIn) {
					// User is either signed out or the first snapshot of the
					// user just loaded and is found to be not signed in
					router.push('/auth')
				}
			})
		}
	},
	getters: {
		isAuthenticated: state => !!state.user,
		uid: state => state.user?.uid as Typesaurus.Id<'users'> | undefined
	}
})
