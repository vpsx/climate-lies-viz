import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RaceChartPage from "./pages/RaceChartPage";
import GraphVisualizationPage from "./pages/GraphVisualizationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<RaceChartPage />} />
        <Route path={"/chart"} element={<RaceChartPage />} />
        <Route path={"/graph"} element={<GraphVisualizationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
