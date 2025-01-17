export interface AgentProps {
  id: string;
  isActive: boolean;
  name: string;
  email: string;
  lastseen: string;
}

export interface AgentsProps {
  agents: AgentProps[];
}
