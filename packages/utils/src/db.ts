import { schema, type Typesaurus } from 'typesaurus'
import { Club, ClubSession, User, Venue } from './schema'

/** Interact with Firestore with typesafety. Compatible for both the frontend
 * and backend */
export const db = schema($ => ({
	users: $.collection<User>(),
	clubSessions: $.collection<ClubSession>(),
	clubs: $.collection<Club>(),
	venues: $.collection<Venue>()
}))

export type Schema = Typesaurus.Schema<typeof db>
