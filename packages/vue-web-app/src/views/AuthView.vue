<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { z } from 'zod'

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

const error = ref('')
const isLoading = ref(false)

/** Signs in the user with the given email and password */
const onSubmit = async (data: z.infer<typeof loginSchema>) => {
	try {
		error.value = ''
		isLoading.value = true
		await signInWithEmailAndPassword(auth, data.email, data.password)
	} catch (e) {
		if (e instanceof Error) {
			error.value = e.message
		} else {
			error.value = 'Failed to login'
		}
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<Card class="mx-auto max-w-sm">
		<CardHeader>
			<CardTitle class="text-2xl">Login</CardTitle>
			<CardDescription>Enter your email below to login to your account</CardDescription>
		</CardHeader>
		<CardContent>
			<AutoForm :schema="loginSchema" @submit="onSubmit">
				<div class="mt-4 flex flex-col gap-1">
					<p v-if="error" class="text-red-500">{{ error }}</p>
					<Button type="submit" class="w-full" :disabled="isLoading">
						<Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
						{{ isLoading ? 'Logging in...' : 'Login' }}
					</Button>
				</div>
			</AutoForm>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="#" class="underline">Sign up</a>
			</div>
		</CardContent>
	</Card>
</template>
