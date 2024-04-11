import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { meetingKeys } from '@/constants/queryKeys'
import { getMeetingsBySearch } from '@/apis/meeting'
import {
  CardBox,
  ContentsBox,
  InputBox,
  MeetingCard,
  SKillsBox,
  SearchBox,
  SearchLayout,
  SectionBox,
  SubContentsBox,
  TagBox,
} from './styles'
import { type GetMeeting } from '@/type/meeting'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'

export default function Search(): JSX.Element {
  const [searchText, setSearchText] = useState('')
  const [recents, setRecents] = useState<string[]>(
    (getLocalStorageItem('recents') as string[]) ?? []
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: meetingKeys.search(searchText),
    queryFn: async ({ pageParam }) => {
      return await getMeetingsBySearch({ text: searchText, pageParam })
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage
      return undefined
    },
    initialPageParam: 1,
    enabled: searchText !== '',
  })

  const meetings = useMemo(() => {
    let list: GetMeeting[] = []
    data != null &&
      data.pages.forEach(({ result }) => (list = [...list, ...result]))
    return list
  }, [data])

  // const handleFetchPages = (): void => {
  //   void fetchNextPage()
  // }

  const handleSearch = (): void => {
    if (inputRef?.current == null) return
    const currentValue = inputRef.current.value
    if (currentValue.trim().length === 0) {
      window.alert('검색어를 입력해 주세요.')
      return
    }
    setSearchText(currentValue)
    handleRecents(currentValue)
  }

  const handleRecents = (text: string): void => {
    const prevRecents = getLocalStorageItem('recents') as string[]
    if (prevRecents == null) {
      setLocalStorageItem('recents', [text])
    } else {
      const currentRecents = [
        text,
        ...prevRecents.filter((word) => word !== text),
      ].slice(0, 10)
      setLocalStorageItem('recents', currentRecents)
    }
    setRecents([text, ...recents.filter((word) => word !== text)].slice(0, 10))
  }

  return (
    <SearchLayout>
      <SearchBox>
        <button
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          <img src="/assets/back.svg" alt="icon" />
        </button>
        <InputBox>
          <input
            type="text"
            placeholder="모임 이름, 모임 내용, 주소를 검색해 보세요"
            ref={inputRef}
          />
          <button type="button" onClick={handleSearch}>
            <img src="/assets/search.svg" alt="icon" />
          </button>
        </InputBox>
      </SearchBox>
      <SectionBox>
        <h1>최근 검색어</h1>
        <TagBox>
          {recents.map((word, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={`${word}_${index}`}>{word}</p>
          ))}
        </TagBox>
      </SectionBox>
      <SectionBox>
        <h1>내 주변 스터디 모임</h1>
        {data != null && meetings.length === 0 ? (
          <p>조회된 내용이 없습니다</p>
        ) : (
          <CardBox>
            {meetings?.length != null &&
              meetings.map(
                ({
                  meetingId,
                  meetingName,
                  skillList,
                  locationAddress,
                  meetingDate,
                  registeredCount,
                  totalCount,
                }) => (
                  <MeetingCard key={meetingId}>
                    <ContentsBox>
                      <h2>{meetingName}</h2>
                      <SKillsBox>
                        {skillList.map(({ id, skillName }) => (
                          <p key={id}>{skillName}</p>
                        ))}
                      </SKillsBox>
                    </ContentsBox>
                    <hr />
                    <SubContentsBox>
                      <p>{`${locationAddress.split(' ')[0]} ${locationAddress.split(' ')[1]}`}</p>
                      <p>{meetingDate}</p>
                      <p>{`${registeredCount} / ${totalCount}`}</p>
                    </SubContentsBox>
                  </MeetingCard>
                )
              )}
          </CardBox>
        )}
      </SectionBox>
    </SearchLayout>
  )
}
