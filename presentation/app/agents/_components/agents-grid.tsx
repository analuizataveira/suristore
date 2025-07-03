"use client"

import { useEffect, useState } from "react"
import { AgentsRepository } from "@/data/repositories/agents-repository-facade"
import type { Agent, AgentRole } from "@/domain/interfaces/agent"
import AgentCard from "./agent-card"

interface AgentsGridProps {
  selectedRole?: AgentRole | ""
}

export default function AgentsGrid({ selectedRole }: AgentsGridProps) {
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAgents = async () => {
      setIsLoading(true)
      setError(null)

      try {
        let filteredAgents: Agent[]

        if (selectedRole && selectedRole !== "") {
          filteredAgents = await AgentsRepository.getAgentsByRole(selectedRole)
        } else {
          filteredAgents = await AgentsRepository.getAllAgents()
        }

        setAgents(filteredAgents)
      } catch (error) {
        console.error("Failed to load agents:", error)
        setError("Failed to load agents. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    loadAgents()
  }, [selectedRole])

  if (error) {
    return (
      <div id="agents-grid-error" className="text-center py-20">
        <div className="text-red-400 text-xl mb-4">⚠️ {error}</div>
        <button onClick={() => window.location.reload()} className="text-red-400 hover:text-red-300 underline">
          Try Again
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div id="agents-grid-loading" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-4 animate-pulse">
            <div className="bg-gray-800 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-800 h-6 rounded mb-2"></div>
            <div className="bg-gray-800 h-4 rounded w-2/3 mb-3"></div>
            <div className="bg-gray-800 h-8 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (agents.length === 0) {
    return (
      <div id="agents-grid-empty" className="text-center py-20">
        <div className="text-gray-400 text-xl mb-4">No agents found</div>
        <p className="text-gray-500">Try selecting a different role.</p>
      </div>
    )
  }

  return (
    <div id="agents-grid">
      <div className="mb-6 text-gray-400">
        Showing {agents.length} agent{agents.length !== 1 ? "s" : ""}
        {selectedRole && selectedRole !== "" && (
          <span className="ml-2 text-red-400 capitalize">• {selectedRole} Role</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}
