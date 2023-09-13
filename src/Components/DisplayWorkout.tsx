import { GeneratedWorkout } from "../Types/Types";
import { convertsSecondstoMixed } from "../Utils/displayTimeValues";

export function DisplayWorkout(workout: GeneratedWorkout): JSX.Element {
  if (workout.workoutLength.length === 0) {
    return <p className="generatedOutput"> Please provide a workout length</p>;
  } else {
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
}
