import Agents from "./components/agents-list/agents-list";
import { AgentsProvider } from "./components/context";

import "./App.module.scss";

function App() {
  return (
    <AgentsProvider>
      <Agents />
    </AgentsProvider>
  );
}

export default App;
