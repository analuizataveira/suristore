"use client"

import Image from "next/image"
import { useState } from "react"
import type { Agent } from "@/domain/interfaces/agent"
import { Card } from "@/presentation/components/internal/card"
import { Button } from "@/presentation/components/internal/button"
import { AgentDataMapper } from "@/utils/agent-data-mapper"
import { Eye, EyeOff } from "lucide-react"

interface AgentCardProps {
  agent: Agent
}

export default function AgentCard({ agent }: AgentCardProps) {
  const [showAbilities, setShowAbilities] = useState(false)

  const roleColor = AgentDataMapper.getRoleColor(agent.role)
  const roleIcon = AgentDataMapper.getRoleIcon(agent.role)

  const gradientStyle =
    agent.gradientColors.length >= 2
      ? {
          background: `linear-gradient(135deg, #${agent.gradientColors[0]}, #${agent.gradientColors[1]})`,
        }
      : { background: "#1f2937" }

  return (
    <Card id={`agent-card-${agent.id}`} variant="hover" className="group overflow-hidden">
      {/* Agent Header with Background */}
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden" style={gradientStyle}>
        <div className="absolute inset-0 bg-black/20" />

        {/* Agent Portrait */}
        <div className="relative h-full flex items-end justify-center">
          <Image
            src={agent.portrait || agent.image}
            alt={agent.name}
            width={200}
            height={300}
            className="object-contain h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = agent.image || "/placeholder.svg?height=300&width=200"
            }}
          />
        </div>

        {/* Role Badge */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <span className="text-sm">{roleIcon}</span>
          <span className={`text-sm font-medium capitalize ${roleColor}`}>{agent.role}</span>
        </div>
      </div>

      {/* Agent Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{agent.name}</h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{agent.description}</p>
        </div>

        {/* Abilities Toggle */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowAbilities(!showAbilities)}
          className="w-full flex items-center justify-center space-x-2"
        >
          {showAbilities ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showAbilities ? "Hide" : "Show"} Abilities</span>
        </Button>

        {/* Abilities List */}
        {showAbilities && (
          <div className="space-y-2 pt-2 border-t border-gray-800">
            {agent.abilities.map((ability, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${AgentDataMapper.getAbilitySlotColor(ability.slot)}`}
                  >
                    <Image
                      src={ability.icon || "/placeholder.svg"}
                      alt={ability.name}
                      width={20}
                      height={20}
                      className="object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-white">{ability.name}</h4>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      {AgentDataMapper.getAbilitySlotName(ability.slot)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{ability.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
