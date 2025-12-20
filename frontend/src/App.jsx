import { Routes, Route } from "react-router-dom";


import Straight from "./Straight";

import Elevator3D from "./Elevator3D";

const App = () => {
  return (
    <Routes>
      {/* Home / Front View */}
   

      {/* Straight Elevator View */}
      <Route path="/straight" element={<Straight />} />

      {/* Optional */}
     
      {/* Front2 */}
      <Route path="/elevator" element={<Elevator3D />} />
    </Routes>
  );
};

export default App;
