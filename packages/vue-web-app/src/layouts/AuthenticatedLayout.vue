<script setup lang="ts">
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar/index.vue'
import AppHeader from '@/components/AppHeader/index.vue'
</script>

<template>
	<SidebarProvider>
		<div class="flex h-screen w-screen">
			<AppSidebar />
			<SidebarInset>
				<div class="flex flex-1 flex-col overflow-hidden">
					<AppHeader />
					<div class="flex-1 p-4 pt-2 overflow-y-auto">
						<slot />
					</div>
				</div>
			</SidebarInset>
		</div>
	</SidebarProvider>
</template>
