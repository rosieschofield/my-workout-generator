import { Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  WorkoutProps,
  fetchedCompleteSavedWorkout,
  fetchedSavedWorkoutExercises,
} from "../Types/Types";
import { baseUrl } from "../Utils/baseUrl";
import { mergeExercicesWithSavedWorkouts } from "../Utils/formatImports";
import { DisplaySavedWorkout } from "./DisplaySavedWorkout";

export function AllSavedWorkouts({
  counter,
  setCounter,
}: WorkoutProps): JSX.Element {
  const [savedWorkouts, setSavedWorkouts] =
    useState<fetchedCompleteSavedWorkout[]>();

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

  return (
    <section>
      <h3 className="question">Saved Workouts</h3>
      {savedWorkouts !== undefined && (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} ml={10} mr={10} pb={10}>
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
  );
}
