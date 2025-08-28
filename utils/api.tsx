import { useAuth } from '@clerk/clerk-expo';
import axios, { AxiosInstance } from 'axios';



const API_BASE_URL = 'https://cookbook-backend-alpha.vercel.app/api';

export const createApiClient = (getToken:()=>Promise<string|null>):AxiosInstance => {
    const api= axios.create({
        baseURL: API_BASE_URL
    });
    api.interceptors.request.use(async (config) => {
        const token = await getToken();
        console.log("Token is here", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Token added to request headers", token);
        }
        return config;
    });
     console.log("api is here ", api);
    return api;
    
}
export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return createApiClient(getToken);
};


export const userApi = {
  syncUser: (api: AxiosInstance) => api.post("/user/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/user/me"),
  }
  export const postApi = {
    getPosts: (api: AxiosInstance) => api.get("/posts"),
    createPost: (api: AxiosInstance,data: { content: string }) => api.post("/posts"),   
    getUserPosts: (api: AxiosInstance, username: string) => api.get(`/posts/${username}`),

  }
 



console.log("  ❤ userApi is here ", userApi);