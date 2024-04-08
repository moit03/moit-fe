import {
  type SecondRegions,
  type FirstRegions,
  type TechStackLists,
} from '@/type/filter'
import instance from './axios'
import { type CommonResponse } from '@/type/response'

const getFirstRegions = async <T = FirstRegions>(): Promise<T> => {
  try {
    const { data } = await instance.get<CommonResponse<T>>('/api/region/first')
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getSecondRegions = async <T = SecondRegions>(id: string): Promise<T> => {
  try {
    const { data } = await instance.get<CommonResponse<T>>(
      `api/region/second?regionFirstId=${id}`
    )
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getTechStackList = async <T = TechStackLists>(): Promise<T> => {
  try {
    const { data } = await instance.get(`/api/skill`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { getFirstRegions, getSecondRegions, getTechStackList }
