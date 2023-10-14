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
  let singleRepTime = getSingleRepTime();
  let repRestTime = getRepRestTime();
  const exerciseCount = getExerciseCount(
    setRepTime,
    singleRepTime,
    repRestTime
  );
  const setLengthWithoutRest = (singleRepTime + repRestTime) * exerciseCount;
  let setRest = setLength * 60 - setLengthWithoutRest;
  if (setRest < 0) {
    repRestTime += setRest;
    if (repRestTime < 0) {
      singleRepTime += repRestTime;
      repRestTime = 0;
    }
    setRest = 0;
  }
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
