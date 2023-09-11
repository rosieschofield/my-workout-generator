import React from "react";
import { useState, useEffect } from "react";
import { generateWorkout, DisplayWorkout } from "./Utils.tsx/generator";
import {
  GeneratedWorkout,
  fetchedCompleteSavedWorkout,
  fetchedSavedWorkoutExercises,
} from "./Types";
import "./styles.css";
import axios from "axios";
import { mergeExercicesWithSavedWorkouts } from "./Utils.tsx/formatImports";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://workout-generator-server.onrender.com"
    : "http://localhost:4000";

function App(): JSX.Element {
  const [workout, setWorkout] = useState<GeneratedWorkout>();
  const [input, setInput] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [savedWorkouts, setSavedWorkouts] =
    useState<fetchedCompleteSavedWorkout[]>();
  const [counter, setCounter] = useState(0);
  const [workoutTitle, setWorkoutTitle] = useState<string>();

  async function onGetNewClick() {
    const newWorkout = generateWorkout(input);
    const randomExercises = await fetchRandExercises(newWorkout.exerciseCount);
    newWorkout.exercises = randomExercises;
    console.log(newWorkout);
    setWorkout(newWorkout);
    setDisplay(true);
  }

  async function fetchRandExercises(exerciseCount: number) {
    const res = await axios.get(baseUrl + `/exercises/${exerciseCount}`);
    const randExercises = await res.data;
    console.log(randExercises);
    return randExercises;
  }

  async function fetchSavedWorkouts() {
    const firstRes = await axios.get(baseUrl + "/savedworkouts/metadata");
    const savedWorkoutMetadataArray: fetchedCompleteSavedWorkout[] =
      await firstRes.data;
    const secondRes = await axios.get(baseUrl + "/savedworkouts/exercises");
    const savedWorkoutExercisesArray: fetchedSavedWorkoutExercises[] =
      await secondRes.data;
    const completeSavedWorkoutArray = mergeExercicesWithSavedWorkouts(
      savedWorkoutMetadataArray,
      savedWorkoutExercisesArray
    );
    setSavedWorkouts(completeSavedWorkoutArray);
  }

  useEffect(() => {
    fetchSavedWorkouts();
  }, [counter]);

  async function handleSaveWorkout() {
    if (workout === undefined) {
      return "error";
    }
    const formattedWorkout = { title: workoutTitle, ...workout };
    await axios.post(baseUrl + "/saveworkout", formattedWorkout);
    setCounter((prevCounter) => prevCounter + 1);
  }

  async function handleDeleteWorkout(id: number) {
    await axios.delete(baseUrl + `/savedworkouts/${id}`);
    setCounter((prevCounter) => prevCounter - 1);
  }

  function displaySavedExercise(exercise: fetchedSavedWorkoutExercises) {
    return <li>{exercise.exercise_name}</li>;
  }

  function displaySavedWorkout(
    savedWorkout: fetchedCompleteSavedWorkout
  ): JSX.Element {
    return (
      <div className="savedWorkouts">
        <button
          className="button"
          onClick={() => handleDeleteWorkout(savedWorkout.workout_id)}
        >
          {" "}
          unsave{" "}
        </button>{" "}
        <p> {savedWorkout.title} </p>
        <p>
          {savedWorkout.sets} sets, {savedWorkout.rep_time}s reps with{" "}
          {savedWorkout.rep_rest}s rest and {savedWorkout.set_rest}s rest
          between sets, {savedWorkout.exercises.length} exercises,{" "}
          {savedWorkout.exercises.map(displaySavedExercise)}
        </p>
      </div>
    );
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
            <button className="button" onClick={onGetNewClick}>
              GET NEW
            </button>
          </section>
          <section>
            {" "}
            {!display || workout === undefined ? (
              <p className="empty"></p>
            ) : (
              <div>
                <DisplayWorkout
                  workoutLength={workout.workoutLength}
                  sets={workout.sets}
                  setWithoutRest={workout.setWithoutRest}
                  set_rest={workout.set_rest}
                  rep_time={workout.rep_time}
                  rep_rest={workout.rep_rest}
                  exerciseCount={workout.exerciseCount}
                  exercises={workout.exercises}
                />
                <input
                  value={workoutTitle}
                  onChange={(event) => {
                    setWorkoutTitle(event.target.value);
                  }}
                  className="input"
                  type="text"
                  placeholder="Give the Workout a Title..."
                ></input>
                <button className="button" onClick={handleSaveWorkout}>
                  {" "}
                  SAVE{" "}
                </button>
              </div>
            )}
          </section>
          <section>
            <h3 className="question">Saved Workouts</h3>
            {savedWorkouts !== undefined && (
              <section className="question">
                {savedWorkouts.map(displaySavedWorkout)}
              </section>
            )}
          </section>
        </main>
      </body>
    </html>
  );
}

export default App;
