import { WorkoutFormat } from "../Types";

export function generateWorkout(workoutLength: string): WorkoutFormat {
  //random number between 3 and 5
  const numberOfSets = generateSets(3, 5);
  const setLength = parseInt(workoutLength, 10) / numberOfSets;
  //gets random multiple of 5 between min and max inclusive
  const setRest: number = getSetRest(setLength * 0.1, setLength * 0.2);
  const setRepTime = setLength - setRest / 60;
  //gets number of exercises based on available rep time
  const exerciseTime = getExerciseTime();
  const restTime = getRestTime();
  const exerciseCount = getExerciseCount(setRepTime, exerciseTime, restTime);
  const exerciseArray = generateExercises(exerciseCount);
  const actualRepTime = (exerciseTime + restTime) * exerciseCount;
  const overallRest = setLength * 60 - actualRepTime;
  const generatedWorkout = {
    workoutLength: workoutLength,
    numberOfSets: numberOfSets,
    repTime: convertsSecondstoMixed(actualRepTime),
    totalRest: convertsSecondstoMixed(overallRest),
    exerciseTime: exerciseTime,
    restTime: restTime,
    exerciseCount: exerciseCount,
    exerciseArray: exerciseArray,
  };
  return generatedWorkout;
}

export function DisplayWorkout(workout: WorkoutFormat): JSX.Element {
  return (
    <ul className="generatedOutput">
      {" "}
      <li> {workout.workoutLength} minute Workout </li>
      <li>
        {workout.numberOfSets} sets with {workout.repTime} work{" "}
      </li>
      <li>{workout.totalRest} rest between sets </li>
      <li className="preExercises">
        {workout.exerciseTime}s per exercise, {workout.restTime}s rest{" "}
        <li>{workout.exerciseCount} exercises:</li>
      </li>
      {workout.exerciseArray.map((x, index) => (
        <li key={workout.exerciseArray[index]}>{x}</li>
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

function getExerciseTime(): number {
  return Math.round((Math.random() * (55 - 30) + 30) / 5) * 5;
}

function getRestTime(): number {
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

//string arrays of different exercises
const fastExercises: string[] = [
  "hops",
  "skipping",
  "ladders",
  "sprint between two cones",
  "skater jumps",
  "step ups",
  "lunge jumps",
  "high knees",
  "squat jumps",
  "star jumps",
  "burpees",
  "tuck jumps",
  "box jumps",
];
const legExercises: string[] = [
  "lateral lunges",
  "curtsy lunges",
  "deadlift",
  "clean and press",
  "kettle bell swings",
  "wall-sit",
  "squats",
  "lunges",
  "split squats",
  "romanian deadlift",
];
const armExercises: string[] = [
  "bent-over row",
  "upright row",
  "battle ropes",
  "bicep curl",
  "dead hang",
  "pull-up",
  "chin-up",
  "press-up",
  " shoulder press",
  "tricep dips",
  "tricep extension",
];
const coreExercises: string[] = [
  "hollow hold",
  "flutter kicks",
  "bird dog",
  "side plank",
  "bear crawls",
  "bicycle crunches",
  "plank with leg lifts",
  "renegade rows",
  "plank jacks",
  "commandos",
  "russian twists",
  "mountain climbers",
  "leg raises",
  "plank shoulder taps",
  "plank",
  "v-sits",
  "ball-throw sit ups",
];

//gets a random item from an array
function randomArrayItem(wordList: string[]): string {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

//generates an array of unique exercises of the input length
function generateExercises(noOfExercises: number): string[] {
  const newWorkout: string[] = [];
  let exercisesAdded = 0;
  while (exercisesAdded < noOfExercises) {
    const randNum = Math.floor(Math.random() * 4);
    let newItem: string;
    if (randNum === 1) {
      newItem = randomArrayItem(fastExercises);
    } else if (randNum === 2) {
      newItem = randomArrayItem(legExercises);
    } else if (randNum === 3) {
      newItem = randomArrayItem(armExercises);
    } else {
      newItem = randomArrayItem(coreExercises);
    }
    newWorkout.forEach((element) => {
      if (element === newItem) {
        newItem = "double";
      }
    });
    if (newItem !== "double") {
      newWorkout.push(newItem);
      exercisesAdded++;
    }
  }
  return newWorkout;
}

/*function getExerciseCountSentence(repTime:number) :string {
    const exerciseTime = Math.round((Math.random() * (55 - 30) + 30)/5)*5;
    const restTime = Math.round((Math.random() * (25 - 5) + 5)/5)*5;
    const eachRep = exerciseTime+restTime
    const repTimeSeconds = repTime*60
    const exerciseCount = Math.round(repTimeSeconds/eachRep)
    return exerciseCount + ' exercises, '+exerciseTime+ ' seconds per exercise with '+restTime+' seconds rest';
  }*/
