import axios from 'axios'

const getCookie = (name) => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
}

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://mme-backend-ase4.onrender.com/api'
        : 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

// ✅ Request interceptor 
api.interceptors.request.use((config) => {
    const publicEndpoints = ['/v1/users/register', '/v1/users/login']
    const isPublic = publicEndpoints.some(url => config.url.includes(url))

    if (!isPublic) {
        const token = getCookie('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

// ✅ Response interceptor — handle errors globally
api.interceptors.response.use(
    (response) => response, // success — pass through

    (error) => {
        const status = error.response?.status
        const data = error.response?.data

        // Build a clean error message
        let message = 'Something went wrong. Please try again.'

        if (data?.messages && Array.isArray(data.messages)) {
            // Validation errors from backend
            message = data.messages.join('\n')
        } else if (data?.message) {
            message = data.message
        } else if (data?.error) {
            message = data.error
        } else if (typeof data === 'string') {
            message = data
        }

        // Handle specific status codes
        if (status === 401) {
            message = 'Session expired. Please log in again.'
            // Clear cookies and redirect to login
            if (typeof document !== 'undefined') {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                window.location.href = '/'
            }
        }

        if (status === 403) {
            message = 'You are not authorized to perform this action.'
        }

        if (status === 404) {
            message = 'Resource not found.'
        }

        if (status === 500) {
            message = 'Server error. Please try again later.'
        }

        // Attach clean message to error
        error.userMessage = message
        return Promise.reject(error)
    }
)

export default api