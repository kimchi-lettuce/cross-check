<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
	const paths = route.path.split('/').filter(Boolean)
	return paths.map((path, index) => {
		const fullPath = '/' + paths.slice(0, index + 1).join('/')
		return {
			name: formatBreadcrumb(path),
			path: fullPath
		}
	})
})

const formatBreadcrumb = (path: string) => {
	// Convert kebab-case to Title Case
	return path
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}
</script>

<template>
	<Breadcrumb>
		<BreadcrumbList>
			<template v-for="(crumb, index) in breadcrumbs" :key="index">
				<BreadcrumbItem :class="{ 'hidden md:block': index !== breadcrumbs.length - 1 }">
					<BreadcrumbLink v-if="index < breadcrumbs.length - 1" :href="crumb.path">
						{{ crumb.name }}
					</BreadcrumbLink>
					<BreadcrumbPage v-else>{{ crumb.name }}</BreadcrumbPage>
				</BreadcrumbItem>
				<BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" class="hidden md:block" />
			</template>
		</BreadcrumbList>
	</Breadcrumb>
</template>
