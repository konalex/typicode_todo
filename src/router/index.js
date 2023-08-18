import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/HomeView.vue'),
		beforeEnter: (to, from, next) => {
			if (store.getters.isAuthorized) {
				store.dispatch('getAllUsers');
				next();
			} else router.push({ name: 'login' });
		},
	},
	{
		path: '/',
		name: 'login',
		component: () => import('@/views/LoginView.vue'),
		beforeEnter: (to, from, next) => {
			if (store.getters.isAuthorized) router.push({ name: 'home' });
			else next();
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: import.meta.env.BASE_URL,
	routes,
});

export default router;
