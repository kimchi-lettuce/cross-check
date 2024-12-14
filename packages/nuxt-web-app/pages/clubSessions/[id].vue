<script setup lang="ts">
import { db, type ClubSession } from '@repo/utils'
import type { Typesaurus } from 'typesaurus'
import { CheckCircle, Clock } from 'lucide-vue-next'
import TooltipWithTouch from '@/components/ui/TooltipWithTouch.vue'

const route = useRoute()
const sessionData = ref<Typesaurus.Doc<ClubSession>>()
const notFound = ref(false)

firestoreListener(() =>
	db.clubSessions.get(route.params.id as Typesaurus.Id<'clubSessions'>).on(doc => {
		if (!doc) return (notFound.value = true)
		sessionData.value = doc
	})
)
</script>

<template>
	<template v-if="notFound">
		<div class="absolute left-0 top-0 w-full h-screen flex flex-col items-center justify-center px-6">
			<h1 class="text-2xl font-bold">Club Session Not Found</h1>
			<p class="text-center">The requested club session could not be found.</p>
		</div>
	</template>
	<template v-else>
		<div>
			<div>
				<h1 class="text-2xl font-bold">{{ sessionData?.data.metaData.title }}</h1>
				<p class="text-sm">{{ sessionData?.data.metaData.description }}</p>
			</div>

			<CollapsibleEntries
				:entries="[
					{ name: 'Roy Zheng', id: 1 },
					{ name: 'Roy Zheng', id: 2 }
				]"
				title="Attending"
				:getEntryId="e => e.id.toString()"
				showDivider
			>
				<template #entry-content="{ entry, index }">
					<div class="flex justify-between">
						<div>
							<span>{{ index + 1 }}.</span>
							{{ entry.name }}
						</div>

						<div class="flex items-center space-x-2">
							<Badge variant="success">
								<CheckCircle class="w-4 h-4" />
							</Badge>

							<ClientOnly>
								<TooltipWithTouch content="Payment pending confirmation">
									<Badge variant="warning">
										<Clock class="w-4 h-4" />
									</Badge>
								</TooltipWithTouch>
							</ClientOnly>
						</div>
					</div>
				</template>
			</CollapsibleEntries>
		</div>
	</template>
</template>
