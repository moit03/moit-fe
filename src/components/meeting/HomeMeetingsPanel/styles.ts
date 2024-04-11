import styled from 'styled-components'

export const HomeMeetingsPanelLayout = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
`

export const ToggleBox = styled.button`
  width: 100%;
  height: 1.5rem;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px -1px 2px #777;
  background: #fff;
  position: relative;
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const MeetingsBackground = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  bottom: 0;
`
export const MeetingsBox = styled.div`
  height: fit-content;
  max-height: 37.5rem;
  overflow: scroll;
  width: 100%;
  padding: 1rem 1.25rem;
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
  }
`

export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
`
export const MeetingCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.625rem 0;

  &:hover {
    background: #f9f9f9;
    cursor: pointer;
  }

  hr {
    width: 100%;
    margin: 0;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    word-break: keep-all;
  }
`
export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TextBox = styled.div`
  display: flex;
  gap: 0.75rem;
`
export const TagBox = styled.div`
  width: 100%;
  overflow: scroll;

  div {
    display: flex;
    width: fit-content;
    gap: 0.375rem;
  }

  p {
    width: max-content;
    padding: 0.375rem 0.75rem;
    background: #aaa;
    border-radius: 25px;
    font-size: 0.75rem;
  }
`
