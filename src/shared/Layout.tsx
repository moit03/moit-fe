import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export default function Layout(): JSX.Element {
  return (
    <LayoutStyles>
      <Outlet />
    </LayoutStyles>
  )
}

const LayoutStyles = styled.div`
  width: 390px;
  max-height: 844px;
  height: ${window.innerHeight}px;
  border: 1px solid #000;
`
