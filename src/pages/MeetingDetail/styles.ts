import styled from 'styled-components'
import { InfoTitle, WholeContainer } from '../Meeting/styles'

export const DetailWholeContainer = styled(WholeContainer)``

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 1rem;
  border-bottom: 1px solid #e9e9e9;

  .userInfo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .imgIcon {
    width: 40px;
    height: 40px;
    background-color: #e9e9e9;
    border-radius: 0.5rem;
  }

  .tagbox {
    margin-top: 0.5rem;
  }
`

export const BasicInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    :first-child {
      font-size: 14px;
      font-weight: 400;
      color: gray;
    }

    span {
      font-weight: 600;
    }
  }
`
export const CareerTag = styled.span`
  border: 1px solid #d9d9d9;
  border-radius: 5rem;
  padding: 0.375rem 0.75rem;
`

export const DetailInfoTitle = styled(InfoTitle)`
  color: black;
  font-weight: 700;
`
