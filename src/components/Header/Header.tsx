import { useNavigate } from 'react-router-dom'
import { HeaderContainer } from './styles'

function Header(): JSX.Element {
  const navi = useNavigate()

  return (
    <HeaderContainer>
      <button
        type="button"
        onClick={() => {
          navi('/')
        }}
      >
        LOGO
      </button>
      <button
        type="button"
        onClick={() => {
          navi('/search')
        }}
      >
        검색
      </button>
    </HeaderContainer>
  )
}

export default Header
