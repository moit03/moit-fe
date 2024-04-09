import { useState } from 'react'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'
import { getLocalStorageItem } from '@/util/localStorage'
import LoginModal from '@/components/modals/LoginModal'

interface AddMeetingButtonProps {
  handleCreateMeeting: () => void
}

export default function AddMeetingButton({
  handleCreateMeeting,
}: AddMeetingButtonProps): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const handleClickButton = (): void => {
    const token: string = getLocalStorageItem('accessToken')
    if (token != null && token.length !== 0) {
      handleCreateMeeting()
    } else {
      setOnLoginModal(true)
    }
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleClickButton}>
        작성하기
      </ModalBtn>
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
