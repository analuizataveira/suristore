"use client"

import { useState } from "react"
import Header from "@/presentation/layout/header"
import Footer from "@/presentation/layout/footer"
import AgentsGrid from "./_components/agents-grid"
import RoleFilter from "./_components/role-filter"
import type { AgentRole } from "@/domain/interfaces/agent"

function AgentsPage() {
  const [selectedRole, setSelectedRole] = useState<AgentRole | "">("")

  const handleRoleChange = (role: AgentRole | "") => {
    setSelectedRole(role)
  }

  return (
    <div id="agents-page" className="min-h-screen bg-black">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Valorant Agents</h1>
          <p className="text-gray-400 text-lg">Master every agent and dominate the battlefield with official data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <RoleFilter onRoleChange={handleRoleChange} />
          </div>
          <div className="lg:col-span-4">
            <AgentsGrid selectedRole={selectedRole} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AgentsPage
