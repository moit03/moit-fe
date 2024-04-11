import { useState } from 'react'
import CareerModal from './CareerModal'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'
import getFilterDisplayNames from '@/util/getFilterDisplayNames'

interface CareerProps {
  selectedFilters: number[]
  handleSelectedFilters: (selectedNums: number[]) => void
}

function Career({
  selectedFilters,
  handleSelectedFilters,
}: CareerProps): JSX.Element {
  const [isShow, setIsShow] = useState(false)

  const careerItems = [
    { careerName: '신입', id: 1 },
    { careerName: '주니어(1~4)', id: 2 },
    { careerName: '미들(5~8)', id: 3 },
    { careerName: '시니어(9~12)', id: 4 },
    { careerName: '엑스퍼트(13이상)', id: 5 },
  ]

  const filterDisplayName =
    selectedFilters.length !== 0
      ? getFilterDisplayNames(
          careerItems.map(({ careerName, id }) => ({ name: careerName, id })),
          selectedFilters
        )
      : '경력'

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        {filterDisplayName}
      </ModalBtn>
      {isShow && (
        <CareerModal
          careerItems={careerItems}
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
