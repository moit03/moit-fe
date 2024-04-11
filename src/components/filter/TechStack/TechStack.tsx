import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import TechStackModal from './TechStackModal'
import { ModalBtn } from '../FilterFrame/styles'
import { getTechStackList } from '@/apis/filter'
import getFilterDisplayNames from '@/util/getFilterDisplayNames'

interface TechStackProps {
  selectedFilters: number[]
  handleSelectedFilters: (
    selectedNums: number[],
    selectedNames?: string[]
  ) => void
}

function TechStack({
  selectedFilters,
  handleSelectedFilters,
}: TechStackProps): JSX.Element | null {
  const [isShow, setIsShow] = useState<boolean>(false)

  const { data } = useQuery({
    queryKey: ['stackList'],
    queryFn: async () => await getTechStackList(),
  })

  if (data == null) return null

  const filterDisplayName =
    selectedFilters.length !== 0
      ? getFilterDisplayNames(
          data.map(({ skillName, skillId }) => ({
            name: skillName,
            id: skillId,
          })),
          selectedFilters
        )
      : '기술스택'

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        {filterDisplayName}
      </ModalBtn>
      {isShow && (
        <TechStackModal
          techItems={data}
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

export default TechStack
