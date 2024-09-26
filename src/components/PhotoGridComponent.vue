<template>
	<div class="flex-photo-container">
		<template v-if="photos?.length === 0 && photosLoaded">
			<div class="no-photos-message">
				<img src="@/assets/not-found.svg" alt="Not Found" class="not-found" />
				<p>No photos available. Please search again.</p>
			</div>
		</template>

		<template v-else>
			<div
					v-for="(photo, index) in photos"
					:key="photo.id || index"
					class="flex-photo-item"
					@click="handlePhotoClick(photo)"
					:class="getItemHeightClass(index)"
			>
				<template v-if="!photosLoaded">
					<v-skeleton-loader class="image-skeleton" type="image" />
					<div class="text-loader">
						<v-skeleton-loader type="list-item-two-line" />
					</div>
				</template>

				<template v-else>
					<img :src="photo.urls.small" :alt="photo.alt_description" class="photo-image" />
					<div class="photo-details">
						<span class="photo-name">{{ photo.user.name }}</span>
						<br />
						<small>{{ photo.user.location }}</small>
					</div>
				</template>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { UnsplashPhoto } from '@/utils';

defineProps({
	photos: Array as () => UnsplashPhoto[],
});

const photosLoaded = ref(false); // Track when photos are fully loaded
const emit = defineEmits(['photoClick']);

// Simulate photo loading delay
onMounted(() => {
	setTimeout(() => {
		photosLoaded.value = true;
	}, 2000);
});

// Function to assign heights based on position in the flex layout
const getItemHeightClass = (index: number) => {
	const heights = ['h-[450px]', 'h-[550px]', 'h-[460px]', 'h-[460px]', 'h-[550px]', 'h-[450px]'];
	return heights[index % heights.length];
};

const handlePhotoClick = (photo: UnsplashPhoto) => {
	if (photosLoaded.value) {
		emit('photoClick', photo);
	}
};
</script>

<style scoped lang="postcss">
.flex-photo-container {
	@apply flex flex-wrap gap-6 justify-center p-10;
}

.flex-photo-item {
	@apply relative overflow-hidden bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer;
	flex: 0 1 calc(33.333% - 1rem);
	position: relative;
}

.image-skeleton {
	@apply w-full h-full object-cover rounded-lg;
}

.text-loader {
	@apply absolute bottom-0 left-0 w-full p-2;
}

.photo-image {
	@apply w-full h-full object-cover rounded-lg transition-opacity duration-300 ease-in-out;
}

.photo-details {
	@apply absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent text-white text-sm
	rounded-b-lg;
}

.photo-details span {
	@apply font-normal;
}

.photo-name {
	@apply font-semibold text-xl;
}

::v-deep .v-skeleton-loader__image {
	height: 600px;
}

.flex-photo-item:hover .photo-image {
	@apply opacity-80;
}

.no-photos-message .not-found {
	@apply text-center mt-20
}

.no-photos-message p {
	@apply text-center text-3xl text-gray-500;
}

@media (max-width: 768px) {
	.flex-photo-item {
		flex: 0 1 calc(50% - 1rem);
	}
}

@media (max-width: 480px) {
	.flex-photo-item {
		flex: 0 1 calc(100% - 1rem);
	}
}
</style>
