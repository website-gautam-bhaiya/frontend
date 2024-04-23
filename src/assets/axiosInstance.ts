import axios from 'axios';

export const axiosInstance = axios.create({
        baseURL: `https://news-api-qsji.onrender.com/api/v1`,
    })
