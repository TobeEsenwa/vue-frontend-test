<template>
	<div class="overlay-modal" @click="close">
		<button class="close-button" @click="close">✕</button>

		<div class="content-modal" @click.stop>
			<template v-if="!photo?.urls.full">
				<v-skeleton-loader
						type="image"
						class="image-modal"
				/>
			</template>

			<template v-else>
				<img
						:src="photo?.urls.full"
						:alt="photo?.alt_description"
						class="image-modal"
				/>
			</template>

			<div class="text-modal">
				<h2 class="photo-description">{{ photo?.alt_description }}</h2>
				<p class="photo-author">Photo by: {{ photo?.user.name }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { UnsplashPhoto } from '@/utils';

defineProps({
	photo: Object as () => UnsplashPhoto
});

const emit = defineEmits(['close']);

const close = () => {
	emit('close');
};
</script>

<style scoped lang="postcss">
.overlay-modal {
	@apply fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center;
}

.content-modal {
	@apply relative flex flex-col bg-white rounded-lg shadow-lg w-4/5 h-4/5 overflow-hidden;
}

.image-modal {
	@apply w-full object-cover;
	height: calc(100% - 120px);
}

.text-modal {
	@apply absolute bottom-0 left-0 w-full p-6 bg-white;
	height: 120px;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.photo-description {
	@apply text-xl font-normal mt-1 text-blue-950;
}

.photo-author {
	@apply text-sm mt-1 text-gray-700 font-normal;
}

.close-button {
	@apply absolute top-6 right-6 text-2xl font-bold text-white px-2 py-1 cursor-pointer hover:text-red-600 transition
	duration-300;
}
</style>
