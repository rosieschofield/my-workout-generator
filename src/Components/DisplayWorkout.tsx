import { GeneratedWorkout } from "../Types/Types";
import { convertSecondstoMixed } from "../Utils/displayTimeValues";

export function DisplayWorkout(workout: GeneratedWorkout): JSX.Element {
  if (workout.workoutLength.length === 0) {
    return <p className="generatedOutput"> Please provide a workout length</p>;
  } else {
    return (
      <ul className="generatedOutput">
        {" "}
        <li> {workout.workoutLength} minute Workout </li>
        <li>{workout.sets} sets with </li>
        <li>{convertSecondstoMixed(workout.set_rest)} rest between sets </li>
        <li>
          {workout.rep_time}s per exercise,{" "}
          {convertSecondstoMixed(workout.rep_rest)} rest{" "}
        </li>
        <li className="preExercises">{workout.exerciseCount} exercises:</li>
        {workout.exercises.map((exercise, index) => (
          <li key={exercise.exercise_id}>{exercise.exercise_name}</li>
        ))}
      </ul>
    );
  }
}
