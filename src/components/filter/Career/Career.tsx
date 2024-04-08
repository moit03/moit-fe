import { useState } from 'react'
import CareerModal from './CareerModal'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'

interface CareerProps {
  selectedFilters: number[]
  handleSelectedFilters: (selectedNums: number[]) => void
}

function Career({
  selectedFilters,
  handleSelectedFilters,
}: CareerProps): JSX.Element {
  const [isShow, setIsShow] = useState(false)

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        경력
      </ModalBtn>
      {isShow && (
        <CareerModal
          selectedFilters={selectedFilters}
          handleSelectedFilters={handleSelectedFilters}
          handleModalClose={() => {
            setIsShow(false)
          }}
        />
      )}
    </>
  )
}

export default Career
