import { useNavigate } from 'react-router-dom'
import { DetailHeaderContainer } from './styles'

function DetailHeader(): JSX.Element {
  const navi = useNavigate()
  return (
    <DetailHeaderContainer>
      <button
        type="button"
        onClick={() => {
          navi(-1)
        }}
      >
        &#60;
      </button>
      <div className="toggle">
        <button type="button">home</button>
        <button type="button">chat</button>
      </div>
      <div>menu</div>
    </DetailHeaderContainer>
  )
}

export default DetailHeader
