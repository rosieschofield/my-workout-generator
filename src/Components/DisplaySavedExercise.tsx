import { fetchedSavedWorkoutExercises } from "../Types/Types";

interface DisplaySavedExerciseProps {
  exercise: fetchedSavedWorkoutExercises;
}

export function DisplaySavedExercise(exercise: DisplaySavedExerciseProps) {
  return <li>{exercise.exercise.exercise_name}</li>;
}
