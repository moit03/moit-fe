import { memo, useState } from 'react'
import CareerModal from './CareerModal'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'
import getFilterDisplayNames from '@/util/getFilterDisplayNames'
import { type FiltersKey } from '@/type/filter'

interface CareerProps {
  selectedFilters: number[]
  handleSelectedFilters: (
    filterName: FiltersKey,
    selectedNums: number[]
  ) => void
}

export default memo(function Career({
  selectedFilters,
  handleSelectedFilters,
}: CareerProps): JSX.Element {
  const [isShow, setIsShow] = useState(false)

  const careerItems = [
    { careerName: '신입', id: 1 },
    { careerName: '주니어 (1 ~ 4)', id: 2 },
    { careerName: '미들 (5 ~ 8)', id: 3 },
    { careerName: '시니어 (9 ~ 12)', id: 4 },
    { careerName: '엑스퍼트 (13 이상)', id: 5 },
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
      <ModalBtn
        type="button"
        onClick={handleVisibleClick}
        $isShow={isShow}
        className={selectedFilters.length !== 0 ? 'filter-btn-selected' : ''}
      >
        {filterDisplayName}
        {selectedFilters.length !== 0 ? (
          <img src="/assets/downSelected.svg" alt="down" />
        ) : (
          <img src="/assets/down.svg" alt="down" />
        )}
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
})
