import axios from 'axios'


export const instance = axios.create({
    baseURL: 'https://httpserver-tweb.onrender.com',
    withCredentials: true,
})
