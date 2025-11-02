import axios from 'axios'

const api = axios.create({
  baseURL: '/api' // proxy do Vite encaminha para http://localhost:8081
})

export default api
