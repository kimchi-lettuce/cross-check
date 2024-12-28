import { schema, type Typesaurus } from 'typesaurus'
import type { User, ResourceSubmission } from './schema'

/** Interact with Firestore with typesafety. Compatible for both the frontend
 * and backend */
export const db = schema($ => ({
	users: $.collection<User>(),
	resourceSubmissions: $.collection<ResourceSubmission>()
}))

export type Schema = Typesaurus.Schema<typeof db>
