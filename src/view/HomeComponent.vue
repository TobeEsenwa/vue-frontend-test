<template>
	<div class="header">
		<SearchResults @search="performSearch" />
	</div>

	<div class="container">
		<PhotoGridComponent
				:photos="photos"
				@photoClick="openModal"
		/>

		<ImageModal
				v-if="selectedPhoto"
				:photo="selectedPhoto"
				@close="closeModal"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageModal from "../components/ImageModal.vue";
import { fetchUnsplashImages, type UnsplashPhoto } from '@/utils';
import SearchResults from '@/components/SearchResults.vue';
import PhotoGridComponent from '@/components/PhotoGridComponent.vue';

const photos = ref<UnsplashPhoto[]>([]);
const selectedPhoto = ref<UnsplashPhoto | null>(null);

const fetchInitialPhotos = async () => {
	try {
		photos.value = await fetchUnsplashImages();
	} catch (error) {
		console.error("Error fetching initial photos:", error);
	}
};

const performSearch = async (query: string) => {
	try {
		photos.value = await fetchUnsplashImages(query);
	} catch (error) {
		console.error("Error fetching photos:", error);
	}
};

const openModal = (photo: UnsplashPhoto) => {
	selectedPhoto.value = photo;
};

const closeModal = () => {
	selectedPhoto.value = null;
};

fetchInitialPhotos();
</script>

<style scoped lang="postcss">
.container {
	@apply mx-auto p-4 relative z-10;
	margin-top: -10em;
}

.header {
	@apply flex items-center h-[20em] justify-center py-8 bg-[#f0f4f8] relative z-0;
}
</style>
