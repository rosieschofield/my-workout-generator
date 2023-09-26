import { useState } from "react";
import { AllSavedWorkouts } from "./Components/AllSavedWorkouts";
import { Timer } from "./Components/Timer";
import { WorkoutGenerator } from "./Components/WorkoutGenerator";
import "./styles.css";

function App(): JSX.Element {
  const [counter, setCounter] = useState(0);

  return (
    <div className="body">
      <Timer />
      <header>
        <h1>WORKOUT GENERATOR</h1>
      </header>
      <WorkoutGenerator counter={counter} setCounter={setCounter} />
      <AllSavedWorkouts counter={counter} setCounter={setCounter} />
    </div>
  );
}

export default App;
