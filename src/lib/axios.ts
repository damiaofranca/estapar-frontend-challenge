import axios, {
	AxiosError,
	type AxiosRequestConfig,
	type InternalAxiosRequestConfig,
} from "axios";

import { ROUTES, STORAGE_KEYS } from "@/config/constants";
import type { ApiError } from "@/types/api-types";

const extractErrorMessage = (error: AxiosError): string => {
	const data = error.response?.data;

	if (Array.isArray(data) && data.length > 0) {
		const first = data[0] as Partial<ApiError>;
		if (first?.mensagem) return first.mensagem;
	}

	if (data && typeof data === "object") {
		const maybeError = data as Partial<ApiError> & {
			notification?: string[];
		};
		if (maybeError.mensagem) return maybeError.mensagem;
		if (maybeError.notification?.length) return maybeError.notification[0];
	}

	return error.message;
};

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

		if (token) {
			config.headers.set("Authorization", `Bearer ${token}`);
		}

		return config;
	},
);

axiosInstance.interceptors.response.use(
	(response) => response.data,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			localStorage.removeItem(STORAGE_KEYS.TOKEN);
			window.location.href = ROUTES.LOGIN;
			return Promise.reject(error);
		}

		const message = extractErrorMessage(error);
		return Promise.reject(new Error(message));
	},
);

export const api = {
	get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
		axiosInstance.get<T, T>(url, config),

	post: <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> => axiosInstance.post<T, T>(url, data, config),

	put: <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> => axiosInstance.put<T, T>(url, data, config),

	patch: <T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig,
	): Promise<T> => axiosInstance.patch<T, T>(url, data, config),

	delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
		axiosInstance.delete<T, T>(url, config),
};
