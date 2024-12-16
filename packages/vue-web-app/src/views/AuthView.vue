<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const router = useRouter()
const error = ref('')

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

const onSubmit = async (data: z.infer<typeof loginSchema>) => {
	try {
		error.value = ''
		await signInWithEmailAndPassword(auth, data.email, data.password)
		router.push('/') // Redirect to home page after successful login
	} catch (e) {
		if (e instanceof Error) {
			error.value = e.message
		} else {
			error.value = 'Failed to login'
		}
	}
}
</script>

<template>
	<main class="container mx-auto p-4">
		<div class="max-w-md mx-auto">
			<h3 class="text-2xl font-bold mb-4">Login</h3>
			<AutoForm :schema="loginSchema" @submit="onSubmit">
				<div class="mt-4 flex flex-col gap-1">
					<p v-if="error" class="text-red-500">{{ error }}</p>
					<Button type="submit" class="w-full">Login</Button>
				</div>
			</AutoForm>
		</div>
	</main>
</template>
