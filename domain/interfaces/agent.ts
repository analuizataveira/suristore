import { AgentRole } from "../enums/agent-role"

export interface ValorantAgent {
  uuid: string
  displayName: string
  description: string
  developerName: string
  characterTags: string[] | null
  displayIcon: string
  displayIconSmall: string
  bustPortrait: string
  fullPortrait: string
  fullPortraitV2: string
  killfeedPortrait: string
  background: string
  backgroundGradientColors: string[]
  assetPath: string
  isFullPortraitRightFacing: boolean
  isPlayableCharacter: boolean
  isAvailableForTest: boolean
  isBaseContent: boolean
  role: ValorantRole
  recruitmentData: RecruitmentData | null
  abilities: ValorantAbility[]
  voiceLine: VoiceLine | null
}

export interface ValorantRole {
  uuid: string
  displayName: string
  description: string
  displayIcon: string
  assetPath: string
}

export interface ValorantAbility {
  slot: string
  displayName: string
  description: string
  displayIcon: string
}

export interface RecruitmentData {
  counterId: string
  milestoneId: string
  milestoneThreshold: number
  useLevelVpCostOverride: boolean
  levelVpCostOverride: number
  startDate: string
  endDate: string
}

export interface VoiceLine {
  minDuration: number
  maxDuration: number
  mediaList: MediaItem[]
}

export interface MediaItem {
  id: number
  wwise: string
  wave: string
}

// Mapped interfaces for our application
export interface Agent {
  id: string
  name: string
  role: AgentRole
  abilities: Ability[]
  image: string
  portrait: string
  description: string
  background: string
  gradientColors: string[]
}

export interface Ability {
  name: string
  description: string
  icon: string
  slot: string
}

// Export AgentRole for convenience
export { AgentRole }
