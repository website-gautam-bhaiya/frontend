import axios from 'axios';

export const axiosInstance = axios.create({
        baseURL: `https://backend-final-self.vercel.app/api/v1`,
    })
