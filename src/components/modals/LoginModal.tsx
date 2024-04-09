import { Link } from 'react-router-dom'
import { Background } from '../filter/FilterFrame/styles'
import ModalPortal from './ModalPortal'
import { KAKAO_OAUTH, NAVER_OAUTH } from '@/constants/auth'
import {
  ButtonBox,
  ContentsBox,
  LoginButton,
  LoginModalLayout,
} from '../meeting/AddMeetingButton/styles'

interface LoginModalProps {
  handleCloseModal: () => void
}

export default function LoginModal({
  handleCloseModal,
}: LoginModalProps): JSX.Element {
  const kakaoLoginURL = `${KAKAO_OAUTH.url}?client_id=${KAKAO_OAUTH.client_id}&redirect_uri=${KAKAO_OAUTH.redirect_uri}&response_type=${KAKAO_OAUTH.response_type}`

  const naverLoginURL = `${NAVER_OAUTH.url}?response_type=${NAVER_OAUTH.response_type}&client_id=${NAVER_OAUTH.client_id}&state=test&redirect_uri=${NAVER_OAUTH.redirect_uri}`

  return (
    <ModalPortal>
      <Background onClick={handleCloseModal}>
        <LoginModalLayout
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <ContentsBox>
            <h2>MOIT에 참가하려면 로그인 해주세요</h2>
            <p>개발 모임 찾을 땐 MOIT</p>
          </ContentsBox>
          <ButtonBox>
            <Link to={kakaoLoginURL}>
              <LoginButton>카카오로 시작하기</LoginButton>
            </Link>
            <Link to={naverLoginURL}>
              <LoginButton>네이버로 시작하기</LoginButton>
            </Link>
          </ButtonBox>
        </LoginModalLayout>
      </Background>
    </ModalPortal>
  )
}
