import type { ValorantAgent, Agent } from "@/domain/interfaces/agent"
import { AgentRole } from "@/domain/enums/agent-role"

export class AgentDataMapper {
  static mapValorantAgentToAgent(valorantAgent: ValorantAgent): Agent {
    return {
      id: valorantAgent.uuid,
      name: valorantAgent.displayName,
      role: this.mapRole(valorantAgent.role.displayName),
      abilities: valorantAgent.abilities.map((ability) => ({
        name: ability.displayName,
        description: ability.description,
        icon: ability.displayIcon,
        slot: ability.slot,
      })),
      image: valorantAgent.displayIcon,
      portrait: valorantAgent.fullPortraitV2 || valorantAgent.fullPortrait,
      description: valorantAgent.description,
      background: valorantAgent.background,
      gradientColors: valorantAgent.backgroundGradientColors,
    }
  }

  private static mapRole(roleName: string): AgentRole {
    const roleMap: Record<string, AgentRole> = {
      Duelist: AgentRole.DUELIST,
      Initiator: AgentRole.INITIATOR,
      Controller: AgentRole.CONTROLLER,
      Sentinel: AgentRole.SENTINEL,
    }

    return roleMap[roleName] || AgentRole.DUELIST
  }

  static getRoleColor(role: AgentRole): string {
    const colors = {
      [AgentRole.DUELIST]: "text-red-400",
      [AgentRole.INITIATOR]: "text-yellow-400",
      [AgentRole.CONTROLLER]: "text-blue-400",
      [AgentRole.SENTINEL]: "text-green-400",
    }

    return colors[role] || "text-gray-400"
  }

  static getRoleIcon(role: AgentRole): string {
    const icons = {
      [AgentRole.DUELIST]: "⚔️",
      [AgentRole.INITIATOR]: "🎯",
      [AgentRole.CONTROLLER]: "🛡️",
      [AgentRole.SENTINEL]: "🏰",
    }

    return icons[role] || "❓"
  }

  static getAbilitySlotName(slot: string): string {
    const slotNames: Record<string, string> = {
      Ability1: "Basic",
      Ability2: "Basic",
      Grenade: "Signature",
      Ultimate: "Ultimate",
    }

    return slotNames[slot] || slot
  }

  static getAbilitySlotColor(slot: string): string {
    const colors: Record<string, string> = {
      Ability1: "bg-blue-600",
      Ability2: "bg-purple-600",
      Grenade: "bg-yellow-600",
      Ultimate: "bg-red-600",
    }

    return colors[slot] || "bg-gray-600"
  }
}
