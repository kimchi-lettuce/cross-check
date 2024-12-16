<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { auth } from '@/lib/firebaseConfig'

const authStore = useAuthStore()
</script>

<template>
	<h3>Home</h3>
	<p>{{ authStore.user?.email }}</p>
	<Button @click="auth.signOut()">Sign out</Button>
</template>
