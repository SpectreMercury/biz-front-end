import { ApiResponse } from '@/interface/requests';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod,
  params?: any,
  customHeaders?: Record<string, string>  // 新增headers参数
): Promise<ApiResponse<T>> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // 合并默认headers和自定义headers
  const headers = { ...defaultHeaders, ...customHeaders };

  const config: RequestInit = {
    method,
    headers,
  };

  if (params && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(params);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: ApiResponse<T> = await response.json();
  return data;
}

export default request;
