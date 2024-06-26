export interface Center {
  lat: number
  lng: number
}

export interface GetMeeting {
  meetingId: number
  meetingName: string
  registeredCount: number
  totalCount: number
  locationLat: number
  locationLng: number
  locationAddress: string
  meetingDate: string
  meetingStartTime: string
  meetingEndTime: string
  skillList: SkillList[]
  careerList: CareerList[]
  bookmarked: boolean
}

export interface SkillList {
  skillName: string
  id: number
}

export interface CareerList {
  careerName: string
  id: number
}

export type MyMeetingsStatus = 'progress' | 'complete' | 'held' | 'bookmarked'
