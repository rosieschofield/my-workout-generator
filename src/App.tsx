import { useState } from "react";
import { AllSavedWorkouts } from "./Components/AllSavedWorkouts";
import "./styles.css";
import { WorkoutGenerator } from "./Components/WorkoutGenerator";

function App(): JSX.Element {
  const [counter, setCounter] = useState(0);

  return (
    <div className="body">
      <header>
        <h1>WORKOUT GENERATOR</h1>
      </header>
      <WorkoutGenerator counter={counter} setCounter={setCounter} />
      <AllSavedWorkouts counter={counter} setCounter={setCounter} />
    </div>
  );
}

export default App;
