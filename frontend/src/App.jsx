import { Routes, Route } from "react-router-dom";

import Straight from "./Straight";
import Elevator3D from "./Elevator3D";
import ElevatorConfigurator from "./ElevatorConfigurator";
import ElevatorStructure from "./Exampe_1";
import ElevatorStructure_1 from "./Example_2";
const App = () => {
  return (
    <Routes>
      {/* Main Page */}
      <Route path="/" element={<Elevator3D />} />

      {/* Straight Elevator View */}
      <Route path="/straight" element={<Straight />} />

      {/* Configurator */}
      <Route path="/config" element={<ElevatorConfigurator />} />

      {/* example */}
      <Route path="/example" element={<ElevatorStructure />} />
      {/* example_2 */}
      <Route path="/example_2" element={<ElevatorStructure_1 />} />
    </Routes>
  );
};

export default App;
