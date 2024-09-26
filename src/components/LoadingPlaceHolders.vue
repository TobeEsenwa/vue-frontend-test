<template>
	<div class="skeleton-loader"></div>
</template>

<style scoped>
.skeleton-loader {
	background-color: #f0f0f0;
	height: 200px;
	width: 100%;
	border-radius: 10px;
	animation: pulse 1.5s infinite;

	@keyframes pulse {
		0% {
			background-color: #f0f0f0;
		}
		50% {
			background-color: #e0e0e0;
		}
		100% {
			background-color: #f0f0f0;
		}
	}
}
</style>
