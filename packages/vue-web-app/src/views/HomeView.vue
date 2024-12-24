<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
	<h3>Home</h3>
	<p>{{ authStore.user?.email }}</p>
</template>
