import styled from 'styled-components'
import useMap from '@/hooks/useMap'
import { type Info } from '@/pages/Meeting/RegisterMeeting'
import { type EditMeetingReq } from '@/type/request'

declare global {
  interface Window {
    daum: any
  }
}

interface Props {
  info: Info | EditMeetingReq
  setInfo: React.Dispatch<React.SetStateAction<any>>
  locationAddress: string | undefined
}

function FindLocation({ info, setInfo, locationAddress }: Props): JSX.Element {
  const { map } = useMap()
  const services = map?.services

  const handleButtonClick = (): void => {
    const { daum } = window

    new daum.Postcode({
      // eslint-disable-next-line func-names
      oncomplete: function (data: { address: string }) {
        if (services == null) return
        const geocoder = new services.Geocoder()

        const getXYFromAddress = (result: any, status: string): void => {
          if (status === 'OK') {
            let regionFirstName = result[0].address.region_1depth_name
            if (regionFirstName === '서울') {
              regionFirstName = '서울특별시'
            } else if (regionFirstName === '경기') {
              regionFirstName = '경기도'
            } else if (regionFirstName === '인천') {
              regionFirstName = '인천광역시'
            } else if (regionFirstName === '부산') {
              regionFirstName = '부산광역시'
            } else if (regionFirstName === '대구') {
              regionFirstName = '대구광역시'
            } else if (regionFirstName === '광주') {
              regionFirstName = '광주광역시'
            } else if (regionFirstName === '대전') {
              regionFirstName = '대전광역시'
            } else if (regionFirstName === '울산') {
              regionFirstName = '울산광역시'
            }

            setInfo({
              ...info,
              locationAddress: result[0].address_name,
              regionFirstName,
              regionSecondName: result[0].address?.region_2depth_name,
              locationLat: Number(result[0].y),
              locationLng: Number(result[0].x),
            })
          }
        }
        geocoder.addressSearch(data.address, getXYFromAddress)
      },
    }).open()
  }
  return (
    <LocationContainer>
      <button type="button" onClick={handleButtonClick}>
        <span>
          {locationAddress !== ''
            ? locationAddress
            : '모임 장소 이름이나 주소를 검색해 보세요'}
        </span>
        <div>icon</div>
      </button>
    </LocationContainer>
  )
}

export default FindLocation

export const LocationContainer = styled.div`
  background-color: #e9e9e9;
  padding: 1rem;
  border-radius: 0.5rem;

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    span {
      color: gray;
    }
  }
`
