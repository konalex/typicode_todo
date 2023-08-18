import { get, post } from '@/utils/request';
import { completedStates } from '@/utils/enums';

async function getTasks(user) {
	const { data } = await get('/todos', { userId: user });

	if (data.length) return data;
	throw new Error('No task found');
}

async function searchTasks(filters) {
	const options = {};

	if (filters.string) options.title = filters.string;
	if (filters.state > 0 && filters.state < 3) options.completed = completedStates[filters.state];
	if (+filters.userId) options.userId = filters.userId;

	const { data } = await get('/todos', options);
	return data;
}

async function addTask(user, title) {
	const { data } = await post('/todos', {
		user,
		title,
	});
	return data;
}

export { getTasks, searchTasks, addTask };
