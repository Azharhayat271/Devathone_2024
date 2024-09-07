// AxiosInstance.js
import axios from 'axios';
import api from './../urls/apiURL';

const axiosInstance = axios.create({
    baseURL: api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
