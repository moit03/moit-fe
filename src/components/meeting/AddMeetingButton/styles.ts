import styled from 'styled-components'

export const LoginModalLayout = styled.div`
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  padding: 3.125rem 1.25rem;
`
export const ContentsBox = styled.div`
  width: 12rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.5;
  }

  p {
    font-size: 1rem;
  }
`

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  background: #333;
  color: #fff;
  border-radius: 8px;
`
