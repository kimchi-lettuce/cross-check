<script setup lang="ts">
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/firebaseConfig'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import { z } from 'zod'

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
})

const error = ref('')
const isLoading = ref(false)
const isGoogleLoading = ref(false)

/** Signs in the user with the given email and password */
const onSubmit = async (data: z.infer<typeof loginSchema>) => {
	try {
		error.value = ''
		isLoading.value = true
		await signInWithEmailAndPassword(auth, data.email, data.password)
	} catch (e) {
		console.error('Failed to login with email/password:', e)
		if (e instanceof Error) {
			error.value = e.message
		} else {
			error.value = 'Failed to login'
		}
	} finally {
		isLoading.value = false
	}
}

/** Signs in the user with Google */
const signInWithGoogle = async () => {
	try {
		error.value = ''
		isGoogleLoading.value = true
		const provider = new GoogleAuthProvider()
		await signInWithPopup(auth, provider)
	} catch (e) {
		console.error('Failed to login with Google:', e)
		if (e instanceof Error) {
			error.value = e.message
		} else {
			error.value = 'Failed to login with Google'
		}
	} finally {
		isGoogleLoading.value = false
	}
}
</script>

<template>
	<Card class="mx-auto max-w-sm">
		<CardHeader class="pb-3">
			<CardTitle class="text-2xl">Login</CardTitle>
			<CardDescription>Enter your email below to login to your account</CardDescription>
		</CardHeader>
		<CardContent>
			<AutoForm :schema="loginSchema" @submit="onSubmit">
				<div class="mt-4 flex flex-col gap-2">
					<p v-if="error" class="text-red-500">{{ error }}</p>
					<Button type="submit" class="w-full" :disabled="isLoading">
						<Loader2 v-if="isLoading" class="w-4 h-4 animate-spin" />
						{{ isLoading ? 'Logging in...' : 'Login' }}
					</Button>
					<Button variant="outline" type="button" class="w-full" @click="signInWithGoogle" :disabled="isGoogleLoading">
						<GoogleIcon />
						{{ isGoogleLoading ? 'Loading...' : 'Sign in with Google' }}
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
