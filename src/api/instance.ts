import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://http-server-emwlfx23r-nazaruk-d.vercel.app',
    withCredentials: true,
})
