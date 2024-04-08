import styled from 'styled-components'

export const ModalBtn = styled.button`
  font-size: 0.875rem;
  padding: 0.625rem 1rem;
  background-color: #d9d9d9;
  border-radius: 2.5rem;
`

export const Background = styled.div`
  height: 100%;
  max-height: 844px;
  width: 24.375rem;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
`

export const FilterContainer = styled.div`
  width: 24.375rem;
  position: absolute;
  bottom: 0px;
  left: 0;
  border: 0.0625rem solid #d9d9d9;
  border-radius: 1.25rem 1.25rem 0 0;
  background-color: #ffffff;

  ul {
    padding-left: 1.25rem;
    padding-bottom: 7.5rem;
    overflow-y: auto;
    max-height: 31.25rem; // TODO : 여기 손 봐야됨
    li {
      cursor: pointer;

      button {
        width: 100%;
        padding: 0.90625rem 0;
        display: flex;
        justify-content: space-between;
        padding-right: 1.25rem;
      }
    }
  }
`

export const FilterTitle = styled.h2`
  font-size: 1.25rem;
  margin: 1.25rem;
`
export const BottomBox = styled.div`
  width: 24.375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.125rem;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  border-top: 0.0625rem solid #d9d9d9;
`

export const BottomBoxNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SelectedCareer = styled.div`
  width: 24.375rem;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
  margin-left: 1.25rem;
  overflow-x: auto;

  div {
    background-color: lightblue;
    border-radius: 2.5rem;
    padding: 0.375rem 0.75rem;
  }
`

export const TechStackInput = styled.input`
  width: 20.5rem;
  height: 3rem;
  margin: 0.625rem 1.25rem;
  padding-left: 1rem;
  border-radius: 2.5rem;
  background-color: #e9e9e9;
`
export const ListBox = styled.div`
  display: flex;
`

export const SelectedStack = styled.div`
  width: 24.375rem;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
  margin-left: 1.25rem;
  overflow-x: auto;

  div {
    background-color: lightblue;
    border-radius: 2.5rem;
    padding: 0.375rem 0.75rem;
  }
`
