<script setup lang="ts">
import { z } from 'zod'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

const onSubmit = (data: z.infer<typeof loginSchema>) => {
	console.log('Form submitted:', data)
}
</script>

<template>
	<main class="container mx-auto p-4">
		<div class="max-w-md mx-auto">
			<h3 class="text-2xl font-bold mb-4">Login</h3>
			<AutoForm :schema="loginSchema" @submit="onSubmit">
				<Button type="submit" class="w-full">Login</Button>
			</AutoForm>
		</div>
	</main>
</template>
