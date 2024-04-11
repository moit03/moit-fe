import { type LoginRes, type Service } from '@/type/user'
import instance from './axios'
import { type CommonResponse } from '@/type/response'

const login = async (code: string, service: Service): Promise<LoginRes> => {
  try {
    const { data } = await instance.get<CommonResponse<LoginRes>>(
      `/api/member/signin/${service}?code=${code}&env=${import.meta.env.PROD ? 'prod' : 'local'}`
    )
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const logout = (): void => {}

export { login, logout }
