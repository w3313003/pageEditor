import axios, { AxiosPromise } from "axios";
import qs from "qs";
const { Notice } = require('iview');


const BASE_URL = "http://localhost:3000";

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config: any) => {
	config.headers["Authorization"] = "zj";
	return config;
}, error => {
	return Promise.reject(error);
});

axios.interceptors.response.use((res: any) => {
	if (res.data.code !== 0) {
		Notice.error({
			title: '请求失败',
			desc: res.data.message
		});
	}
	return res;
}, error => {
	const response = error.response;
	Notice.error({
		title: '请求失败',
		desc: response.status + " " + response.statusText
	});
	return Promise.reject(error);
});

export default {
	BASE_URL,
	get(url: string, params: object = {}, config: object = {}): AxiosPromise {
		const temp = Object.assign({}, params, config);
		return axios.get(url, temp);
	},
	post(url: string, data: object = {}, config: object = {}): AxiosPromise {
		return axios.post(url, qs.stringify(data), Object.assign({}, {
			headers: {
				// 'X-Requested-With': 'XMLHttpRequest',
				// 'Content-Type': 'application/x-www-form-urlencoded'
			}
		}, config));
	},
	delete(url: string, data: object = {}, config: object = {}): AxiosPromise {
		const temp = Object.assign({}, data, config);
		return axios.delete(url, temp);
	},
	put(url: string, data: object = {}, config: object = {}): AxiosPromise {
		return axios.put(url, qs.stringify(data), config);
	}
};
