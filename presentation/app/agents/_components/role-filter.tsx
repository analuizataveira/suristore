"use client"

import { useState, useEffect } from "react"
import { Card } from "@/presentation/components/internal/card"
import { Button } from "@/presentation/components/internal/button"
import type { AgentRole } from "@/domain/interfaces/agent"
import { AgentsRepository } from "@/data/repositories/agents-repository-facade"
import { AgentDataMapper } from "@/utils/agent-data-mapper"

interface RoleFilterProps {
  onRoleChange: (role: AgentRole | "") => void
}

export default function RoleFilter({ onRoleChange }: RoleFilterProps) {
  const [selectedRole, setSelectedRole] = useState<AgentRole | "">("")
  const [availableRoles, setAvailableRoles] = useState<AgentRole[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const roles = await AgentsRepository.getUniqueRoles()
        setAvailableRoles(roles)
      } catch (error) {
        console.error("Failed to load roles:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRoles()
  }, [])

  const handleRoleChange = (role: AgentRole | "") => {
    setSelectedRole(role)
    onRoleChange(role)
  }

  if (isLoading) {
    return (
      <Card id="role-filter-loading" className="sticky top-24">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-800 rounded mb-4"></div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card id="role-filter" className="sticky top-24">
      <h3 className="text-xl font-semibold text-white mb-4">Filter by Role</h3>

      <div className="space-y-2">
        <Button
          variant={selectedRole === "" ? "primary" : "ghost"}
          size="sm"
          onClick={() => handleRoleChange("")}
          className="w-full justify-start"
        >
          <span className="mr-2">🎮</span>
          All Agents
        </Button>

        {availableRoles.map((role) => (
          <Button
            key={role}
            variant={selectedRole === role ? "primary" : "ghost"}
            size="sm"
            onClick={() => handleRoleChange(role)}
            className="w-full justify-start"
          >
            <span className="mr-2">{AgentDataMapper.getRoleIcon(role)}</span>
            <span className="capitalize">{role}</span>
          </Button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-800">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Role Guide</h4>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex items-center">
            <span className="mr-2">⚔️</span>
            <span>
              <strong>Duelist:</strong> Entry fraggers
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🎯</span>
            <span>
              <strong>Initiator:</strong> Info gatherers
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🛡️</span>
            <span>
              <strong>Controller:</strong> Map control
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🏰</span>
            <span>
              <strong>Sentinel:</strong> Site anchors
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
