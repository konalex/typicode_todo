import { login, getUsersId } from '@/api/user';

const state = {
	userId: '' || sessionStorage.getItem('userId'),
	info: JSON.parse(sessionStorage.getItem('userinfo')) || {},
	users: [],
};

const getters = {
	isAuthorized: (state) => !!state.userId,
};

const mutations = {
	SET_USER_ID(state, value) {
		state.userId = value;
	},
	SET_IS_AUTHORIZED(state, value) {
		state.isAuthorized = value;
	},
	SET_INFO(state, value) {
		state.info = { ...value };
	},
	SET_USERS(state, value) {
		state.users = value;
	},
};

const actions = {
	async auth({ commit }, payload) {
		if (this.getters.isAuthorized) return true;
		try {
			const { name, phone } = payload;
			const response = await login(name, phone);

			commit('SET_USER_ID', response.id);
			commit('SET_INFO', response);
			commit('SET_IS_AUTHORIZED', true);

			sessionStorage.setItem('userId', response.id);
			sessionStorage.setItem('userinfo', JSON.stringify(response));
		} catch (er) {
			throw new Error(er.message);
		}
	},
	async getAllUsers({ state, commit }) {
		if (state.users.length) return state.users;

		const response = await getUsersId();

		commit('SET_USERS', response);
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
