<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import MainContent from '@/components/MainContent.vue'
</script>

<template>
	<SidebarProvider>
		<div class="flex h-screen">
			<AppSidebar />
			<div class="flex flex-1 flex-col overflow-hidden">
				<AppHeader />
				<MainContent>
					<slot></slot>
				</MainContent>
			</div>
		</div>
	</SidebarProvider>
</template>
