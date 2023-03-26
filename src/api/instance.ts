import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://task6-backend-iazfq94wo-nazaruk-d.vercel.app/',
    // baseURL: 'http://localhost:7542/',
    withCredentials: true,
})
