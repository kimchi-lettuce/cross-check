<script setup lang="ts">
import {
	CircleUser,
	Copy,
	CreditCard,
	File,
	Home,
	LineChart,
	ListFilter,
	MoreVertical,
	Package,
	Package2,
	PanelLeft,
	Search,
	Settings,
	ShoppingCart,
	Truck,
	Users2
} from 'lucide-vue-next'
</script>

<template>
	<header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
		<!-- This is the mobile menu sidebar sheet -->
		<Sheet>
			<SheetTrigger as-child>
				<!-- This is the button that opens the sidebar sheet -->
				<Button size="icon" variant="outline" class="sm:hidden">
					<PanelLeft class="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" class="sm:max-w-xs">
				<nav class="grid gap-6 text-lg font-medium">
					<a
						href="#"
						class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
					>
						<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
						<span class="sr-only">Acme Inc</span>
					</a>
					<a href="#" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
						<Home class="h-5 w-5" />
						Dashboard
					</a>
					<a href="#" class="flex items-center gap-4 px-2.5 text-foreground">
						<ShoppingCart class="h-5 w-5" />
						Orders
					</a>
					<a href="#" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
						<Package class="h-5 w-5" />
						Products
					</a>
					<a href="#" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
						<Users2 class="h-5 w-5" />
						Customers
					</a>
					<a href="#" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
						<LineChart class="h-5 w-5" />
						Settings
					</a>
				</nav>
			</SheetContent>
		</Sheet>

		<Breadcrumb class="hidden md:flex">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink as-child>
						<a href="#">Dashboard</a>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink as-child>
						<a href="#">Orders</a>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Recent Orders</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>

		<div class="relative ml-auto flex-1 md:grow-0">
			<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input type="search" placeholder="Search..." class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" />
		</div>

		<ProfileDropdownMenu />
	</header>
</template>
