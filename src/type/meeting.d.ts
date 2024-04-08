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
  skillList: SkillList[]
  careerList: CareerList[]
}

export interface SkillList {
  skillName: string
  id: number
}

export interface CareerList {
  careerName: string
  id: number
}
