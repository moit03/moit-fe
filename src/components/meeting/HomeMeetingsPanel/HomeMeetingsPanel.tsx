import { useState } from 'react'
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

interface HomeMeetingsPanelProps {
  meetings: GetMeeting[]
}

export default function HomeMeetingsPanel({
  meetings,
}: HomeMeetingsPanelProps): JSX.Element {
  const [onListOpen, setOnListOpen] = useState(false)

  return (
    <HomeMeetingsPanelLayout>
      <ToggleBox
        onClick={() => {
          setOnListOpen(!onListOpen)
        }}
      >
        {`리스트 ${onListOpen ? '닫기' : '열기'}`}
      </ToggleBox>
      {onListOpen && (
        <>
          <MeetingsBackground
            onClick={() => {
              setOnListOpen(!onListOpen)
            }}
          />
          <MeetingsBox>
            <h2>내 주위 모각코</h2>
            <CardBox>
              {meetings.map(
                ({
                  meetingId,
                  meetingName,
                  registeredCount,
                  totalCount,
                  skillList,
                  careerList,
                }) => (
                  <MeetingCard key={meetingId}>
                    <h3>{meetingName}</h3>
                    <hr />
                    <ContentsBox>
                      <TextBox>
                        <p>2024.02.26</p>
                        <p>20:00 - 21:00</p>
                      </TextBox>
                      <TextBox>
                        <p>서울 마포구</p>
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
                )
              )}
            </CardBox>
          </MeetingsBox>
        </>
      )}
    </HomeMeetingsPanelLayout>
  )
}
