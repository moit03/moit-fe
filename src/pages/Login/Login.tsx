import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type Service } from '@/type/user'
import { login } from '@/apis/user'
import { setLocalStorageItem } from '@/util/localStorage'

export default function Login(): JSX.Element {
  const { service } = useParams()
  const authCode = window.location.search.split('code=')[1]

  const navigate = useNavigate()

  useEffect(() => {
    login(authCode, service as Service)
      .then((data) => {
        // 로그인 정보 저장
        const accessToken = data.split(' ')[1]
        setLocalStorageItem('accessToken', accessToken)
      })
      .catch((error) => {
        console.log(error)
        // 에러일 경우 모달 ?
      })
      .finally(() => {
        navigate('/')
      })
  }, [authCode, service, navigate])

  return <div>Login</div>
}
