<script setup lang="ts">
import { db, type ClubSession } from '@repo/utils'
import type { Typesaurus } from 'typesaurus'
import { Calendar, MapPin } from 'lucide-vue-next'

const upcomingSessions = ref<Typesaurus.Doc<ClubSession>[]>([])

firestoreListener(() =>
	db.clubSessions
		.query($ => [$.field('statuses', 'session').eq('upcoming')])
		.on(sessions => {
			upcomingSessions.value = sessions
		})
)

const { data: clubs } = reactiveFirestoreListener(upcomingSessions, sessions => db.clubs.many(sessions.map(s => s.data.club)))

function getClubData(clubId: string) {
	return clubs.value?.find(c => c?.ref.id === clubId)?.data || null
}
</script>

<template>
	<CollapsibleEntries
		title="Available Sessions"
		:entries="upcomingSessions.map(s => ({ ...s.data, id: s.ref.id, link: `/clubSessions/${s.ref.id}` }))"
		:getEntryId="s => s.id"
		:showDivider="true"
	>
		<template #entry-content="{ entry }">
			<div>
				<span>
					<span>{{ getClubData(entry.club)?.name }}:</span>
					<span class="font-semibold mb-2">{{ entry.metaData.title }}</span>
				</span>
				<div class="flex items-center">
					<Calendar class="w-4 h-4 mr-2" />
					{{ dateTimeFormat(entry.dateAndTime) }}
				</div>

				<div class="flex items-center">
					<MapPin class="w-4 h-4 mr-2" />
					{{ entry.location }}
				</div>
				<div class="flex items-center">
					<strong>Participants:</strong>
					{{ entry.participants.length }}/{{ entry.attendanceRequirements.max }}
				</div>
			</div>
		</template>
	</CollapsibleEntries>
</template>
