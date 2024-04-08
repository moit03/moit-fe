import styled from 'styled-components'
import ModalPortal from './ModalPortal'
import { Background } from '../filter/FilterFrame/styles'

interface AlertModalProps {
  onClose: () => void
  message: string
}

// 사용할 땐 오픈여부를 묻는 함수와 함께 사용해야 함, 더 좋은 방법있으면 수정 예정!
function AlertModal({ onClose, message }: AlertModalProps): JSX.Element {
  return (
    <ModalPortal>
      <AlertBackground>
        <Content>
          <div>{message}</div>
          <button type="button" onClick={onClose}>
            닫기
          </button>
          <button type="button">확인</button>
        </Content>
      </AlertBackground>
    </ModalPortal>
  )
}

export default AlertModal

export const AlertBackground = styled(Background)`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Content = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`
