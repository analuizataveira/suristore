import type { Agent, AgentRole } from "@/domain/interfaces/agent"
import { ValorantAgentsRepository } from "./agents-repository"
import { AgentDataMapper } from "@/utils/agent-data-mapper"

export class AgentsRepository {
  private static agentsCache: Agent[] = []
  private static lastFetchTime = 0
  private static readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

  static async getAllAgents(): Promise<Agent[]> {
    const now = Date.now()

    // Return cached data if still valid
    if (this.agentsCache.length > 0 && now - this.lastFetchTime < this.CACHE_DURATION) {
      return this.agentsCache
    }

    try {
      const valorantAgents = await ValorantAgentsRepository.getAllAgents()
      const mappedAgents = valorantAgents.map((agent) => AgentDataMapper.mapValorantAgentToAgent(agent))

      // Cache the results
      this.agentsCache = mappedAgents
      this.lastFetchTime = now

      return mappedAgents
    } catch (error) {
      console.error("Failed to fetch agents:", error)
      return this.agentsCache.length > 0 ? this.agentsCache : []
    }
  }

  static async getAgentById(id: string): Promise<Agent | null> {
    const allAgents = await this.getAllAgents()
    return allAgents.find((agent) => agent.id === id) || null
  }

  static async getAgentsByRole(role: AgentRole): Promise<Agent[]> {
    const allAgents = await this.getAllAgents()
    return allAgents.filter((agent) => agent.role === role)
  }

  static async getUniqueRoles(): Promise<AgentRole[]> {
    const allAgents = await this.getAllAgents()
    const roles = [...new Set(allAgents.map((agent) => agent.role))]
    return roles.sort()
  }
}
