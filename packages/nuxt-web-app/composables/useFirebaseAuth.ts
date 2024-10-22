import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GithubAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
	type AuthProvider,
	type User
} from 'firebase/auth'

export default function () {
	const { $auth } = useNuxtApp()

	// https://nuxt.com/docs/api/composables/use-state
	const user = useState<User | null>('firebaseUser', () => null)

	const providers = {
		google: new GoogleAuthProvider(),
		facebook: new FacebookAuthProvider(),
		github: new GithubAuthProvider()
	}

	type IResponse = { success: true } | { success: false; error: string }

	// const registerUser = async (email: string, password: string): Promise<IResponse> => {
	// 	try {
	// 		const userCreds = await createUserWithEmailAndPassword($auth, email, password)
	// 		if (!userCreds) throw new Error('User creation failed: No user credentials returned.')
	// 		user.value = userCreds.user
	// 		return {
	// 			message: 'User Created Successfully!',
	// 			error: null
	// 		}
	// 	} catch (error: unknown) {
	// 		let errorResponse: IResponse = {
	// 			message: null,
	// 			error: null
	// 		}
	// 		if (error instanceof Error) {
	// 			errorResponse.error = error.message
	// 		}
	// 		return errorResponse
	// 	}
	// }

	// const signinUser = async (email: string, password: string): Promise<IResponse> => {
	// 	try {
	// 		const userCreds = await signInWithEmailAndPassword($auth, email, password)
	// 		if (userCreds) {
	// 			user.value = userCreds.user
	// 			return {
	// 				message: 'User Created Successfully!',
	// 				error: null
	// 			}
	// 		}
	// 	} catch (error: unknown) {
	// 		let errorResponse: IResponse = {
	// 			message: null,
	// 			error: null
	// 		}
	// 		if (error instanceof Error) {
	// 			errorResponse.error = error.message
	// 		}
	// 		return errorResponse
	// 	}
	// }

	const signinWith = async (provider: string): Promise<IResponse> => {
		const selectedProvider = useState<AuthProvider>('selectedProvider', () => providers.google)
		switch (provider) {
			case 'google':
				selectedProvider.value = providers.google
				break
			case 'facebook':
				selectedProvider.value = providers.facebook
				break
			case 'github':
				selectedProvider.value = providers.github
				break
		}

		try {
			const userCreds = await signInWithPopup($auth, selectedProvider.value)
			if (!userCreds) throw new Error('Signin failed: No user credentials returned.')
			user.value = userCreds.user
			return { success: true }
		} catch (error: unknown) {
			console.error(error)
			return { success: false, error: `${error}` }
		}
	}

	const signOutUser = async (): Promise<IResponse> => {
		try {
			await $auth.signOut()
			user.value = null
			return { success: true }
		} catch (error: unknown) {
			return { success: false, error: `${error}` }
		}
	}

	return {
		/** Used to sign in the firebase user with a provider */
		signinWith,
		/** Used to sign the firebase user out */
		signOutUser,
		/** The reactive firebase user object */
		user
	}
}
