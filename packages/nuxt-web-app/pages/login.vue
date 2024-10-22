<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const { signinWith, user } = useFirebaseAuth()
const router = useRouter()

definePageMeta({
	layout: 'auth'
})

onMounted(() => {
	if (user.value) router.push('/')
})

async function loginWithGoogle() {
	const { success } = await signinWith('google')
	if (success) router.push('/')
}
</script>

<template>
	<Card class="mx-auto max-w-sm h-fit">
		<CardHeader>
			{{ user ? 'logged-in' : 'not-logged-in' }}
			<CardTitle class="text-2xl">Login</CardTitle>
			<CardDescription>Enter your email below to login to your account</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="#" class="ml-auto inline-block text-sm underline">Forgot your password?</a>
					</div>
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" class="w-full" @click="() => console.log('hi')">Login</Button>
				<Button variant="outline" class="w-full" @click="loginWithGoogle">Login with Google</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="#" class="underline">Sign up</a>
			</div>
		</CardContent>
	</Card>
</template>
