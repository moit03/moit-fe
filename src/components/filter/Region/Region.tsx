import { useState } from 'react'
import { ModalBtn } from '../FilterFrame/styles'
import RegionModal from './RegionModal'
import { type Center } from '@/type/meeting'

interface RegionProps {
  selectedFilters: number[]
  handleSelectedFilters: (selectedNums: number[]) => void
  handleSetCenter: (value: Center) => void
}

export default function Region({
  selectedFilters,
  handleSelectedFilters,
  handleSetCenter,
}: RegionProps): JSX.Element {
  const [isShow, setIsShow] = useState<boolean>(false)
  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        지역
      </ModalBtn>
      {isShow && (
        <RegionModal
          selectedFilters={selectedFilters}
          handleSelectedFilters={handleSelectedFilters}
          handleSetCenter={handleSetCenter}
          handleModalClose={() => {
            setIsShow(false)
          }}
        />
      )}
    </>
  )
}
