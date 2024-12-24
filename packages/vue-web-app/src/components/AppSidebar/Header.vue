<script setup lang="ts">
import SidebarHeader from '@/components/ui/sidebar/SidebarHeader.vue'
import SidebarMenu from '@/components/ui/sidebar/SidebarMenu.vue'
import SidebarMenuItem from '@/components/ui/sidebar/SidebarMenuItem.vue'
import SidebarMenuButton from '@/components/ui/sidebar/SidebarMenuButton.vue'
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuLabel from '@/components/ui/dropdown-menu/DropdownMenuLabel.vue'
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuShortcut from '@/components/ui/dropdown-menu/DropdownMenuShortcut.vue'
import DropdownMenuSeparator from '@/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
import { ref } from 'vue'
import { ChevronsUpDown, Plus } from 'lucide-vue-next'

const activeTeam = ref({
	name: 'Acme!',
	logo: 'LogoIcon',
	plan: 'Pro123'
})

const fakeTeams = [
	{
		name: 'Acme',
		logo: 'LogoIcon',
		plan: 'Pro'
	}
]
</script>

<template>
	<SidebarHeader>
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger as-child>
						<SidebarMenuButton size="lg" class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<component :is="activeTeam.logo" class="size-4" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">{{ activeTeam.name }}</span>
								<span class="truncate text-xs">{{ activeTeam.plan }}</span>
							</div>

							<ChevronsUpDown class="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="bottom" :side-offset="4">
						<DropdownMenuLabel class="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
						<DropdownMenuItem v-for="(team, index) in fakeTeams" :key="team.name" class="gap-2 p-2">
							<div class="flex size-6 items-center justify-center rounded-sm border">
								<component :is="team.logo" class="size-4 shrink-0" />
							</div>
							{{ team.name }}
							<DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem class="gap-2 p-2">
							<div class="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus class="size-4" />
							</div>
							<div class="font-medium text-muted-foreground">Add team</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	</SidebarHeader>
</template>
