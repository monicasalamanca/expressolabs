import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { AgentProps } from "../types/agent-types";

const agentsList = [
  {
    id: "678acad169415fe1d669d163",
    isActive: false,
    name: "Giles Dickson",
    email: "gilesdickson@opticom.com",
    lastseen: "2015-07-03T09:53:26 +04:00",
  },
  {
    id: "678acad15c69664671581085",
    isActive: false,
    name: "Calderon Rodgers",
    email: "calderonrodgers@opticom.com",
    lastseen: "2014-05-24T03:30:36 +04:00",
  },
  {
    id: "678acad1b53692ac333e99d9",
    isActive: true,
    name: "Burke Tanner",
    email: "burketanner@opticom.com",
    lastseen: "2017-05-30T08:32:09 +04:00",
  },
  {
    id: "678acad1a5263bba8e56006c",
    isActive: false,
    name: "Jewell Bradley",
    email: "jewellbradley@opticom.com",
    lastseen: "2021-03-09T04:12:20 +05:00",
  },
  {
    id: "678acad1ffb89f022a3f5480",
    isActive: false,
    name: "Rosetta Grimes",
    email: "rosettagrimes@opticom.com",
    lastseen: "2020-08-13T12:28:12 +04:00",
  },
  {
    id: "678acad12a93c822c5def6d7",
    isActive: true,
    name: "Patton Nielsen",
    email: "pattonnielsen@opticom.com",
    lastseen: "2021-03-15T10:05:46 +04:00",
  },
];

const AgentsContext = createContext<{
  agents: AgentProps[];
  setAgents: (agents: AgentProps[]) => void;
  deleteAgent?: (id: string) => void;
}>({
  agents: [],
  setAgents: () => {},
  deleteAgent: () => {},
});

export const AgentsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [agents, setAgents] = useState<AgentProps[]>([]);

  useEffect(() => {
    setAgents(agentsList);
  }, []);

  const deleteAgent = (id: string) => {
    const updatedAgents = agents.filter((agent) => agent.id !== id);
    setAgents(updatedAgents);
  };

  return (
    <AgentsContext.Provider value={{ agents, setAgents, deleteAgent }}>
      {children}
    </AgentsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAgents = () => useContext(AgentsContext);
