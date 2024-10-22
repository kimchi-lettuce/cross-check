<script setup lang="ts" generic="T">
import { ChevronsUpDown } from 'lucide-vue-next'

// FIXME: Need to bump Vue version to use prop destructuring
const { showDivider = true } = defineProps<{
	/** The title of the collapsible */
	title: string
	/** The entries to display */
	entries: (T & {
		/** Optional link to navigate to when the entry is clicked */
		link?: string
	})[]
	/** Whether or not to show a divider between entries */
	showDivider?: boolean
	/** A function to get the id of the entry, for rendering the `v-for` loop */
	getEntryId: (entry: T) => string
}>()

const isOpen = ref(false)
</script>

<template>
	<Collapsible v-model:open="isOpen" class="rounded-md border text-sm">
		<CollapsibleTrigger as-child>
			<div class="flex items-center gap-2 px-3 py-3">
				<ChevronsUpDown class="w-4 h-4" />
				<Badge variant="secondary">{{ entries.length }}</Badge>
				<h4 class="text-sm font-semibold">{{ title }}</h4>
			</div>
		</CollapsibleTrigger>

		<CollapsibleContent class="space-y-2">
			<NuxtLink
				v-for="(entry, index) in entries"
				:key="getEntryId(entry)"
				:to="entry.link || undefined"
				:event="entry.link ? 'click' : ''"
				:class="{ 'pointer-events-none': !entry.link }"
			>
				<div
					class="p-3"
					:class="[{ 'border-b border-gray-200': showDivider && index !== entries.length - 1 }, entry.link ? 'cursor-pointer hover:bg-slate-400' : 'cursor-default']"
				>
					<slot name="entry-content" :entry="entry" :index="index">
						<!-- Default content if no slot is provided -->
						{{ entry }}
					</slot>
				</div>
			</NuxtLink>
		</CollapsibleContent>
	</Collapsible>
</template>
