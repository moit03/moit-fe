import { type GetMeeting, type Center } from '@/type/meeting'
import instance from './axios'
import {
  type MeetingDetailInfo,
  type PaginationReturn,
  type PaginationResponse,
  type ChatDataResponse,
} from '@/type/response'
import { type Info } from '@/pages/Meeting/RegisterMeeting'
import { type Filters } from '@/type/filter'
import { type ChatDataProps } from '@/type/chat'
import { type EditMeetingReq } from '@/type/request'

interface GetMeetingParams {
  center: Center
  filters: Filters
  pageParam: number
}

const getMeetings = async <T = GetMeeting[]>({
  center,
  filters,
  pageParam,
}: GetMeetingParams): Promise<PaginationReturn<T>> => {
  const stackQuery =
    filters.techStacks.length > 0
      ? filters.techStacks.map((id) => `skillId=${id}&`).join('')
      : ''

  const filterQuery =
    filters.careers.length > 0
      ? filters.careers.map((id) => `careerId=${id}&`).join('')
      : ''
  try {
    const res = await instance.get<PaginationResponse<T>>(
      `/api/meetings?locationLat=${center.lat}&locationLng=${center.lng}&${stackQuery}${filterQuery}page=${pageParam}`
    )
    const { data } = res.data
    return {
      result: data.content,
      nextPage: pageParam + 1,
      isLast: data.last,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

interface GetMeetingBySearchParams {
  text: string
  pageParam: number
}

const getMeetingsBySearch = async <T = GetMeeting[]>({
  text,
  pageParam,
}: GetMeetingBySearchParams): Promise<PaginationReturn<T>> => {
  try {
    const res = await instance.get<PaginationResponse<T>>(
      `api/meetings/search?keyword=${text}&page=${pageParam}`
    )
    const { data } = res.data
    return {
      result: data.content,
      nextPage: pageParam + 1,
      isLast: data.last,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const postMeetingData = async (newMeetingData: Info): Promise<void> => {
  try {
    await instance.post(`/api/meetings`, newMeetingData)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getMeetingDetail = async (
  meetingId: number
): Promise<MeetingDetailInfo> => {
  try {
    const { data } = await instance.get(`/api/meetings/meetings/${meetingId}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const postMeetingSub = async (meetingId: number): Promise<void> => {
  try {
    await instance.post(`api/meetings/my-meetings/${meetingId}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteMeeting = async (meetingId: number): Promise<void> => {
  try {
    await instance.delete(`api/meetings/${meetingId}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const editMeeting = async (
  meetingId: number,
  updatedMeeting: EditMeetingReq
): Promise<void> => {
  try {
    await instance.put(`api/meetings/${meetingId}`, updatedMeeting)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteMeetingWithdraw = async (meetingId: number): Promise<void> => {
  try {
    await instance.delete(`api/meetings/${meetingId}/signout`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getChatMsg = async (meetingId: number): Promise<ChatDataProps> => {
  try {
    const res = await instance.get<ChatDataResponse>(
      `api/meetings/${meetingId}/chats`
    )
    return res.data?.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  getMeetings,
  getMeetingsBySearch,
  postMeetingData,
  getMeetingDetail,
  postMeetingSub,
  deleteMeeting,
  editMeeting,
  deleteMeetingWithdraw,
  getChatMsg,
}
