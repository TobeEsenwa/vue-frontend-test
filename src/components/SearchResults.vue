<template>
	<div class="search-bar-container">
		<div v-if="showInput" class="w-[90%] contents">
			<input
					type="text"
					v-model="searchQuery"
					placeholder="Search for photos..."
					class="search-input"
			/>
		</div>
		<div v-else class="flex items-start w-[90%]">
			<span class="search-result">Search Results For</span>
			<span class="last-search"> "{{ lastSearchQuery }}"</span>
			<button @click="resetSearch" class="ml-2 h-full">
				<icon icon="ic:baseline-search" class="search-icon" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { Icon } from '@iconify/vue';

const emit = defineEmits(['search', 'loading']);
const searchQuery = ref('');
const lastSearchQuery = ref('');
const showInput = ref(true);

const submitSearch = useDebounceFn(() => {
	emit('search', searchQuery.value);
	emit('loading', true);
	lastSearchQuery.value = searchQuery.value;
	showInput.value = false;
}, 1000);

const resetSearch = () => {
	showInput.value = true;
	searchQuery.value = '';
	emit('search', '');
};

watch(searchQuery, (newVal) => {
	if (newVal === '') {
		emit('search', '');
	} else {
		submitSearch();
	}
});
</script>

<style scoped lang="postcss">
.search-bar-container {
	@apply flex justify-center w-full mb-12;
}

.search-input {
	@apply w-full px-6 py-3 text-base bg-white rounded-md border border-gray-300 shadow-sm;
	max-width: 90%;
	box-sizing: border-box;
}

.search-result {
	@apply text-4xl font-semibold text-blue-950;
}

.last-search {
	@apply text-4xl font-medium text-gray-500;
	margin-left: 5px;
}

.search-icon {
	@apply cursor-pointer text-4xl text-gray-700;
}
</style>
