import { ref, watch, computed } from 'vue'
import type { Ref } from 'vue'
import type { TypesaurusCore } from 'typesaurus'

type ReadResult<T> = {
	/** A reactive reference to the query result. Returns undefined if the query
	 * is not yet resolved, or null if the data is confirmed not found */
	result: Ref<T | undefined>
	status: Ref<{
		/** Boolean indicating if the query is in progress */
		loading: boolean
		/** Any error that occurred during the query */
		error: unknown
	}>
}

/**
 * A composable function that handles reading and subscribing to Typesaurus
 * queries with Vue reactivity
 * - `useRead` manages the state of reading data from a Typesaurus query,
 *   handling both one-time promises and real-time subscriptions
 * - It provides reactive state management for loading, error, and result
 *   states.
 *
 * @template Request - The Typesaurus request type
 * @template Result - The expected result type from the query
 * @template SubscriptionMeta - Optional metadata type for subscriptions
 *
 * @returns {ReadResult<Result>} An object containing:
 * - `result`: A reactive reference to the query result
 * - `status`: A computed object containing:
 *   - `loading`: Boolean indicating if the query is in progress
 *   - `error`: Any error that occurred during the query
 *
 * @example
 * ```typescript
 * // Subscribe to user updates
 * const [user, { error, loading }] = useRead(db.users.get(userId).on);
 * // Get user once
 * const [user, { error, loading }] = useRead(db.users.get(userId));
 * // Wait for userId to resolve, then fetch the user:
 * const [user, { error, loading }] = useRead(userId && db.users.get(userId));
 * // Wait for userId to resolve, then fetch the user's posts:
 * const [posts] = useRead(
 *   db.posts.query(($) => userId && $.field('author').eq(userId))
 * );
 * ```
 */
export function useRead<Request extends TypesaurusCore.Request<any>, Result, SubscriptionMeta = undefined>(
	/** A Vue ref containing either a Typesaurus query promise, subscription, or
	 * null */
	query: Ref<TypesaurusCore.SubscriptionPromise<Request, Result, SubscriptionMeta> | TypesaurusCore.SubscriptionPromiseOn<Request, Result, SubscriptionMeta> | null>
): ReadResult<Result> {
	const result = ref<Result | undefined>(undefined)
	const error = ref<unknown>(undefined)
	const loading = computed(() => result.value === undefined && !error.value)
	const ignoreRef = ref(false)

	function setResult(newResult: Result) {
		if (!ignoreRef.value) {
			result.value = newResult
		}
	}

	function setError(newError: unknown) {
		if (!ignoreRef.value) {
			error.value = newError
		}
	}

	// Watch the query ref for changes
	watch(
		query,
		(newQuery, _, onInvalidate) => {
			// Reset state
			result.value = undefined
			error.value = undefined
			ignoreRef.value = false

			// If the query is null, exit early
			if (!newQuery) return

			if (typeof newQuery === 'function') {
				// @ts-expect-error - (Subscription mode) The type here for
				// `SubscriptionPromiseCallback` is clearly correct, but it's
				// not being recognized
				const off = newQuery(setResult).catch(setError)

				// Cleanup when the query changes or component is unmounted
				onInvalidate(() => {
					ignoreRef.value = true
					off()
				})
			} else {
				// Promise mode
				newQuery.then(setResult).catch(setError)

				// Cleanup when the query changes
				onInvalidate(() => {
					ignoreRef.value = true
				})
			}
		},
		{ immediate: true }
	)

	// Return the result and status as a tuple
	return {
		result,
		status: computed(() => ({
			loading: loading.value,
			error: error.value
		}))
	} as ReadResult<Result>
}
