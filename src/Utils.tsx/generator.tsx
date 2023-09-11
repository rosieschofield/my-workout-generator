import { GeneratedWorkout } from "../Types";

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

export function DisplayWorkout(workout: GeneratedWorkout): JSX.Element {
  return (
    <ul className="generatedOutput">
      {" "}
      <li> {workout.workoutLength} minute Workout </li>
      <li>
        {workout.sets} sets with{" "}
        {convertsSecondstoMixed(workout.setWithoutRest)} work{" "}
      </li>
      <li>{convertsSecondstoMixed(workout.set_rest)} rest between sets </li>
      <li className="preExercises">
        {workout.rep_time}s per exercise, {workout.rep_rest}s rest{" "}
        <li>{workout.exerciseCount} exercises:</li>
      </li>
      {workout.exercises.map((exercise, index) => (
        <li key={exercise.exercise_id}>{exercise.exercise_name}</li>
      ))}
    </ul>
  );
}

//generates random number between 55 and 30 to exercise, and random number between 25 and 5 for rest
//and generates a whole number representing number of exercises based on those values
function getExerciseCount(
  repTime: number,
  exerciseTime: number,
  restTime: number
): number {
  const eachRep = exerciseTime + restTime;
  const repTimeSeconds = repTime * 60;
  return Math.round(repTimeSeconds / eachRep);
  //return [exerciseCount, exerciseTime, restTime];
}

function getSingleRepTime(): number {
  return Math.round((Math.random() * (55 - 30) + 30) / 5) * 5;
}

function getRepRestTime(): number {
  return Math.round((Math.random() * (25 - 5) + 5) / 5) * 5;
}

//converts decimal input to minutes and seconds in multiple of 5
function convertDecimaltoTime(decimal: number): string {
  const minutes = Math.floor(decimal);
  const seconds = (decimal - minutes) * 60;
  const secondsInFives = Math.round(seconds / 5) * 5;
  return minutes + "m " + secondsInFives + "s";
}

//converts input to seconds string or minutes and seconds string
function convertsSecondstoMixed(seconds: number): string {
  if (seconds < 60) {
    return seconds + "s";
  } else {
    return convertDecimaltoTime(seconds / 60);
  }
}

//gets random multiple of 5 between min and max inclusive
function getSetRest(min: number, max: number): number {
  const restInMinutes = Math.random() * (max - min) + min;
  const restInSeconds = restInMinutes * 60;
  const restIn5s = Math.round(restInSeconds / 5) * 5;
  return restIn5s;
}

//generates random whole number between the min & max inclusive
function generateSets(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
