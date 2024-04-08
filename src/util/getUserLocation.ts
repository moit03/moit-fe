const getUserLocation = (callback: PositionCallback): void => {
  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: Infinity,
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      callback,
      (error) => {
        console.log(error)
        if (error.code === 1)
          window.alert(
            '브라우저 설정에서 사용자 위치 확인 허용 시 내 위치 확인이 가능합니다'
          )
      },
      options
    )
  }
}

export default getUserLocation
