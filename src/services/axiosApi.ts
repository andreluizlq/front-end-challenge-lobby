// services/axiosApi.ts
import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const createAxiosConfig = (apiKey: string) => ({
  auth: {
    username: apiKey,
    password: '',
  },
});
