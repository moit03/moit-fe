import { useState } from 'react'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  ModalBtn,
} from './styles'
import CommonButton from '@/components/common/Button/CommonButton'

function FilterFrame(): JSX.Element {
  const [isShow, setIsShow] = useState(false)

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        이름
      </ModalBtn>
      <ModalPortal>
        {isShow ? (
          <Background onClick={handleVisibleClick}>
            <FilterContainer
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <FilterTitle>modal title</FilterTitle>
              {/* 여기에 달라지는 부분 들어감 */}
              <div style={{ height: '100px' }}>샘플입니다</div>
              <BottomBox>
                <BottomBoxNav>
                  <button type="button">초기화</button>
                  <CommonButton size="small">선택 완료하기</CommonButton>
                </BottomBoxNav>
              </BottomBox>
            </FilterContainer>
          </Background>
        ) : null}
      </ModalPortal>
    </>
  )
}

export default FilterFrame
