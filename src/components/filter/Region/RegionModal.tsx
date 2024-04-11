import { Fragment, useState } from 'react'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  ListBox,
  SelectedStack,
} from '../FilterFrame/styles'
import {
  type SecondRegion,
  type FirstRegion,
  type FirstRegions,
  type SecondRegions,
} from '@/type/filter'
import CommonButton from '@/components/common/Button/CommonButton'
import { type Center } from '@/type/meeting'
import { setLocalStorageItem } from '@/util/localStorage'

interface RegionModalProps {
  firstRegions: FirstRegions | undefined
  secondRegions: SecondRegions | undefined
  selectedFirstRegion: string
  selectedFilters: number[]
  setSelectedFirstRegion: (name: string) => void
  handleSelectedFilters: (selectedNums: number[]) => void
  handleSetCenter: (value: Center) => void
  handleModalClose: () => void
}

export default function RegionModal({
  firstRegions,
  secondRegions,
  selectedFirstRegion,
  selectedFilters,
  setSelectedFirstRegion,
  handleSelectedFilters,
  handleSetCenter,
  handleModalClose,
}: RegionModalProps): JSX.Element | null {
  const [selectedSecondRegion, setSelectedSecondRegion] = useState<number[]>(
    selectedFilters ?? []
  )

  const handleSecondRegionClick = (regionItem: number): void => {
    setSelectedSecondRegion((prevRegion) => {
      if (prevRegion.includes(regionItem)) {
        return prevRegion.filter((item) => item !== regionItem)
      }
      return [regionItem]
    })
  }

  const renderFirstRegions = ({
    regionFirstId,
    regionFirstName,
  }: FirstRegion): JSX.Element => (
    <li key={regionFirstId}>
      <button
        type="button"
        style={{
          background:
            selectedFirstRegion === String(regionFirstId) ? '#ddd' : '#fff',
        }}
        onClick={() => {
          setSelectedFirstRegion(String(regionFirstId))
        }}
      >
        <span>{regionFirstName}</span>
      </button>
    </li>
  )

  const renderSecondRegions = ({
    regionSecondId,
    regionSecondName,
  }: SecondRegion): JSX.Element => (
    <li key={regionSecondId}>
      <button
        type="button"
        className={
          selectedSecondRegion.includes(regionSecondId) ? 'selected' : ''
        }
        onClick={() => {
          handleSecondRegionClick(regionSecondId)
        }}
      >
        <span>{regionSecondName}</span>
        <span>
          {selectedSecondRegion.includes(regionSecondId) && <span>V</span>}
        </span>
      </button>
    </li>
  )

  const handleResetClick = (): void => {
    setSelectedSecondRegion([])
    setSelectedFirstRegion('')
  }

  const handleDeleteRegionClick = (regionId: number): void => {
    setSelectedSecondRegion((prevRegion) =>
      prevRegion.filter((item) => item !== regionId)
    )
  }

  const handleSelectClick = (): void => {
    const currentValue = secondRegions?.find(
      ({ regionSecondId }) => regionSecondId === selectedSecondRegion[0]
    )
    if (currentValue != null) {
      const center: Center = {
        lat: currentValue.regionLat,
        lng: currentValue.regionLng,
      }
      handleSetCenter(center)
    }
    handleSelectedFilters(selectedSecondRegion)
    setLocalStorageItem('firstRegion', selectedFirstRegion)
    handleModalClose()
  }

  return (
    <ModalPortal>
      <Background onClick={handleModalClose}>
        <FilterContainer
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <FilterTitle>모임 지역</FilterTitle>
          <ListBox>
            {firstRegions != null && (
              <ul>{firstRegions.map((item) => renderFirstRegions(item))}</ul>
            )}
            {secondRegions != null && (
              <ul>{secondRegions.map((item) => renderSecondRegions(item))}</ul>
            )}
          </ListBox>
          <BottomBox>
            <SelectedStack>
              {selectedSecondRegion?.map((item) => (
                <Fragment key={item}>
                  <span>
                    {
                      secondRegions?.find(
                        ({ regionSecondId }) => regionSecondId === item
                      )?.regionSecondName
                    }
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteRegionClick(item)
                    }}
                  >
                    X
                  </button>
                </Fragment>
              ))}
            </SelectedStack>
            <BottomBoxNav>
              <button type="button" onClick={handleResetClick}>
                초기화
              </button>
              <CommonButton size="small" handleClick={handleSelectClick}>
                선택 완료하기
              </CommonButton>
            </BottomBoxNav>
          </BottomBox>
        </FilterContainer>
      </Background>
    </ModalPortal>
  )
}
