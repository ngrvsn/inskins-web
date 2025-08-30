import axios from 'axios'

// Создание базового экземпляра Axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.inskins.gg',
  timeout: 30000, // 30 секунд
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export default axiosInstance