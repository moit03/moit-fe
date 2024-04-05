import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'

interface Props {
  meetingDate: Date | null | undefined
  handleDateChange: (date: Date) => void
}

function DateChoice({ meetingDate, handleDateChange }: Props): JSX.Element {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label style={{ display: 'flex', justifyContent: 'space-between' }}>
      <DatePicker
        dateFormat="yyyy년 MM월 dd일"
        selected={meetingDate}
        shouldCloseOnSelect
        onChange={(date: Date) => {
          handleDateChange(date)
        }}
        minDate={new Date()}
      />
      <div>icon</div>
    </label>
  )
}

export default DateChoice

export const Box = styled.div`
  background-color: #e9e9e9;
  padding: 20px 10px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
`
