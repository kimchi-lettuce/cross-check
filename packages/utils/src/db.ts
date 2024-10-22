import { schema, type Typesaurus } from 'typesaurus'
import { GeoPoint } from 'firebase/firestore'

/** Interact with Firestore with typesafety. Compatible for both the frontend
 * and backend */
export const db = schema($ => ({
	users: $.collection<User>(),
	clubSessions: $.collection<ClubSession>(),
	clubs: $.collection<Club>(),
	attendedSessionHistory: $.collection<AttendedSession>(),
	venues: $.collection<Venue>()
}))

export type PaymentDetail =
	| {
			BSB: string
			accountNumber: string
	  }
	| {
			beemId: string
	  }

export interface User {
	email: string | null
	displayName: string | null
	createdAt: Typesaurus.ServerDate
	paymentDetails: PaymentDetail
	/** The `User` ids of the set friends for this user */
	friends: string[]
}

export interface SessionParticipant {
	userId: string
	/** TODO: We might need to add a sync in the future for if the user's name
	 * changes */
	name: string
	paymentStatus: 'waiting-list' | 'paid' | 'pending-confirmation' | 'cancelled'
	isWaitingListed?: {
		since: Typesaurus.ServerDate
	}
}

export interface Venue {
	name: string
	location: GeoPoint
	/** TODO: Do a custom function? */
	courtHire: {
		description: string
		centsPerHour: number
	}
}


// TODO: Lock this down on firestore security rules, exposing the ability to
// edit it only be backend functions
export interface ClubSession {
	durationMinutes: number
	dateAndTime: Typesaurus.ServerDate
	location: string

	/** The `Club` id */
	club: Typesaurus.Id<"clubs">
	participants: SessionParticipant[]

	/** The `User` id of the coach */
	coach: string
	metaData: {
		title: string
		description: string
	}

	statuses: {
		session: 'draft' | 'upcoming' | 'completed' | 'cancelled'
		participantPayments: 'incomplete' | 'complete'
		coachPayment: 'incomplete' | 'complete'
	}
	cost: {
		courtFeeCents: number
		coachFeeCents: number
	}
	participantFeeCents: number

	attendanceRequirements: {
		max: number
		min: number
	}
}

export interface Club {
	timezone: string
	name: string
	/** The `User` ids of the admins */
	admins: string[]
	paymentDetails: PaymentDetail[]
}

export interface AttendedSession {
	/** The `ClubSession` id */
	clubSession: string
	/** The `User` id */
	user: string
}

export type Schema = Typesaurus.Schema<typeof db>
