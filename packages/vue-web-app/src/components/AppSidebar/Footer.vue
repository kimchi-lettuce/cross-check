<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { auth } from '@/lib/firebaseConfig'
import { ChevronsUpDown, LogOut, ChevronRight, Bug } from 'lucide-vue-next'
import { ref } from 'vue'

const data = ref({
	user: {
		avatar: 'https://github.com/shadcn.png',
		name: 'John Doe',
		email: 'john.doe@example.com'
	}
})
</script>
<template>
	<SidebarFooter>
		<SidebarMenu>
			<SidebarMenuItem>
				<RouterLink to="/bug">
					<SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-between flex flex-row">
						<div class="size-8 min-w-8 flex items-center justify-center rounded-lg">
							<Bug class="size-4" />
						</div>
						<span class="truncate">Report an Issue</span>
						<div class="flex-1" />
						<ChevronRight class="size-4" />
					</SidebarMenuButton>
				</RouterLink>
			</SidebarMenuItem>

			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger as-child>
						<SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<Avatar class="h-8 w-8 rounded-lg">
								<AvatarImage :src="data.user.avatar" :alt="data.user.name" />
								<AvatarFallback class="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">{{ data.user.name }}</span>
								<span class="truncate text-xs">{{ data.user.email }}</span>
							</div>
							<ChevronsUpDown class="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
						<DropdownMenuItem @click="auth.signOut()">
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	</SidebarFooter>
</template>
