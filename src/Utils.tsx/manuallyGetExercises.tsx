export {};
/*
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
  
  //manually generates an array of unique exercises of the input length
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
  */
