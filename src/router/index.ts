import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from '@/view/HomeComponent.vue';

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomeComponent,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;