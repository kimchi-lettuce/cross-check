<script setup lang="ts">
import { CircleUser } from 'lucide-vue-next'
const { signOutUser } = useFirebaseAuth()

const router = useRouter()

async function signOutAndNavigateToLogin() {
	await signOutUser()
	await router.push('/login')
}
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="secondary" size="icon" class="rounded-full">
				<CircleUser class="h-5 w-5" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>My Account</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem>Settings</DropdownMenuItem>
			<DropdownMenuItem>Support</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="signOutAndNavigateToLogin">Logout</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
