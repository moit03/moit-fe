import { useNavigate } from 'react-router-dom'
import CommonButton from '@/components/common/Button/CommonButton'
import { Container } from './LoadingPage'

interface ErrorPageProps {
  isNotFoundPage?: boolean
}

function ErrorPage({ isNotFoundPage }: ErrorPageProps): JSX.Element {
  const navi = useNavigate()
  const goBack = (): void => {
    navi('/')
  }
  return (
    <Container $isFade={false}>
      <img src="/assets/errorLogo.svg" alt="logo" />
      <div>페이지를</div>
      <div>불러올 수 없습니다</div>
      <p>
        <span>
          {isNotFoundPage === true
            ? '존재하지 않는 페이지입니다.'
            : '접근 방식이 잘못되었습니다'}
        </span>
        <span>확인 후 다시 시도해 주세요</span>
      </p>
      <CommonButton
        size="small"
        handleClick={goBack}
        style={{ background: '#667AE4', marginTop: '2.4rem', width: '17rem' }}
      >
        돌아가기
      </CommonButton>
    </Container>
  )
}

ErrorPage.defaultProps = {
  isNotFoundPage: false,
}

export default ErrorPage
