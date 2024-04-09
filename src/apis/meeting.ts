import { type GetMeeting, type Center } from '@/type/meeting'
import instance from './axios'
import {
  type MeetingDetailInfo,
  type PaginationReturn,
  type PaginationResponse,
} from '@/type/response'
import { type Info } from '@/pages/Meeting/RegisterMeeting'
import { type Filters } from '@/type/filter'

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

const getMeetingsBySearch = (text: string) => {
  console.log(text)
  const data = [
    {
      meetingId: 1,

      meetingName: '코공모 (코딩 공부는 모여서) 모집합니다 오우예 씨몬',
      contents: 'test',
      address: '서울특별시 마포구 방울내로 123',
      registeredCount: 5,
      totalCount: 10,
      skills: ['react', 'spring', 'java', 'javascript', 'typescript'],
      date: '2024.03.30',
      startTime: '14:00',
      endTime: '16:00',
      locationLat: 37.123,
      locationLong: 128.123,
    },
    {
      meetingId: 2,
      meetingName: '마크업 스터디를 모집합니다.',
      contents: 'test',
      address: '서울특별시 강남구 방울내로 123',
      registeredCount: 1,
      totalCount: 5,
      skills: ['react', 'spring'],
      date: '2024.03.30',
      startTime: '14:00',
      endTime: '16:00',
      locationLat: 37.123,
      locationLong: 128.123,
    },
    {
      meetingId: 3,
      meetingName: '리액트 모임을 모집합니다.',
      contents: 'test',
      address: '서울특별시 마포구 방울내로 123',
      registeredCount: 3,
      totalCount: 10,
      skills: ['react', 'redux'],
      date: '2024.03.30',
      startTime: '14:00',
      endTime: '16:00',
      locationLat: 37.123,
      locationLong: 128.123,
    },
  ]
  return data
}

const postMeetingData = async (newMeetingData: Info): Promise<void> => {
  try {
    await instance.post(`/api/meetings`, newMeetingData, {
      headers: {
        Authorization: `Bearer `, // TODO : 헤더에 토큰 넣어야함
      },
    })
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
    await instance.post(`api/meetings/my-meetings/${meetingId}`, null, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJya2R0amR3bC01QGhhbm1haWwubmV0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE3MTU5MjU2NTQsImlhdCI6MTcxMjMyNTY1NH0.YL6N05jfWxrIfV07ko4qc6WtiCtTEC6PhNiL0gqRNz0`,
      },
    })
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

export {
  getMeetings,
  getMeetingsBySearch,
  postMeetingData,
  getMeetingDetail,
  postMeetingSub,
  deleteMeeting,
}
