import styled from 'styled-components'

export const HomeLayout = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-rows: 3rem auto 3rem;
  overflow: hidden;
`

export const ContentsBox = styled.div`
  position: relative;
`

export const MapBox = styled.div`
  width: 100%;
  height: 100%;
`

export const FilterBox = styled.div`
  height: 0;
  width: 100%;
  position: absolute;
  top: 2rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2rem;
`

export const ResetSearchBox = styled(FilterBox)`
  top: unset;
  bottom: 6rem;
  justify-content: center;
`

export const UserLocationButtonBox = styled(FilterBox)`
  top: unset;
  bottom: 8rem;
  justify-content: flex-end;
`
