import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation } from '@tanstack/react-query'
import CommonButton from '@/components/common/Button/CommonButton'
import {
  AccountContainer,
  CareerContainer,
  InfoContainer,
  InfoHeader,
  InfoTitle,
  InputBox,
  MemberCount,
  MemberCountBtn,
  PriceBox,
  RegisterTitle,
  WholeContainer,
} from './styles'

import DateChoice from '@/components/meeting/DateChoice/DateChoice'
import TimeChoice from '@/components/meeting/TimeChoice/TimeChoice'
import FindLocation from '@/components/meeting/FindLocation/FindLocation'
import { careerData, type Career } from '@/constants/careerData'
import { postMeetingData } from '@/apis/meeting'
import TechStack from '@/components/filter/TechStack/TechStack'

export interface Info {
  meetingName: string
  meetingDate: Date | null | undefined
  meetingStartTime: Date | null | undefined
  meetingEndTime: Date | null | undefined
  budget: number
  contents: string
  totalCount: number
  locationAddress: string
  locationLat: number
  locationLng: number
  regionFirstName: string
  regionSecondName: string
  skillIds: number[]
  careerIds: number[]
}

function RegisterMeeting(): JSX.Element {
  const navi = useNavigate()
  const [info, setInfo] = useState<Info>({
    meetingName: '',
    meetingDate: null,
    meetingStartTime: null,
    meetingEndTime: null,
    budget: 0,
    contents: '',
    totalCount: 2,
    locationAddress: '',
    locationLat: 0,
    locationLng: 0,
    regionFirstName: '',
    regionSecondName: '',
    skillIds: [],
    careerIds: [],
  })
  const [stackName, setStackName] = useState<string[]>([])
  const dateFormat = dayjs(info.meetingDate).format('YYYY-MM-DD')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingName: e.target.value,
    }))
  }
  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInfo((prevState) => ({
      ...prevState,
      contents: e.target.value,
    }))
  }

  const handleDateChange = (date: Date): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingDate: date,
    }))
  }

  const handleStartTimeChange = (time: Date | null): void => {
    // console.log('time111111', time)
    setInfo((prevState) => ({
      ...prevState,
      meetingStartTime: time,
    }))
  }

  const handleEndTimeChange = (time: Date | null): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingEndTime: time,
    }))
  }

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const budgetValue: number = parseInt(e.target.value, 10)
    setInfo((prevState) => ({
      ...prevState,
      budget: budgetValue,
    }))
  }

  const handleMemCountUpClick = (): void => {
    setInfo((prevState) => ({
      ...prevState,
      totalCount: prevState.totalCount + 1,
    }))
  }

  const handleMemCountDownClick = (): void => {
    setInfo((prevState) => ({
      ...prevState,
      totalCount: prevState.totalCount - 1,
    }))
  }

  const handleTechStackClick = (
    selectedStacks: number[],
    selectedStacksName?: string[]
  ): void => {
    setInfo((prevState) => ({
      ...prevState,
      skillIds: selectedStacks,
    }))

    selectedStacksName != null && setStackName(selectedStacksName)
  }

  const handleCareerClick = (careerId: number): void => {
    setInfo((prev) => {
      if (prev.careerIds.includes(careerId)) {
        return {
          ...prev,
          careerIds: prev.careerIds.filter((item) => item !== careerId),
        }
      }
      return {
        ...prev,
        careerIds: [...prev.careerIds, careerId],
      }
    })
  }

  const postMutation = useMutation<any, unknown, Info>({
    mutationFn: async (newMeetingData: Info) => {
      await postMeetingData(newMeetingData)
    },
    onSuccess: () => {
      console.log('res')
      // navi('/')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const handleMeetingSubmit = (): void => {
    const newMeetingData = {
      meetingName: info.meetingName,
      meetingDate: dateFormat as unknown as Date,
      meetingStartTime: info.meetingStartTime,
      meetingEndTime: info.meetingEndTime,
      budget: info.budget,
      contents: info.contents,
      totalCount: info.totalCount,
      locationAddress: info.locationAddress,
      locationLat: Number(info.locationLat),
      locationLng: Number(info.locationLng),
      regionFirstName: info.regionFirstName,
      regionSecondName: info.regionSecondName,
      skillIds: info.skillIds,
      careerIds: info.careerIds,
    }
    postMutation.mutate(newMeetingData)
  }

  return (
    <WholeContainer>
      <InfoHeader>
        <button
          type="button"
          onClick={() => {
            navi(-1)
          }}
        >
          &#60;
        </button>
        <h2>모임 생성하기</h2>
      </InfoHeader>
      <RegisterTitle>
        <h1>
          <span>모임을</span>
          <span>소개해 주세요!</span>
        </h1>
        <span>흩어져 있던 개발자들을 불러 봐요</span>
      </RegisterTitle>
      <div>
        <InfoContainer>
          <InfoTitle>모임 이름을 정해 주세요</InfoTitle>
          <InputBox>
            <label htmlFor="nameInput">한 줄로 작성해 주세요</label>
            <input
              type="text"
              id="nameInput"
              placeholder="ex) 같이 리액트 공부해요"
              value={info.meetingName}
              onChange={handleNameChange}
            />
          </InputBox>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>모임 내용을 작성해 주세요</InfoTitle>
          <InputBox>
            <label htmlFor="contentInput">설명해 주세요</label>
            <input
              type="text"
              id="contentInput"
              placeholder="ex) 뭐할래?"
              value={info.contents}
              onChange={handleContentChange}
            />
          </InputBox>
        </InfoContainer>
        {/* 날짜, 시간 선택 */}
        <InfoContainer>
          <InfoTitle>언제 만날까요?</InfoTitle>
          <InputBox>
            <span>모임 날짜</span>
            <DateChoice
              meetingDate={info.meetingDate}
              handleDateChange={handleDateChange}
            />
          </InputBox>
          <TimeChoice
            startTime={info.meetingStartTime}
            endTime={info.meetingEndTime}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
          />
        </InfoContainer>
        {/* 위치 찾기 */}
        <InfoContainer>
          <InfoTitle>어디서 만날까요?</InfoTitle>
          <FindLocation
            info={info}
            setInfo={setInfo}
            locationAddress={info.locationAddress}
          />
          {/* <input
            className="where"
            type="text"
            placeholder="모임 장소 이름이나 주소를 검색해 보세요"
          /> */}
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>몇 명이서 모일까요?</InfoTitle>
          <span>본인을 포함한 최소 인원을 설정해 주세요</span>
          <MemberCount>
            <MemberCountBtn type="button" onClick={handleMemCountDownClick}>
              -
            </MemberCountBtn>
            <div>{info.totalCount}</div>
            <MemberCountBtn type="button" onClick={handleMemCountUpClick}>
              +
            </MemberCountBtn>
          </MemberCount>
        </InfoContainer>
        <AccountContainer>
          <div>
            <h3>참가비가 필요한가요?</h3>
            <span>부담스럽지 않은 금액이 좋아요</span>
          </div>
          <PriceBox>
            <input
              type="number"
              id="price"
              placeholder="ex) 3,000"
              value={info.budget}
              onChange={handleBudgetChange}
            />
            <label htmlFor="price">원</label>
          </PriceBox>
        </AccountContainer>
        <InfoContainer>
          <InfoTitle>모임에 필요한 기술 스택을 알려 주세요</InfoTitle>
          <TechStack
            selectedFilters={info.skillIds}
            handleSelectedFilters={handleTechStackClick}
          />
          {stackName.map((name) => (
            <p key={name}>{name}</p>
          ))}
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>경력을 알려 주세요</InfoTitle>
          <CareerContainer>
            {careerData.map((career: Career) => (
              <button
                type="button"
                key={career.careerId}
                onClick={() => {
                  handleCareerClick(career.careerId)
                }}
              >
                {career.careerName}
              </button>
            ))}
          </CareerContainer>
        </InfoContainer>
      </div>
      <CommonButton size="large" handleClick={handleMeetingSubmit}>
        생성하기
      </CommonButton>
    </WholeContainer>
  )
}

export default RegisterMeeting
