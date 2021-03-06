/** @format */

import settings from './settings';

interface RequestConfig {
	path: string;
	body?: string | FormData;
	signal?: AbortSignal;
	headers?: any;
}

interface HttpResponse {
	message: string;
	success: boolean;
	data: any;
}

export const GET = async (config: RequestConfig): Promise<HttpResponse> => {
	if (!config.headers) {
		config.headers = {
			'Content-Type': 'application/json',
		};
	}

	return await fetch(settings.serverAddr + config.path, {
		method: 'GET',
		signal: config.signal,
		headers: config.headers,
	}).then((res: Response) => res.json());
};

export const POST = async (config: RequestConfig): Promise<HttpResponse> => {
	if (!config.headers) {
		config.headers = {
			'Content-Type': 'application/json',
		};
	}

	return await fetch(settings.serverAddr + config.path, {
		method: 'POST',
		signal: config.signal,
		body: config.body,
		headers: config.headers,
	}).then((res: Response) => res.json());
};
