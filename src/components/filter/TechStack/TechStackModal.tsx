import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  SelectedStack,
  TechStackInput,
} from '../FilterFrame/styles'
import { getTechStackList } from '@/apis/filter'
import { type TechStackList } from '@/type/filter'
import CommonButton from '@/components/common/Button/CommonButton'

interface TechStackModalProps {
  selectedFilters: number[]
  handleSelectedFilters: (
    selectedNums: number[],
    selectedNames?: string[]
  ) => void
  handleModalClose: () => void
}

export default function TechStackModal({
  selectedFilters,
  handleSelectedFilters,
  handleModalClose,
}: TechStackModalProps): JSX.Element {
  const [searchItem, setSearchItem] = useState<string>('')
  const [selectedStackItems, setSelectedStackItems] = useState<number[]>(
    selectedFilters ?? []
  )

  // 기술스택 데이터 가져오기
  const { data: techItems } = useQuery({
    queryKey: ['stackList'],
    queryFn: async () => await getTechStackList(),
  })

  // 기술 선택
  const handleStackClick = (stackItem: number): void => {
    setSelectedStackItems((prevStack) => {
      if (prevStack.includes(stackItem)) {
        return prevStack.filter((item) => item !== stackItem)
      }
      const currentStack = [...prevStack, stackItem]
      return currentStack.sort((a, b) => a - b)
    })
  }

  // 선택한 기술 취소 (X 버튼)
  const handleDeleteStackClick = (stackItem: number): void => {
    setSelectedStackItems((prevStack) =>
      prevStack.filter((item) => item !== stackItem)
    )
  }

  // 기술 나열
  const renderTechStackItem = (item: {
    skillId: number
    skillName: string
  }): JSX.Element => (
    <li key={item.skillId}>
      <button
        type="button"
        // className={selectedStack?.includes(item.skillId) ? 'selected' : ''}
        onClick={() => {
          handleStackClick(item.skillId) // 여기가 문젠데
        }}
      >
        <span>{item.skillName}</span>
        <span>
          {selectedStackItems?.includes(item.skillId) && <span>V</span>}
        </span>
      </button>
    </li>
  )

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchItem(e.target.value.toLowerCase())
  }

  // 검색해서 필터링
  const filteredTechStackItems: TechStackList[] =
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    techItems?.filter(
      (item: TechStackList) => item.skillName.toLowerCase().includes(searchItem)
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    ) || []

  const handleResetClick = (): void => {
    setSelectedStackItems([])
  }

  const selectedStacksName = selectedStackItems.map(
    (id) => techItems?.find(({ skillId }) => skillId === id)?.skillName
  )

  const handleCompleteClick = (): void => {
    handleSelectedFilters(selectedStackItems, selectedStacksName as string[])
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
          <FilterTitle>기술스택</FilterTitle>
          <TechStackInput
            placeholder="기술 스택을 검색해 주세요"
            value={searchItem}
            onChange={handleSearchInputChange}
          />
          <ul>
            {filteredTechStackItems.map((item: TechStackList) =>
              renderTechStackItem(item)
            )}
          </ul>
          <BottomBox>
            <SelectedStack>
              {selectedStackItems?.map((selectedId) => (
                <div key={selectedId}>
                  {/* 여기 span을 문자열로 바꿔서 보이게 해야함 */}
                  <span>
                    {
                      techItems?.find(({ skillId }) => skillId === selectedId)
                        ?.skillName
                    }
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteStackClick(selectedId)
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </SelectedStack>
            <BottomBoxNav>
              <button type="button" onClick={handleResetClick}>
                초기화
              </button>
              <CommonButton size="small" handleClick={handleCompleteClick}>
                선택 완료하기
              </CommonButton>
            </BottomBoxNav>
          </BottomBox>
        </FilterContainer>
      </Background>
    </ModalPortal>
  )
}
