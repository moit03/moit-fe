import { useState } from 'react'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  SelectedCareer,
} from '@/components/filter/FilterFrame/styles'
import CommonButton from '@/components/common/Button/CommonButton'

interface CareerModalProps {
  selectedFilters: number[]
  handleSelectedFilters: (selectedNums: number[]) => void
  handleModalClose: () => void
}

const careerItems: Array<{ careerName: string; id: number }> = [
  { careerName: '신입', id: 1 },
  { careerName: '주니어(1~4)', id: 2 },
  { careerName: '미들(5~8)', id: 3 },
  { careerName: '시니어(9~12)', id: 4 },
  { careerName: '엑스퍼트(13이상)', id: 5 },
]

export default function CareerModal({
  selectedFilters,
  handleSelectedFilters,
  handleModalClose,
}: CareerModalProps): JSX.Element {
  const [selectedCareer, setSelectedCareer] = useState<number[]>(
    selectedFilters ?? []
  )

  // 선택한 경력이 보임
  const handleCareerClick = (careerItem: number): void => {
    setSelectedCareer((prevCareer) => {
      if (prevCareer.includes(careerItem)) {
        return prevCareer.filter((item) => item !== careerItem)
      }
      const currentCareer = [...prevCareer, careerItem]
      return currentCareer.sort((a, b) => a - b)
    })
  }

  // 선택한 경력 취소
  const handleDeleteCareerClick = (careerItem: number): void => {
    setSelectedCareer((prevCareer) =>
      prevCareer.filter((item) => item !== careerItem)
    )
  }

  // 기술 나열
  const renderCareerItem = ({
    careerName,
    id,
  }: {
    careerName: string
    id: number
  }): JSX.Element => (
    <li key={id}>
      <button
        type="button"
        className={selectedCareer.includes(id) ? 'selected' : ''}
        onClick={() => {
          handleCareerClick(id)
        }}
      >
        <span>{careerName}</span>
        <span>{selectedCareer.includes(id) && <span>V</span>}</span>
      </button>
    </li>
  )

  const handleResetClick = (): void => {
    setSelectedCareer([])
  }

  const handleSelectClick = (): void => {
    handleSelectedFilters(selectedCareer)
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
          <FilterTitle>경력</FilterTitle>
          <ul>{careerItems.map((item) => renderCareerItem(item))}</ul>
          <BottomBox>
            <SelectedCareer>
              {selectedCareer.map((item) => (
                <div key={item}>
                  <span>
                    {careerItems.find(({ id }) => id === item)?.careerName}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteCareerClick(item)
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </SelectedCareer>
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
