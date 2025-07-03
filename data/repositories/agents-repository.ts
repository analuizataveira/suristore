import type { ValorantAgent } from "@/domain/interfaces/agent"

export class ValorantAgentsRepository {
  private static readonly BASE_URL = "https://valorant-api.com/v1"

  static async getAllAgents(): Promise<ValorantAgent[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/agents?isPlayableCharacter=true`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Failed to fetch agents from Valorant API:", error)
      throw error
    }
  }

  static async getAgentById(uuid: string): Promise<ValorantAgent | null> {
    try {
      const response = await fetch(`${this.BASE_URL}/agents/${uuid}`)

      if (!response.ok) {
        if (response.status === 404) return null
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data || null
    } catch (error) {
      console.error(`Failed to fetch agent ${uuid} from Valorant API:`, error)
      throw error
    }
  }
}
