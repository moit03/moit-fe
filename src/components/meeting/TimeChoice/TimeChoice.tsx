import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { InputBox } from '../../../pages/Meeting/styles'

interface TimeChoiceProps {
  startTime: Date | null | undefined
  endTime: Date | null | undefined
  handleStartTimeChange: (time: Date | null) => void
  handleEndTimeChange: (time: Date | null) => void
}

function TimeChoice({
  startTime,
  endTime,
  handleStartTimeChange,
  handleEndTimeChange,
}: TimeChoiceProps): JSX.Element {
  // const [startTime, setStartTime] = useState(null)
  // const [endTime, setEndTime] = useState(null)
  // const [isSelected, setIsSelected] = useState(false)

  // const onSelectStartTime = (time) => {
  //   console.log('time', time)
  //   setStartTime(time)
  //   // handleStartTimeChange(time)
  //   setIsSelected(true)
  //   setEndTime(null)
  // }

  // const onSelectEndTime = (time) => {
  //   setEndTime(time)
  //   // handleEndTimeChange(time)
  // }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        marginTop: '1rem',
      }}
    >
      <TimeBox>
        <span>시작 시간</span>
        <label
          htmlFor="datepick1"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <input type="text" id="datepick1" style={{ display: 'none' }} />
          <DatePicker
            selected={startTime}
            shouldCloseOnSelect
            showTimeSelect
            showTimeSelectOnly
            timeCaption="시간 선택"
            dateFormat="h시 mm분"
            onChange={handleStartTimeChange}
            placeholderText="00시 00분"
          />
          <div className="down_icon">&#60;</div>
        </label>
      </TimeBox>
      <TimeBox>
        <span>종료 시간</span>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input type="text" id="datepick1" style={{ display: 'none' }} />
          <DatePicker
            selected={endTime}
            shouldCloseOnSelect
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            dateFormat="h시 mm분"
            placeholderText="00시 00분"
          />
          <div className="down_icon">&#60;</div>
        </label>
      </TimeBox>
    </div>
  )
}

export default TimeChoice

export const TimeBox = styled(InputBox)`
  width: 100%;
  span {
    font-size: 12px;
    color: gray;
  }
  label {
    color: black;
  }
  .down_icon {
    rotate: 270deg;
  }
`
