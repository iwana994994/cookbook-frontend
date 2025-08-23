import { useAuth } from '@clerk/clerk-expo';
import axios, { AxiosInstance } from 'axios';



const API_BASE_URL = 'https://cookbook-backend-alpha.vercel.app/api';

export const createApiClient = (getToken:()=>Promise<string|null>):AxiosInstance => {
    const api= axios.create({
        baseURL: API_BASE_URL
    });
    api.interceptors.request.use(async (config) => {
        const token = await getToken();
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


  }
 



console.log("  ❤ userApi is here ", userApi);