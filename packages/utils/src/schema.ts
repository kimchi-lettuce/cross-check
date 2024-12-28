import { schema, type Typesaurus } from 'typesaurus'

export interface User {
	username: string | null
	email: string | null
	createdAt: Typesaurus.ServerDate
	/** The `User` ids of the set friends for this user */
	friends: string[]
}

export const RESOURCE_TYPES = {
	Book: null,
	'Audio (podcasts)': { requiresUrl: true },
	Video: { requiresUrl: true },
	App: { requiresUrl: true },
	Website: { requiresUrl: true },
	'Study Material': null
} as const

type BaseResourceSubmission = {
	metadata: {
		type: keyof typeof RESOURCE_TYPES
		title: string
		author: string
		url?: string
	}
	submission: {
		submittedBy: Typesaurus.Id<'users'>
		submittedAt: Typesaurus.ServerDate
		congregationId: Typesaurus.Id<'clubs'>
	}
}

export type ResourceSubmission =
	| (BaseResourceSubmission & {
			status: 'pending'
	  })
	| (BaseResourceSubmission & {
			status: 'approved' | 'rejected'
			review: {
				reviewedBy: string
				reviewedAt: Typesaurus.ServerDate
			}
	  })

// export type PaymentDetail =
// 	| {
// 			BSB: string
// 			accountNumber: string
// 	  }
// 	| {
// 			beemId: string
// 	  }

// export interface User {
// 	email: string | null
// 	displayName: string | null
// 	createdAt: Typesaurus.ServerDate
// 	paymentDetails: PaymentDetail
// 	/** The `User` ids of the set friends for this user */
// 	friends: string[]
// }

// export interface SessionParticipant {
// 	userId: string
// 	/** TODO: We might need to add a sync in the future for if the user's name
// 	 * changes */
// 	name: string
// 	paymentStatus: 'waiting-list' | 'paid' | 'pending-confirmation' | 'cancelled'
// 	isWaitingListed?: {
// 		since: Typesaurus.ServerDate
// 	}
// }

// export interface Venue {
// 	name: string
// 	/** TODO: Do a custom function? */
// 	courtHire: {
// 		description: string
// 		centsPerHour: number
// 	}
// }

// // TODO: Lock this down on firestore security rules, exposing the ability to
// // edit it only be backend functions
// export interface ClubSession {
// 	durationMinutes: number
// 	dateAndTime: Typesaurus.ServerDate
// 	location: string

// 	/** The `Club` id */
// 	club: Typesaurus.Id<'clubs'>
// 	participants: SessionParticipant[]

// 	/** The `User` id of the coach */
// 	coach: string
// 	metaData: {
// 		title: string
// 		description: string
// 	}

// 	statuses: {
// 		session: 'draft' | 'upcoming' | 'completed' | 'cancelled'
// 		participantPayments: 'incomplete' | 'complete'
// 		coachPayment: 'incomplete' | 'complete'
// 	}
// 	cost: {
// 		courtFeeCents: number
// 		coachFeeCents: number
// 	}
// 	participantFeeCents: number

// 	attendanceRequirements: {
// 		max: number
// 		min: number
// 	}
// }

// export interface Club {
// 	timezone: string
// 	name: string
// 	/** The `User` ids of the admins */
// 	admins: string[]
// 	paymentDetails: PaymentDetail[]
// }

// export interface AttendedSession {
// 	/** The `ClubSession` id */
// 	clubSession: string
// 	/** The `User` id */
// 	user: string
// }
