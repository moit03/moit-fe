import axios from 'axios'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'

const BASE_URL = import.meta.env.VITE_SERVER_URL
const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.request.use((config) => {
  const token = getLocalStorageItem('accessToken')
  if (token != null) {
    const authConfig = config
    // authConfig.headers.Authorization = `Bearer ${token}`
    authConfig.headers.Authorization = `Bearer ${123}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    // Todo: '만료된' 조건 추가
    if (
      error.response.status === 401 &&
      Boolean(error.response.data.message.includes('만료된'))
      // error.response.status === 401
    ) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true
      try {
        const refreshToken = getLocalStorageItem('refreshToken')
        const { data } = await instance.post('/api/auth/refresh', {
          refreshToken,
        })
        console.log(data)
        const accessToken = data.split(' ')[1]
        setLocalStorageItem('accessToken', accessToken)
        originalRequest.headers.Authorization = accessToken
        return await axios(originalRequest)
      } catch (errors) {
        console.log(errors)
        throw errors
      }
    }

    return await Promise.reject(error)
  }
)

export default instance
