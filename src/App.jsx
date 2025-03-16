import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Algorithms/HomePage";
import FirstComeFirstServe from "./Algorithms/FirstComeFirstServe";
import ShortestJobFirst from "./Algorithms/ShortestJobFirst";

import PriorityScheduling from "./Algorithms/PriorityScheduling";
import RoundRobinScheduler from "./Algorithms/RoundRobinScheduler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/firstComeFirstServe" element={<FirstComeFirstServe />} />

        <Route path="/shortestJobFirst" element={<ShortestJobFirst />} />

        <Route path="/priorityScheduling" element={<PriorityScheduling />} />

        <Route path="/roundRobinScheduler" element={<RoundRobinScheduler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
