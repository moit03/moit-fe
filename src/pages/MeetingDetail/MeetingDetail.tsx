import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import CommonButton from '@/components/common/Button/CommonButton'
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
import { getMeetingDetail } from '@/apis/meeting'

function MeetingDetail(): JSX.Element {
  useMap()
  const { meetingId } = useParams()

  const { data } = useQuery({
    queryKey: ['meetingListDetail'],
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  return (
    <DetailWholeContainer>
      {/* 헤더 */}
      <DetailHeader />
      {/* 1 */}
      <RegisterTitle>
        <h1>
          <span>{data?.meetingName}</span>
        </h1>
      </RegisterTitle>
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
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
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
        <CommonButton size="large">모임 참여하기</CommonButton>
      </div>
    </DetailWholeContainer>
  )
}

export default MeetingDetail
