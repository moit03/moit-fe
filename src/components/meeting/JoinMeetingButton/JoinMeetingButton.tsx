import { useState } from 'react'
import { getLocalStorageItem } from '@/util/localStorage'
import LoginModal from '@/components/modals/LoginModal'
import CommonButton from '@/components/common/Button/CommonButton'

interface JoinMeetingButtonProps {
  handleJoinMeeting: () => void
}

export default function JoinMeetingButton({
  handleJoinMeeting,
}: JoinMeetingButtonProps): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const handleClickButton = (): void => {
    const token: string = getLocalStorageItem('accessToken')
    if (token != null && token.length !== 0) {
      handleJoinMeeting()
    } else {
      setOnLoginModal(true)
    }
  }

  return (
    <>
      <CommonButton size="large" handleClick={handleClickButton}>
        모임 참여하기
      </CommonButton>
      {onLoginModal && (
        <LoginModal
          handleCloseModal={() => {
            setOnLoginModal(false)
          }}
        />
      )}
    </>
  )
}
