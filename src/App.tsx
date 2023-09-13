import { Box, Button, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DisplaySavedWorkout } from "./Components/DisplaySavedWorkout";
import { DisplayWorkout } from "./Components/DisplayWorkout";
import {
  GeneratedWorkout,
  fetchedCompleteSavedWorkout,
  fetchedSavedWorkoutExercises,
} from "./Types/Types";
import { baseUrl } from "./Utils/baseUrl";
import { mergeExercicesWithSavedWorkouts } from "./Utils/formatImports";
import { generateWorkout } from "./Utils/generator";
import "./styles.css";

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
    if (input.length === 0) {
      setWorkout(newWorkout);
    } else {
      const randomExercises = await fetchRandExercises(
        newWorkout.exerciseCount
      );
      newWorkout.exercises = randomExercises;
      setWorkout(newWorkout);
    }
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

  return (
    <div className="body">
      <Box backgroundColor="#140f31" />
      <header>
        <h1>WORKOUT GENERATOR</h1>
      </header>
      <main>
        <section className="question">
          <h2>how much time do you have to workout?</h2>
          <input
            value={input}
            onChange={(event) => {
              setDisplay(false);
              setInput(event.target.value);
            }}
            className="input"
            type="text"
            placeholder="mins"
          ></input>
          <Button className="button" onClick={onGetNewClick}>
            GET NEW
          </Button>
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
                className="inputTitle"
                type="text"
                placeholder="Give the Workout a Title..."
              ></input>
              <Button onClick={handleSaveWorkout}> SAVE </Button>
            </div>
          )}
        </section>
        <section>
          <h3 className="question">Saved Workouts</h3>
          {savedWorkouts !== undefined && (
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {savedWorkouts.map((savedWorkout, index) => (
                <DisplaySavedWorkout
                  key={index}
                  savedWorkout={savedWorkout}
                  setCounter={(counter) => setCounter(counter)}
                />
              ))}
            </Grid>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
