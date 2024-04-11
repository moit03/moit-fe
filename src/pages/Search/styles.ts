import styled from 'styled-components'

export const SearchLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

export const SearchBox = styled.div`
  padding: 0.75rem 1.25rem;
  display: flex;
`

export const InputBox = styled.div`
  width: 100%;
  background-color: #e9e9e9;
  display: flex;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  gap: 0.5rem;

  input {
    width: 100%;
    font-size: 0.875rem;
  }
`

export const SectionBox = styled.div`
  padding: 0 1.25rem;

  h1 {
    margin-bottom: 1.25rem;
    font-weight: 600;
    color: #313131;
  }
`

export const TagBox = styled.div`
  display: flex;
  gap: 10px;
  overflow: auto;

  p {
    padding: 0.375rem 0.75rem;
    border: 1px solid #667ae4;
    border-radius: 20px;
    color: #667ae4;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
`

export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-height: 600px; // Todo: 검색 바 크기에 따라 정해줄 것 (for 스크롤 적용)
  overflow: auto;
`
export const MeetingCard = styled.div`
  width: 100%;
  padding: 1.25rem;
  border-radius: 12px;
  background: #e7e4e4;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  hr {
    width: 100%;
  }
`
export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-weight: 700;
    word-break: keep-all;
  }
`

export const SKillsBox = styled.div`
  display: flex;
  gap: 0.375rem;
  font-size: 0.75rem;

  p {
    padding: 0.375rem 0.75rem;
    background: #fff;
    border-radius: 25px;
  }
`

export const SubContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 0.75rem;
  }
`
