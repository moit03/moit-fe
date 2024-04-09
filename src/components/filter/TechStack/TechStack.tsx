import { useState } from 'react'

import TechStackModal from './TechStackModal'
import { ModalBtn } from '../FilterFrame/styles'

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
}: TechStackProps): JSX.Element {
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        기술스택
      </ModalBtn>
      {isShow && (
        <TechStackModal
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
