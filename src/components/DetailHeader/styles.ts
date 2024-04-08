import styled from 'styled-components'

export const DetailHeaderContainer = styled.header`
  width: 100%;
  background-color: #e9e9e9;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  margin-top: 3rem;

  .toggle {
    background-color: #ffffff;
    border-radius: 5rem;

    button {
      padding: 0.5rem 1rem;
      border-radius: 5rem;
      font-weight: 700;

      &:hover {
        background-color: wheat;
      }
    }
  }
`

export const Icon = styled.div``
