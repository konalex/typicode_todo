import { searchTasks, addTask } from '@/api/tasks';
import { completedStates } from '@/utils/enums';

function filterByState(arr, state) {
	if (+state > 0) {
		if (+state === 3) {
			arr = arr.filter((el) => el.favorite);
		} else {
			arr = arr.filter((el) => el.completed === completedStates[state]);
		}
	}

	return arr;
}

const state = {
	tasks: [],
	favorites: JSON.parse(localStorage.getItem('typicode_todos_favorites')) || [],
	filters: {
		state: 0,
		userId: 0,
		string: '',
	},
	created: JSON.parse(sessionStorage.getItem('typicode_todos_created')) || [],
};

const getters = {
	getAll: (state) => state.tasks,
	getCompleted: (state) => (state.tasks && state.tasks.filter((el) => el.completed)) || [],
	getUnCompleted: (state) => (state.tasks && state.tasks.filter((el) => !el.completed)) || [],
	getFavorites: (state) => (state.tasks && state.tasks.filter((el) => el.favorite)) || [],
	getTasksByUserId: (state) => (id) => (state.tasks && state.tasks.filter((el) => el.userId === +id)) || [],
};
const mutations = {
	SET_TASKS(state, value) {
		state.tasks = value;
	},
	SET_FILTER(state, payload) {
		const { key, value } = payload;
		state.filters[key] = value;
	},
	CHANGE_TASK_STATE(state, value) {
		const task = state.tasks.find((el) => el.id === value);
		state.tasks.find((el) => el.id === value).completed = !task.completed;
	},
	CHANGE_TASKS_FAVORITE(state, value) {
		const task = state.tasks.find((el) => el.id === value);
		state.tasks.find((el) => el.id === value).favorite = !task.favorite;
	},
	SET_FAVORITE_TASKS(state, value) {
		state.favorites = value;
	},
	ADD_TASK(state, value) {
		state.tasks.unshift(value);
	},
};
const actions = {
	changeTaskByID({ commit }, value) {
		commit('CHANGE_TASK_STATE', value);
	},
	toggleFavorite({ state, commit }, id) {
		const favorites = [...state.favorites];

		const task = favorites.findIndex((el) => +el === +id);

		if (task !== -1) favorites.splice(task, 1);
		else {
			const item = state.tasks.find((el) => +el.id === +id);
			if (item) favorites.push(item.id);
		}

		commit('SET_FAVORITE_TASKS', favorites);
		commit('CHANGE_TASKS_FAVORITE', id);
		localStorage.setItem('typicode_todos_favorites', JSON.stringify(favorites));
	},
	async searchTasks({ state, commit }) {
		// search by filters in current array
		const { filters, tasks } = state;
		let result = tasks;

		const users = [...new Set(result.map((el) => el.userId))];
		if (users.length > 1) users.push(0);
		result = +filters.userId ? result.filter((el) => +el.userId === +filters.userId) : result;
		result = filters.string ? tasks.filter((el) => el.title.includes(filters.string)) : result;
		result = filters.state ? filterByState(result, filters.state) : result;

		if (result.length && users.includes(+filters.userId)) return result;

		// get from API if nothing finded
		let response = await searchTasks(filters);
		response = response.map((element) => {
			return { ...element, favorite: state.favorites.includes(element.id) };
		});

		// get created by filters and add them to main list
		const { created } = state;
		if (created.length) {
			let additional = [...created];

			additional = filters.string ? additional.filter((el) => el.title.includes(filters.string)) : additional;
			additional = filters.state ? filterByState(additional, filters.state) : additional;
			additional = +filters.userId ? additional.filter((el) => +el.userId === +filters.userId) : additional;

			response.unshift(...additional);
		}

		response = filters.string ? response.filter((el) => el.title.includes(filters.string)) : response;
		response = filters.state ? filterByState(response, filters.state) : response;
		response = +filters.userId ? response.filter((el) => +el.userId === +filters.userId) : response;

		console.log('response', response);

		commit('SET_TASKS', response);
		return response;
	},
	async addTask({ commit }, payload) {
		const response = await addTask(payload);

		if (response.id) {
			const task = {
				completed: false,
				favorite: false,
				id: new Date().getTime(),
				title: response.user.title,
				userId: response.user.user,
			};

			commit('ADD_TASK', task);

			const created = JSON.parse(sessionStorage.getItem('typicode_todos_created')) || [];
			created.unshift(task);

			sessionStorage.setItem('typicode_todos_created', JSON.stringify(created));
		}
	},
};

export default {
	getters,
	state,
	mutations,
	actions,
};
