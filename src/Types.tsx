export interface fetchedSavedMetaData {
  workout_id: number;
  title: string;
  sets: number;
  rep_rest: number;
  set_rest: number;
  rep_time: number;
}

export interface fetchedSavedWorkoutExercises {
  workout_id: number;
  exercise_id: number;
  exercise_name: string;
}

export interface fetchedCompleteSavedWorkout extends fetchedSavedMetaData {
  exercises: fetchedSavedWorkoutExercises[];
}

export interface GeneratedWorkoutNoEx {
  workoutLength: string;
  sets: number;
  setWithoutRest: number;
  set_rest: number;
  rep_time: number;
  rep_rest: number;
  exerciseCount: number;
}

export interface GeneratedWorkout extends GeneratedWorkoutNoEx {
  exercises: fetchedSavedWorkoutExercises[];
}
