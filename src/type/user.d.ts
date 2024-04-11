/* eslint-disable import/prefer-default-export */
type Service = 'naver' | 'kakao'

interface LoginRes {
  username: string
  accessToken: string
  refreshToken: string
}
export type { Service, LoginRes }
