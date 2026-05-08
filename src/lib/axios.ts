import axios, {
	AxiosError,
	type AxiosRequestConfig,
	type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

import type { ApiError } from "@/types/api-types";
import { ROUTES } from "@/config/constants";
import { clearAuthToken, getAuthToken } from "@/store/auth-store";

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

const isAuthenticateRequest = (
	config: InternalAxiosRequestConfig | undefined,
): boolean => {
	const url = config?.url ?? "";
	return url.includes("Authenticate");
};

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = getAuthToken();

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
			clearAuthToken();
			const message = extractErrorMessage(error);

			if (!isAuthenticateRequest(error.config)) {
				window.location.href = ROUTES.LOGIN;
			}

			toast.error(message);
			return Promise.reject(new Error(message));
		}

		const message = extractErrorMessage(error);
		toast.error(message);
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
