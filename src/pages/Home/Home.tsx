import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useMap from '@/hooks/useMap'
import { FilterBox, HomeLayout, MapBox } from './styles'
import { type GetMeeting, type Center } from '@/type/meeting'
import { meetingKeys } from '@/constants/queryKeys'
import { getMeetings } from '@/apis/meeting'
import getUserLocation from '@/util/getUserLocation'
import HomeMeetingsPanel from '@/components/meeting/HomeMeetingsPanel/HomeMeetingsPanel'
import { type FiltersKey, type Filters } from '@/type/filter'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'
import Career from '@/components/filter/Career/Career'
import TechStack from '@/components/filter/TechStack/TechStack'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'
import Region from '@/components/filter/Region/Region'

export default function Home(): JSX.Element {
  const { map } = useMap()
  // 중심좌표: 초기값 - 로컬스토리지 > 유저좌표 > 서울시청(유저가 좌표 동의 x, get좌표 되지 않는 브라우저인 경우)
  const [center, setCenter] = useState<Center>(
    (getLocalStorageItem('center') as Center) ?? {
      lat: 37.5667,
      lng: 126.9784,
    }
  )
  const [filters, setFilters] = useState<Filters>({
    techStacks: getLocalStorageItem('techStacks') ?? [],
    careers: getLocalStorageItem('careers') ?? [],
    region: getLocalStorageItem('region' ?? []),
  })
  const [mapElement, setMapElement] = useState<kakao.maps.Map>()

  // 좌표에 따라 데이터 패칭
  const { data } = useQuery({
    queryKey: meetingKeys.filter({ ...center, ...filters }),
    queryFn: async () => await getMeetings({ center, filters }),
  })

  const meetings = useMemo(() => (data != null ? data.content : []), [data])

  useEffect(() => {
    // 첫 접속 시: 유저 위치 조회 후 setCenter
    const locationValue = getLocalStorageItem('center')
    if (locationValue != null) return
    getUserLocation(handleUserFirstLocation)
  }, [])

  // 센터상태 변경 시 값을 로컬스토리지에 저장
  useEffect(() => {
    setLocalStorageItem('center', center)
  }, [center])

  // 조회한 마커가 모두 보이도록 지도 위치 조정
  useEffect(() => {
    if (map === null || mapElement === null) return
    const resetMapwithFilteredMarkers = (list: GetMeeting[] = []): void => {
      // Todo: list가 없을 때의 정책 필요
      if (list.length === 0) return
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

  // 유저 위치 조회 결과를 setCenter
  const handleUserFirstLocation = (position: GeolocationPosition): void => {
    setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
  }

  // 현 위치 setCenter
  const setCurrentCenter = (): void => {
    const currentCenter = mapElement?.getCenter()
    if (currentCenter == null) return

    resetRegionFilter()

    setCenter({
      lat: currentCenter.getLat(),
      lng: currentCenter.getLng(),
    })
  }

  // 유저 위치 조회 결과로 map중심좌표 조정
  const resetMaptoUserLocation = (position: GeolocationPosition): void => {
    if (map == null || mapElement == null) return
    mapElement.setCenter(
      new map.LatLng(position.coords.latitude, position.coords.longitude)
    )
  }

  // 필터 선택 완료 시 필터 상태 저장
  const handleSetFilters = (key: FiltersKey, value: number[]): void => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setLocalStorageItem(key, value)
  }

  // 재조회 시 지역 필터 초기화
  const resetRegionFilter = (): void => {
    if (
      Boolean(getLocalStorageItem('region')) &&
      (getLocalStorageItem('region') as number[]).length !== 0
    ) {
      window.alert('재조회 시 지역 필터는 초기화됩니다.')
      setLocalStorageItem('region', [])
      setLocalStorageItem('firstRegion', '')
      setFilters({ ...filters, region: [] })
    }
  }

  const navi = useNavigate()

  return (
    <HomeLayout>
      <FilterBox>
        <Career
          selectedFilters={filters.careers}
          handleSelectedFilters={(num) => {
            handleSetFilters('careers', num)
          }}
        />
        <TechStack
          selectedFilters={filters.techStacks}
          handleSelectedFilters={(num) => {
            handleSetFilters('techStacks', num)
          }}
        />
        <Region
          selectedFilters={filters.region}
          handleSelectedFilters={(num) => {
            handleSetFilters('region', num)
          }}
          handleSetCenter={(currentCenter: Center) => {
            setCenter(currentCenter)
          }}
        />
      </FilterBox>
      <FilterBox style={{ left: '200px' }}>
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
      </FilterBox>
      <MapBox>
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
                key={meetingId}
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
      </MapBox>

      {meetings != null && <HomeMeetingsPanel meetings={meetings} />}
    </HomeLayout>
  )
}
