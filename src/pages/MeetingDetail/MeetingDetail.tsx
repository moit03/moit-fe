import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { RegisterTitle } from '../Meeting/styles'
import useMap from '@/hooks/useMap'
import DetailHeader from '@/components/DetailHeader/DetailHeader'
import {
  BasicInfoBox,
  Box,
  CareerTag,
  DetailInfoTitle,
  DetailWholeContainer,
} from './styles'
import {
  deleteMeeting,
  deleteMeetingWithdraw,
  getMeetingDetail,
  postMeetingSub,
} from '@/apis/meeting'
import JoinMeetingButton from '@/components/meeting/JoinMeetingButton/JoinMeetingButton'
import { getLocalStorageItem } from '@/util/localStorage'

function MeetingDetail(): JSX.Element {
  useMap()
  const navi = useNavigate()
  const { meetingId } = useParams()

  const { data } = useQuery({
    queryKey: ['meetingListDetail', meetingId],
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  const postSubMutation = useMutation({
    mutationFn: async () => {
      await postMeetingSub(Number(meetingId))
    },
    onSuccess: () => {
      navi(`/meetings/${meetingId}/chats`)
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteMeeting(Number(meetingId))
    },
    onSuccess: () => {
      navi('/')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      await deleteMeetingWithdraw(Number(meetingId))
    },
    onSuccess: () => {
      navi(`/meetings/${meetingId}`)
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const handleMeetingSubClick = (): void => {
    postSubMutation.mutate()
  }

  const deleteMeetingClick = (): void => {
    deleteMutation.mutate()
  }

  const withdrawMeetingClick = (): void => {
    withdrawMutation.mutate()
  }

  const token: string = getLocalStorageItem('accessToken')
  const decodedToken = jwtDecode(token)

  return (
    <DetailWholeContainer>
      {/* 헤더 */}
      <DetailHeader meetingId={Number(meetingId)} />
      {/* 1 */}
      <RegisterTitle>
        <h1>
          <span>{data?.meetingName}</span>
        </h1>
      </RegisterTitle>
      <button type="button" onClick={withdrawMeetingClick}>
        탈퇴
      </button>
      {decodedToken.sub === data?.creatorEmail ? (
        <>
          <button type="button" onClick={deleteMeetingClick}>
            삭제
          </button>
          <button
            type="button"
            onClick={() => {
              navi(`modify`)
            }}
          >
            수정
          </button>
        </>
      ) : (
        ''
      )}
      {/* 2 */}
      <Box>
        <div className="userInfo">
          <div className="imgIcon" />
          <div>{data?.creatorName}</div>
        </div>
        <div className="tagbox">
          {data?.careerNameList.map((e: string) => (
            <CareerTag key={e}>#{e}</CareerTag>
          ))}
        </div>
        <div className="tagbox">
          {data?.skillNameList.map((e: string) => (
            <CareerTag key={e}>#{e}</CareerTag>
          ))}
        </div>
      </Box>
      {/* 3 */}
      <Box>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>{data?.meetingDate}</span>
            <span>
              {data?.meetingStartTime} - {data?.meetingEndTime}
            </span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>주소</span>
            <span>{data?.locationAddress}</span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>참가 중인 인원</span>
            <span>
              {data?.registeredCount}/{data?.totalCount}
            </span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>참가비</span>
            <span>{data?.budget}원</span>
          </div>
        </BasicInfoBox>
      </Box>
      {/* 4 */}
      <Box>
        <DetailInfoTitle>이런 모임이에요</DetailInfoTitle>
        <p>{data?.contents}</p>
      </Box>
      {/* 5 */}
      <Box>
        <DetailInfoTitle>여기서 모여요</DetailInfoTitle>
        <div>
          <Map
            center={{
              lat: data?.locationLat ?? 0,
              lng: data?.locationLng ?? 0,
            }}
            style={{
              width: '350px',
              height: '200px',
              borderRadius: '0.5rem',
              border: '1px solid #e9e9e9',
            }}
            maxLevel={3}
            minLevel={11}
          >
            <MapMarker
              key={`${meetingId}`}
              // title={meetingName}
              image={{
                src: '/assets/mapMarker.svg',
                size: {
                  width: 20,
                  height: 30,
                },
              }}
              position={{
                lat: data?.locationLat ?? 0,
                lng: data?.locationLng ?? 0,
              }}
            />
          </Map>
        </div>
      </Box>
      {/* 6 */}
      <div>
        <JoinMeetingButton handleJoinMeeting={handleMeetingSubClick} />
      </div>
    </DetailWholeContainer>
  )
}

export default MeetingDetail
