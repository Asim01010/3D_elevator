import { Routes, Route } from "react-router-dom";

import Straight from "./Straight";
import Elevator3D from "./Elevator3D";
import ElevatorConfigurator from "./ElevatorConfigurator";

const App = () => {
  return (
    <Routes>
      {/* Main Page */}
      <Route path="/" element={<Elevator3D />} />

      {/* Straight Elevator View */}
      <Route path="/straight" element={<Straight />} />

      {/* Configurator */}
      <Route path="/config" element={<ElevatorConfigurator />} />
    </Routes>
  );
};

export default App;
