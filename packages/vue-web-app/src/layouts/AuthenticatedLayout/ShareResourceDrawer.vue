<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { DependencyType } from '@/components/ui/auto-form/interface'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { useAuthStore } from '@/stores/authStore'
import { db } from '@repo/utils'
import { RESOURCE_TYPES } from '@repo/utils/src/schema'
import { Loader2, Plus, X } from 'lucide-vue-next'
import type { Typesaurus } from 'typesaurus'
import { ref } from 'vue'
import { z } from 'zod'

const resourceSchema = z.object({
	type: z.enum(Object.keys(RESOURCE_TYPES) as [string, ...string[]], {
		required_error: 'Please select a resource type',
		description: 'What kind of resource are you sharing?'
	}),
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	url: z.string().url('Must be a valid URL').optional()
})

const urlRequiringTypes = Object.entries(RESOURCE_TYPES)
	.filter(([_, config]) => config?.requiresUrl)
	.map(([type]) => type)

const isLoading = ref(false)
const authStore = useAuthStore()

const onSubmit = async (data: z.infer<typeof resourceSchema>) => {
	try {
		isLoading.value = true
		// TODO: Implement resource sharing logic
		await db.resourceSubmissions.add($ => ({
			metadata: {
				type: 'Book',
				title: 'Sample Book Title',
				author: 'John Doe',
				url: 'https://example.com'
			},
			submission: {
				submittedBy: authStore.uid!,
				submittedAt: $.serverDate(),
				congregationId: '123' as Typesaurus.Id<'clubs'>
			},
			status: 'pending'
		}))
		console.log('✅')
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<Drawer>
		<DrawerTrigger as-child>
			<Button>
				<Plus />
				Share a Resource
			</Button>
		</DrawerTrigger>
		<DrawerContent direction="right">
			<div class="mx-auto w-full max-w-sm">
				<DrawerHeader>
					<DrawerTitle>Share Resource</DrawerTitle>
					<DrawerDescription>Add a resource to share with the community</DrawerDescription>
					<DrawerClose as-child>
						<Button variant="ghost" size="icon" class="absolute right-2 top-2">
							<X class="h-4 w-4" />
							<span class="sr-only">Close</span>
						</Button>
					</DrawerClose>
				</DrawerHeader>

				<div class="px-4">
					<AutoForm
						:schema="resourceSchema"
						:dependencies="[
							{
								sourceField: 'type',
								type: DependencyType.REQUIRES,
								targetField: 'url',
								when: (type: string) => {
									console.log('type', type)
									return urlRequiringTypes.includes(type)
								}
							}
						]"
						@submit="onSubmit"
						class="grid gap-4"
					>
						<div class="mt-auto flex flex-col gap-2 p-4 px-0">
							<span class="text-sm text-muted-foreground">
								By submitting the resource, a staff of your congregation will review it and it will be published if it is appropriate
							</span>
							<div class="flex gap-2">
								<DrawerClose as-child>
									<Button variant="outline" class="flex-1">Cancel</Button>
								</DrawerClose>
								<Button class="flex-1" :disabled="isLoading" type="submit">
									<Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
									{{ isLoading ? 'Please wait' : 'Submit' }}
								</Button>
							</div>
						</div>
					</AutoForm>
				</div>
			</div>
		</DrawerContent>
	</Drawer>
</template>
