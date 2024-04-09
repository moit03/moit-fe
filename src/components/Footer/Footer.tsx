import { useNavigate } from 'react-router-dom'
import AddMeetingButton from '../meeting/AddMeetingButton/AddMeetingButton'
import { ButtonBox, FooterLayout } from './styles'

export default function Footer(): JSX.Element {
  const navigate = useNavigate()

  return (
    <FooterLayout>
      <ButtonBox>
        <button
          type="button"
          onClick={() => {
            navigate('/')
          }}
        >
          홈
        </button>
      </ButtonBox>
      <ButtonBox>
        <AddMeetingButton
          handleCreateMeeting={() => {
            navigate('/meetings')
          }}
        />
      </ButtonBox>
      <ButtonBox>
        <button
          type="button"
          onClick={() => {
            navigate('/profile')
          }}
        >
          마이페이지
        </button>
      </ButtonBox>
    </FooterLayout>
  )
}
