/* eslint-disable import/prefer-default-export */
type Service = 'naver' | 'kakao'

interface Login {
  username: string
  accessToken: string
  refreshToken: string
}
export type { Service, Login }
