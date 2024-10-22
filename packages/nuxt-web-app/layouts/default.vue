<script setup lang="ts">
import Footer from '~/components/global/Footer.vue'
import Header from '~/components/global/Header.vue'
useHead({
	htmlAttrs: {
		lang: 'en'
	},
	meta: [
		{
			property: 'og:title',
			content: `Nuxt Firebase Auth Starter`
		},
		{
			name: 'description',
			content: 'Starter Template For Nuxt Projects With Firebase Auth.'
		},
		{
			property: 'og:description',
			content: 'Starter Template For Nuxt Projects With Firebase Auth.'
		},
		{
			property: 'og:url',
			content: 'https://nuxt-firebase-auth-starter.vercel.app/'
		},
		{
			name: 'twitter:title',
			content: 'Starter Template For Nuxt Projects With Firebase Auth.'
		},
		{
			name: 'twitter:description',
			content: 'Starter Template For Nuxt Projects With Firebase Auth.'
		},
		{
			name: 'twitter:site',
			content: 'https://nuxt-firebase-auth-starter.vercel.app/'
		},
		{
			property: 'og:image',
			content: '/icons/favicon-32x32.png'
		},
		{
			property: 'og:image:type',
			content: 'image/png'
		}
	],
	title: `Nuxt Firebase Auth Starter`
})

defineOgImageComponent('Nuxt', {
	headline: 'Author: The Coding Montana',
	title: 'Nuxt Firebase Auth Starter',
	description: 'Starter Template For Nuxt Projects With Firebase Auth.'
})
const { user } = useFirebaseAuth()

const route = useRoute()
const breadcrumbs = computed(() => {
	const pathSegments = route.path.split('/').filter(Boolean)
	console.log('🚨', pathSegments)
	if (pathSegments[0] === 'clubSessions' && pathSegments[1]) {
		return [
			{ name: 'Home', path: '/' },
			{ name: `Session ${pathSegments[1]}`, path: route.path }
		]
	}
	return []
})
</script>

<template>
	<div v-if="!user" class="flex min-h-screen w-full justify-center items-center gap-3">
		<LoadingSpinner />
		Logging in...
	</div>
	<div v-else class="flex min-h-screen w-full flex-col bg-muted/40">
		<Sidebar />
		<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			<Header />

			<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
				<Breadcrumb v-if="breadcrumbs.length">
					<BreadcrumbList>
						<template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
							<BreadcrumbItem>
								<BreadcrumbLink v-if="index < breadcrumbs.length - 1" as-child>
									<NuxtLink :to="crumb.path">{{ crumb.name }}</NuxtLink>
								</BreadcrumbLink>
								<BreadcrumbPage v-else>{{ crumb.name }}</BreadcrumbPage>
							</BreadcrumbItem>
							<BreadcrumbSeparator v-if="index < breadcrumbs.length - 1" />
						</template>
					</BreadcrumbList>
				</Breadcrumb>
				<slot />
			</main>
		</div>
	</div>
</template>
