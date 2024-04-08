export interface FirstRegion {
  regionFirstId: number
  regionFirstName: string
}

export type FirstRegions = FirstRegion[]

export interface SecondRegion {
  regionSecondId: number
  regionSecondName: string
  regionLat: number
  regionLng: number
}

export type SecondRegions = SecondRegion[]

export interface TechStackList {
  data?: any
  skillId: number
  skillName: string
}

export type TechStackLists = TechStackList[]

export type FiltersKey = 'techStacks' | 'careers' | 'region'

export type Filters = { [key in FiltersKey]: number[] }
