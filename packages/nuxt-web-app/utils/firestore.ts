import type { TypesaurusCore } from 'typesaurus'
import type { UnwrapRef } from 'vue'

export function reactiveFirestoreListener<T, B extends Array<any>>(
	/** The reactive source to watch for changes */
	watchSource: Ref<T[]>,
	/** The listener setup function */
	listenerSetup: (updatedSource: T[]) => TypesaurusCore.SubscriptionPromise<any, B>
) {
	const cleanup = ref<(() => void) | null>(null)
	const data = ref<B | null>(null)

	watch(
		watchSource,
		newValue => {
			// Clean up existing listener
			if (cleanup.value) cleanup.value()
			// Set up new listener
			cleanup.value = listenerSetup(newValue).on(newData => {
				// Important to use spread operator to ensure reactivity
				data.value = [...newData] as UnwrapRef<B>
			})
		},
		{ immediate: true }
	)

	onBeforeUnmount(() => cleanup.value && cleanup.value())
	return { data }
}

// FIXME: Shouldn't this return the data?
/** Helps reduce boilerplate for firestore listeners by adding auto cleanup */
export function firestoreListener(
	/** The listener setup function */
	listenerSetup: () => TypesaurusCore.OffSubscriptionWithCatch
) {
	const cleanup = listenerSetup()
	onBeforeUnmount(() => {
		if (cleanup) cleanup()
	})
}
