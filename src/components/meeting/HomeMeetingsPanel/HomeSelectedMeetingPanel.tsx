import { useNavigate } from 'react-router-dom'
import { type GetMeeting } from '@/type/meeting'
import {
  CardBox,
  ContentsBox,
  HomeMeetingsPanelLayout,
  MeetingCard,
  MeetingsBackground,
  MeetingsBox,
  TagBox,
  TextBox,
  ToggleBox,
} from './styles'

interface HomeSelectedMeetingPanelProps {
  meeting: GetMeeting
  handleClosePanel: () => void
}

export default function HomeSelectedMeetingPanel({
  meeting,
  handleClosePanel,
}: HomeSelectedMeetingPanelProps): JSX.Element {
  const navigate = useNavigate()
  const {
    meetingId,
    meetingName,
    registeredCount,
    totalCount,
    locationAddress,
    meetingDate,
    meetingStartTime,
    meetingEndTime,
    skillList,
    careerList,
  } = meeting
  return (
    <HomeMeetingsPanelLayout>
      <ToggleBox onClick={handleClosePanel}>리스트 닫기</ToggleBox>
      <MeetingsBackground onClick={handleClosePanel} />
      <MeetingsBox>
        <CardBox>
          <MeetingCard
            key={meetingId}
            onClick={() => {
              navigate(`/meetings/${meetingId}`)
            }}
          >
            <h3>{meetingName}</h3>
            <hr />
            <ContentsBox>
              <TextBox>
                <p>{meetingDate}</p>
                <p>{`${meetingStartTime} - ${meetingEndTime}`}</p>
              </TextBox>
              <TextBox>
                <p>{`${locationAddress.split(' ')[0]} ${locationAddress.split(' ')[1]}`}</p>
                <p>{`${registeredCount} / ${totalCount}`}</p>
              </TextBox>
              <TagBox>
                <div>
                  {careerList.map(({ careerName, id }) => (
                    <p key={id}>{careerName}</p>
                  ))}
                  {skillList.map(({ skillName, id }) => (
                    <p key={id}>{skillName}</p>
                  ))}
                </div>
              </TagBox>
            </ContentsBox>
          </MeetingCard>
        </CardBox>
      </MeetingsBox>
    </HomeMeetingsPanelLayout>
  )
}
