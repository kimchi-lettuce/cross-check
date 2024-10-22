/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import { setGlobalOptions } from 'firebase-functions/v2/options'
import { db } from '@repo/utils'

admin.initializeApp()

setGlobalOptions({
	maxInstances: 10,
	region: 'australia-southeast1',
	timeoutSeconds: 60,
	memory: '2GiB'
})

// TODO: make sure to add all the exports
// export * from './auth'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((_, response) => {
	logger.info('Hello logs HAHA!', { structuredData: true })
	response.send('Hello from Firebase!')
})

/** Create a user document in the database when a new firestore user is created */
export const createUserDoc = functions
	.region('australia-southeast1')
	.auth.user()
	.onCreate(async user => {
		logger.info('User created', { user })
		await db.users.add($ => ({
			displayName: user.displayName ?? null,
			email: user.email ?? null,
			createdAt: $.serverDate(),
			paymentDetails: {
				BSB: '123-456',
				accountNumber: '7890',
				beemId: '123'
			},
			friends: []
		}))
	})
