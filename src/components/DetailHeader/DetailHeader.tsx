import { useNavigate } from 'react-router-dom'
import { DetailHeaderContainer } from './styles'

interface DetailHeaderProps {
  meetingId: number
}

function DetailHeader({ meetingId }: DetailHeaderProps): JSX.Element {
  const navi = useNavigate()

  const handleHomeClick = (): void => {
    navi(`/meetings/${meetingId}`)
  }
  const handleChatClick = (): void => {
    navi(`/meetings/${meetingId}/chats`)
  }

  return (
    <DetailHeaderContainer>
      <button
        type="button"
        onClick={() => {
          navi(-1)
        }}
      >
        &#60;
      </button>
      <div className="toggle">
        <button type="button" onClick={handleHomeClick}>
          home
        </button>
        <button type="button" onClick={handleChatClick}>
          chat
        </button>
      </div>
      <div>menu</div>
    </DetailHeaderContainer>
  )
}

export default DetailHeader
