import { get } from '@/utils/request';

// get user data by @name and @phone
// in the task it was specified to receive an array, but I immediately look for a user
async function login(name, phone) {
	const { data } = await get('/users', { username: name, phone });

	if (data.length) return data[0];
	throw new Error('This user was not found');
}

async function getUsersId() {
	const { data } = await get('/users');
	if (data.length) return data.map((el) => el.id);
}

export { login, getUsersId };
