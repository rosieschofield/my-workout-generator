import { fetchedCompleteSavedWorkout } from "../Types/Types";

export function getTimerFromWorkout(
  fetchedWorkout: fetchedCompleteSavedWorkout
) {
  const workoutLength =
    ((fetchedWorkout.rep_time + fetchedWorkout.rep_rest) *
      fetchedWorkout.exercises.length +
      fetchedWorkout.set_rest) *
    fetchedWorkout.sets;
  console.log(workoutLength);
  for (let i = 1; i <= fetchedWorkout.sets; i++) {
    const set = i;
    console.log(`set: ${set}`);
    for (const exercise of fetchedWorkout.exercises) {
      console.log(`exercise: ${exercise.exercise_name}`);
      //setCount to reptime and start timer setDelay(1000)
      //when count reaches zero setDelay(null) clearInterval(timer) & setcounter to rest time & start
      console.log(`exercise: ${fetchedWorkout.rep_time}s`);
      console.log(`rest: ${fetchedWorkout.rep_rest}s`);
      //when count reaches zero clearInterval(timer)
    }
    //setCount to rest time and start timer
    console.log(`rest: ${fetchedWorkout.set_rest}s`);
    //when count reaches zero clearInterval(timer)
  }
}
