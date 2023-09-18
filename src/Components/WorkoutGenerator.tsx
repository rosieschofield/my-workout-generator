import { useState } from "react";
import { GeneratedWorkout, WorkoutProps } from "../Types/Types";
import { generateWorkout } from "../Utils/generator";
import axios from "axios";
import { baseUrl } from "../Utils/baseUrl";
import { Button } from "@chakra-ui/react";
import { DisplayWorkout } from "./DisplayWorkout";

export function WorkoutGenerator({
  counter,
  setCounter,
}: WorkoutProps): JSX.Element {
  const [workout, setWorkout] = useState<GeneratedWorkout>();
  const [input, setInput] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
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
    return randExercises;
  }

  async function handleSaveWorkout() {
    if (workout === undefined) {
      return "error";
    }
    const formattedWorkout = { title: workoutTitle, ...workout };
    await axios.post(baseUrl + "/saveworkout", formattedWorkout);
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
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
    </main>
  );
}
