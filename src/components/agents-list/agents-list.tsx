import React, { useState } from "react";
import { useAgents } from "../context";
import AddAgentModal from "../add-agent-modal/add-agent-modal";
import { AgentProps } from "../../types/agent-types";

import s from "./agents-list.module.scss";

const Agents: React.FC = () => {
  const { agents, setAgents, deleteAgent } = useAgents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<AgentProps | undefined>(
    undefined
  );

  const handleAddAgent = (agent: AgentProps) => {
    setAgents([...agents, agent]);
  };

  const handleUpdateAgent = (updatedAgent: AgentProps) => {
    setAgents(
      agents.map((agent) =>
        agent.id === updatedAgent.id ? updatedAgent : agent
      )
    );
  };

  const openAddModal = () => {
    setAgentToEdit(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (agent: AgentProps) => {
    setAgentToEdit(agent);
    setIsModalOpen(true);
  };

  return (
    <div className={s.container}>
      <h1>Agents</h1>
      <button onClick={openAddModal}>Add Agent</button>
      <ul>
        {agents.map((agent) => (
          <li key={agent.id}>
            <div className={s.agent}>
              <p>{agent.name}</p>
              <p>{agent.email}</p>
              <p>{agent.lastseen}</p>
            </div>
            <div className={s.actions}>
              <button onClick={() => openEditModal(agent)}>Update</button>
              <button onClick={() => deleteAgent && deleteAgent(agent.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <AddAgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAgent={handleAddAgent}
        onUpdateAgent={handleUpdateAgent}
        agentToEdit={agentToEdit}
      />
    </div>
  );
};

export default Agents;
