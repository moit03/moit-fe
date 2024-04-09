import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'
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

interface HomeMeetingsPanelProps {
  meetings: GetMeeting[]
  handleScrollEnd: () => void
}

export default function HomeMeetingsPanel({
  meetings,
  handleScrollEnd,
}: HomeMeetingsPanelProps): JSX.Element {
  const [onListOpen, setOnListOpen] = useState(false)
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleScroll: () => void = throttle(() => {
    if (scrollBoxRef?.current === null) return
    const scrollBox = scrollBoxRef.current

    if (
      scrollBox.scrollHeight - 50 <=
      scrollBox.scrollTop + scrollBox.clientHeight
    ) {
      handleScrollEnd()
    }
  }, 500)

  useEffect(() => {
    const scrollBox = scrollBoxRef?.current
    scrollBox?.addEventListener('scroll', handleScroll)
    return () => {
      scrollBox?.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, onListOpen])

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
          <MeetingsBox ref={scrollBoxRef}>
            <h2>내 주위 모각코</h2>
            <CardBox>
              {meetings.map(
                ({
                  meetingId,
                  meetingName,
                  registeredCount,
                  totalCount,
                  locationAddress,
                  meetingStartTime,
                  meetingEndTime,
                  skillList,
                  careerList,
                }) => (
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
                        <p>2024.02.26</p>
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
                )
              )}
            </CardBox>
          </MeetingsBox>
        </>
      )}
    </HomeMeetingsPanelLayout>
  )
}
