import {
  type User,
  type Service,
  type Profile,
  type MyMeeting,
  type MyBookmarks,
} from '@/type/user'
import { authInstance, instance } from './axios'
import { type CommonResponse } from '@/type/response'
import { setLocalStorageItem } from '@/util/localStorage'
import setRequestTokenSchedule from '@/util/setRequestTokenSchedule'
import { type MyMeetingsStatus } from '@/type/meeting'
import { notify } from '@/components/Toast'

const login = async (code: string, service: Service): Promise<User> => {
  try {
    const { data } = await instance.get<CommonResponse<User>>(
      `/api/member/signin/${service}?code=${code}&env=${import.meta.env.PROD ? 'prod' : 'local'}`,
      { withCredentials: true }
    )
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const resetAccessToken = async (): Promise<void> => {
  try {
    const { data } = await instance.get<{ data: string }>(`/api/auth/refresh`, {
      withCredentials: true,
    })
    const accessToken = data.data.split(' ')[1]
    setRequestTokenSchedule(accessToken)
    setLocalStorageItem('accessToken', accessToken)
  } catch (error) {
    console.log(error)
    logout()
      .catch(() => {})
      .finally(() => {
        notify({
          type: 'default',
          text: '로그인 갱신이 필요합니다. 다시 로그인 해주세요',
        })
      })
  }
}

const logout = async (): Promise<void> => {
  try {
    await authInstance.get('/api/auth/logout', { withCredentials: true })
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    localStorage.removeItem('accessToken')
  }
}

const getProfile = async <T = Profile>(): Promise<T> => {
  try {
    const { data } =
      await authInstance.get<CommonResponse<T>>('/api/member/myinfo')
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getMyMeetings = async <T = MyMeeting[]>(
  status: MyMeetingsStatus
): Promise<T> => {
  try {
    const { data } = await authInstance.get<CommonResponse<T>>(
      `api/member/meeting${status === 'progress' ? '' : `/${status}`}`
    )
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getBookmarks = async <T = MyBookmarks>(): Promise<T> => {
  try {
    const { data } = await authInstance.get<CommonResponse<T>>(
      `/api/bookmark/checkByMemberId`
    )
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const addBookMark = async (meetingId: number): Promise<void> => {
  try {
    await authInstance.post(`/api/bookmark/add`, { meetingId })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteBookMark = async (meetingId: number): Promise<void> => {
  try {
    await authInstance.delete(`/api/bookmark/remove`, { data: { meetingId } })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteUnregister = async (): Promise<void> => {
  try {
    await authInstance.delete(`/api/member/signout`)
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}

export {
  login,
  resetAccessToken,
  logout,
  getProfile,
  getMyMeetings,
  getBookmarks,
  addBookMark,
  deleteBookMark,
  deleteUnregister,
}
