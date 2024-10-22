<script setup lang="ts">
import { ref } from 'vue'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './tooltip'

defineProps<{
	content: string
	className?: string
}>()

const open = ref(false)
const toggleOpen = () => (open.value = !open.value)
const setOpen = (value: boolean) => (open.value = value)
</script>

<template>
	<TooltipProvider :delay-duration="0">
		<Tooltip :open="open">
			<TooltipTrigger as-child>
				<button
					type="button"
					:class="['cursor-pointer', className]"
					@click="toggleOpen"
					@mouseenter="setOpen(true)"
					@mouseleave="setOpen(false)"
					@touchstart.prevent="toggleOpen"
					@keydown.enter.prevent="toggleOpen"
				>
					<slot></slot>
				</button>
			</TooltipTrigger>
			<TooltipContent :class="{ hidden: !content }">
				<span class="inline-block">{{ content }}</span>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</template>
