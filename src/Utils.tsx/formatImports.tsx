import {
  fetchedSavedWorkoutExercises,
  fetchedCompleteSavedWorkout,
} from "../Types";

export function mergeExercicesWithSavedWorkouts(
  savedWorkouts: fetchedCompleteSavedWorkout[],
  savedExercises: fetchedSavedWorkoutExercises[]
) {
  savedWorkouts.forEach(
    (workout) =>
      (workout.exercises = filterExerciseArrayForIdMatch(
        savedExercises,
        workout.workout_id
      ))
  );
  return savedWorkouts;
}

function filterExerciseArrayForIdMatch(
  exerciseArray: fetchedSavedWorkoutExercises[],
  workoutId: number
) {
  return exerciseArray.filter(
    (exercise: fetchedSavedWorkoutExercises) =>
      exercise.workout_id === workoutId
  );
}
