import axios from 'axios';

const instance = axios.create({
	baseURL: '/api',
	timeout: 1000,
	withCredentials: false,
});

instance.interceptors.request.use(
	(config) => {
		/**
		 * const token = getToken()
		 * if (token) {
		 *  config.headers.token = token
		 * }
		 */
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const { response } = error;
		if (response && response.data) {
			return Promise.reject(error);
		}
		const { message } = error;
		console.error(message);
		return Promise.reject(error);
	},
);

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const post = (url, data = {}, params = {}) => {
	return instance({
		method: 'post',
		url,
		data,
		params,
	});
};

/**
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) => {
	return instance({
		method: 'get',
		url,
		params,
	});
};

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const put = (url, data = {}, params = {}) => {
	return instance({
		method: 'put',
		url,
		params,
		data,
	});
};

/**
 * @param {string} url
 * @param {object} params
 */
export const _delete = (url, params = {}) => {
	return instance({
		method: 'delete',
		url,
		params,
	});
};

export default instance;
