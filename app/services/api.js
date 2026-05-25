import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? 'https://mme-backend-ase4.onrender.com/api'
        : 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// automatically attach token to every request if it exists
api.interceptors.request.use((config) => {
   if (process.client){
    const token = useCookie('token').value
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
   }
   return config
})

export default api