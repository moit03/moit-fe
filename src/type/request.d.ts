export interface EditMeetingReq {
  meetingName: string | undefined
  budget: number | undefined
  contents: string | undefined
  totalCount: number | undefined
  locationAddress: string | undefined
  locationLat: number | undefined
  locationLng: number | undefined
  regionFirstName: string | undefined
  regionSecondName: string | undefined
  skillIds: number[]
  careerIds: number[]
}
