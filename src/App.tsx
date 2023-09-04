//import { greet } from "./utils/greet";
import React from "react";
import { useState } from "react";
import { generateWorkout, DisplayWorkout, WorkoutFormat } from "./generator";
import "./styles.css";

function App(): JSX.Element {
  const [workout, setWorkout] = useState<WorkoutFormat>();
  const [input, setInput] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  function onClick() {
    setWorkout(generateWorkout(input));
    setDisplay(true);
  }
  return (
    <html lang="en">
      <head>
        <title>My Workout Generator</title>
        <link rel="stylesheet" href="styles.css"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;500&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="viewport"
          content="width=device-width, height=device-height,initial-scale=1"
        ></meta>
      </head>
      <body className="body">
        <header>
          <h1>WORKOUT GENERATOR</h1>
        </header>
        <main>
          <section className="question">
            <h3>how much time do you have to workout?</h3>
            <input
              value={input}
              onChange={(event) => {
                setDisplay(false);
                setInput(event.target.value);
              }}
              className="input"
              type="text"
              placeholder="minutes"
            ></input>
            <button className="button" onClick={onClick}>
              GET NEW
            </button>
          </section>
          <section>
            {" "}
            {!display || workout === undefined ? (
              <p className="empty"></p>
            ) : (
              <DisplayWorkout
                workoutLength={workout.workoutLength}
                numberOfSets={workout.numberOfSets}
                repTime={workout.repTime}
                totalRest={workout.totalRest}
                exerciseTime={workout.exerciseTime}
                restTime={workout.restTime}
                exerciseCount={workout.exerciseCount}
                exerciseArray={workout.exerciseArray}
              />
            )}
          </section>
        </main>
      </body>
    </html>
  );
}

export default App;
