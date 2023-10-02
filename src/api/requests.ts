import axios, { AxiosResponse, AxiosError } from 'axios';

interface RequestConfig {
  url?: string;               // 完整的URL
  endpoint?: string;          // 只是API的端点
  data?: object;
  params?: object;
}

const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET请求
export const Get = async <T>({ url, endpoint, params }: RequestConfig): Promise<T> => {
    const targetURL = url || (endpoint ? `${url}${endpoint}` : undefined);
    if (!targetURL) throw new Error("Either 'url' or 'endpoint' must be provided.");
  
    try {
      const response: AxiosResponse<T> = await instance.get(targetURL, { params });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError; // 断言为AxiosError类型
      throw axiosError; 
    }
};
  
  // POST请求
export const Post = async <T>({ url, endpoint, data }: RequestConfig): Promise<T> => {
    const targetURL = url || (endpoint ? `${url}${endpoint}` : undefined);
    if (!targetURL) throw new Error("Either 'url' or 'endpoint' must be provided.");
  
    try {
      const response: AxiosResponse<T> = await instance.post(targetURL, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError; // 断言为AxiosError类型
      throw axiosError; 
    }
};
  

