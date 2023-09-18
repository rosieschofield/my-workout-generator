//divides overall rep time by rep + rest time to generate the number of exercises per set
export function getExerciseCount(
  setTime: number,
  exerciseTime: number,
  restTime: number
): number {
  const eachRep = exerciseTime + restTime;
  const repTimeSeconds = setTime * 60;
  return Math.floor(repTimeSeconds / eachRep);
}

//generates random number between 55 and 30 to exercise
export function getSingleRepTime(): number {
  return Math.floor((Math.random() * (55 - 30) + 30) / 5) * 5;
}

//generates random number between 25 and 5 for rest
export function getRepRestTime(): number {
  return Math.floor((Math.random() * (25 - 5) + 5) / 5) * 5;
}

//gets random multiple of 5 between a min and max inclusive
export function getSetRest(min: number, max: number): number {
  const restInMinutes = Math.random() * (max - min) + min;
  const restInSeconds = restInMinutes * 60;
  const restIn5s = Math.floor(restInSeconds / 5) * 5;
  return restIn5s;
}

//generates random whole number between the min & max inclusive
export function generateSets(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
