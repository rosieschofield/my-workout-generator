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

export interface WorkoutFormat {
  workoutLength: string;
  numberOfSets: number;
  repTime: string;
  totalRest: string;
  exerciseTime: number;
  restTime: number;
  exerciseCount: number;
  exerciseArray: string[];
}
