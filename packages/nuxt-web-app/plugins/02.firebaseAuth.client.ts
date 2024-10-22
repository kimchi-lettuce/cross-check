import { onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
	const { user } = useFirebaseAuth()
	const { $auth } = useNuxtApp()
	const router = useRouter()

	onAuthStateChanged($auth, firebaseUser => {
		// Update the user value (it could be null if not logged in)
		user.value = firebaseUser
		if (!firebaseUser) router.push('/login')
	})
})
