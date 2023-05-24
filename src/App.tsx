import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import GameScreen from "./components/GameScreen";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GameScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
