import { GeneratedWorkout } from "../Types/Types";
import {
  generateSets,
  getExerciseCount,
  getRepRestTime,
  getSetRest,
  getSingleRepTime,
} from "./genHelperFuncs";

export function generateWorkout(workoutLength: string): GeneratedWorkout {
  const numberOfSets = generateSets(3, 5);
  const setLength = parseInt(workoutLength, 10) / numberOfSets;
  const initialSetRest: number = getSetRest(setLength * 0.1, setLength * 0.2);
  const setRepTime = setLength - initialSetRest / 60;
  const singleRepTime = getSingleRepTime();
  const repRestTime = getRepRestTime();
  const exerciseCount = getExerciseCount(
    setRepTime,
    singleRepTime,
    repRestTime
  );
  const setLengthWithoutRest = (singleRepTime + repRestTime) * exerciseCount;
  const setRest = setLength * 60 - setLengthWithoutRest;
  const generatedWorkout = {
    workoutLength: workoutLength,
    sets: numberOfSets,
    setWithoutRest: setLengthWithoutRest,
    set_rest: setRest,
    rep_time: singleRepTime,
    rep_rest: repRestTime,
    exerciseCount: exerciseCount,
    exercises: [],
  };
  return generatedWorkout;
}
