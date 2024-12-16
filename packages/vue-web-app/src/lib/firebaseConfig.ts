import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
}

function validateConfig() {
	// Validate that all required config values are present
	const missingKeys = Object.entries(firebaseConfig)
		.filter(([key, value]) => {
			return !value || value.includes('your-') || value === 'undefined' || value.includes('placeholder')
		})
		.map(([key]) => key)

	if (missingKeys.length > 0) {
		console.error('❌ Firebase initialization failed! Missing configuration keys:', missingKeys.join(', '), '\nPlease check your .env file')
		throw new Error('Firebase configuration is incomplete')
	}
}
validateConfig()

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

console.log('%c🔥 Firebase App initialized successfully! App name:', 'color: #FFA000; font-weight: bold; font-size: 12px;', app.options.projectId)

// Export the services
export { db, auth, storage }