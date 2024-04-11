import axios, { type AxiosRequestConfig } from 'axios'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'

const BASE_URL = import.meta.env.VITE_SERVER_URL
const instance = axios.create({
  baseURL: BASE_URL,
})

instance.interceptors.request.use((config) => {
  const token = getLocalStorageItem('accessToken')
  if (token != null) {
    const authConfig = config
    authConfig.headers.Authorization = `Bearer ${token}`
    // authConfig.headers.Authorization = `Bearer ${123}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig<any> = error.config
    if (
      error.response.status === 401 &&
      Boolean(error.response.data.message.includes('만료된')) &&
      originalRequest.headers != null
    ) {
      try {
        const refreshToken = getLocalStorageItem('refreshToken')
        const { data } = await axios.post(
          'https://hhboard.xyz/api/auth/refresh',
          {
            refreshToken,
          }
        )
        const accessToken = data.data.split(' ')[1]
        setLocalStorageItem('accessToken', accessToken)
        originalRequest.headers.Authorization = accessToken
        return await axios(originalRequest)
      } catch (errors) {
        // Todo: 리프레시 토큰 만료 시 알림
        window.alert('로그인 갱신이 필요합니다. 다시 로그인 해주세요.')
        console.log(errors)
        throw errors
      }
    }

    return await Promise.reject(error)
  }
)

export default instance
