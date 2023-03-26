import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://task6-backend.vercel.app/',
    // baseURL: 'http://localhost:7542/',
    withCredentials: true,
})
