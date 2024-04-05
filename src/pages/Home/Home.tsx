import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useMap from '@/hooks/useMap'
import Meetings from '@/components/meeting/Meetings/Meetings'
import { FilterBox, MainLayout } from './styles'
import Career from '@/components/common/Career/Career'
// import TechStack from '@/components/common/TechStack/TechStack'
import Region from '@/components/common/Region/Region'
import { ModalBtn } from '@/components/common/FilterFrame/styles'
import { type GetMeetingType, type Center } from '@/type/meeting'
import { meetingKeys } from '@/constants/queryKeys'
import { getMeetings } from '@/apis/meeting'
import getUserLocation from '@/util/getUserLocation'

export default function Home(): JSX.Element {
  const { map } = useMap()
  // 중심좌표: 초기값 - 로컬스토리지 > 유저좌표 > 서울시청(유저가 좌표 동의 x, get좌표 되지 않는 브라우저인 경우)
  const [center, setCenter] = useState<Center>({
    lat: 37.5667,
    lng: 126.9784,
  })
  const [isShow, setIsShow] = useState(false)
  const [mapElement, setMapElement] = useState<kakao.maps.Map>()

  // 좌표에 따라 데이터 패칭
  const { data: meetings } = useQuery({
    queryKey: meetingKeys.filter(center),
    queryFn: async () => await getMeetings({ center }),
  })

  useEffect(() => {
    const locationValue = localStorage.getItem('center')

    if (locationValue !== null) {
      // 로컬 스토리지 저장된 값을 setCenter
      setLastLocation(locationValue)
    } else {
      // 유저 위치 조회 후 setCenter
      getUserLocation(handleUserFirstLocation)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('center', JSON.stringify(center))
  }, [center])

  // 조회한 마커가 모두 보이도록 지도 위치 조정
  useEffect(() => {
    if (map === null || mapElement === null) return

    const resetMapwithFilteredMarkers = (list: GetMeetingType[] = []): void => {
      const points = list.map(
        ({ locationLat, locationLng }) =>
          new map.LatLng(locationLat, locationLng)
      )
      const bounds = new map.LatLngBounds()
      points.forEach((point) => {
        bounds.extend(point)
      })
      mapElement?.setBounds(bounds)
    }

    resetMapwithFilteredMarkers(meetings)
  }, [meetings, mapElement, map])

  // 로컬스토리지의 마지막 위치 setCenter
  const setLastLocation = (locationValue: string): void => {
    if (locationValue !== null) {
      const lastLocation = JSON.parse(locationValue)
      setCenter({
        lat: Number(lastLocation.lat),
        lng: Number(lastLocation.lng),
      })
    }
  }

  // 유저 위치 조회 결과를 setCenter
  const handleUserFirstLocation = (position: GeolocationPosition): void => {
    setCenter(() => ({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }))
  }

  // 현 위치 setCenter
  const setCurrentCenter = (): void => {
    const currentCenter = mapElement?.getCenter()
    if (currentCenter == null) return
    setCenter({ lat: currentCenter.getLat(), lng: currentCenter.getLng() })
  }

  // 유저 위치 조회 결과로 map중심좌표 조정
  const resetMaptoUserLocation = (position: GeolocationPosition): void => {
    if (map == null || mapElement == null) return
    mapElement.setCenter(
      new map.LatLng(position.coords.latitude, position.coords.longitude)
    )
  }

  const navi = useNavigate()

  return (
    <>
      <MainLayout>
        <Map
          center={{
            lat: 37.5667,
            lng: 126.9784,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          maxLevel={3}
          minLevel={11}
          onCreate={(maps) => {
            setMapElement(maps)
          }}
        >
          {meetings?.map(
            ({ meetingName, meetingId, locationLat, locationLng }) => (
              <MapMarker
                key={`${meetingId}`}
                title={meetingName}
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                  size: {
                    width: 20,
                    height: 30,
                  },
                }}
                position={{ lat: locationLat, lng: locationLng }}
              />
            )
          )}
        </Map>
        <Meetings meetings={meetings ?? []} />
        <FilterBox>
          <ModalBtn
            type="button"
            onClick={() => {
              getUserLocation(resetMaptoUserLocation)
            }}
          >
            내 위치
          </ModalBtn>
          <ModalBtn type="button" onClick={setCurrentCenter}>
            재조회
          </ModalBtn>
          <ModalBtn
            type="button"
            onClick={() => {
              setIsShow(true)
            }}
          >
            모임 지역
          </ModalBtn>
          {isShow && (
            <Region
              handleModalClose={() => {
                setIsShow(!isShow)
              }}
            />
          )}
          {/* <TechStack /> */}
          <Career />
        </FilterBox>
      </MainLayout>
      <div style={{ display: 'flex', gap: '20px', margin: '10px' }}>
        <button
          onClick={() => {
            navi('/auth')
          }}
          type="button"
          style={{
            height: '40px',
            background: '#ddd',
            padding: '5px',
            borderRadius: '12px',
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            navi('/meetings')
          }}
          type="button"
          style={{
            height: '40px',
            background: '#ddd',
            padding: '5px',
            borderRadius: '12px',
          }}
        >
          모임 생성
        </button>
      </div>
    </>
  )
}
