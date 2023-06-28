function generateWorkout(workoutLength:number) :string {
    const numberOfSets = generateSets(3, 5);
    const setLength = workoutLength/numberOfSets
    const setRest = getSetRest(0.75,2)
    const setRepTime = (setLength - (setRest/60))
    const noOfExercises = getExerciseCountSentence(setRepTime)
    const exerciseCount = getExerciseCount(setRepTime);
    return workoutLength + ' minute workout '+ numberOfSets + ' sets with '+ convertDecimaltoTime(setRepTime)+ ' and '+ convertsSecondstoMixed(setRest) + ' rest, ' + noOfExercises + ': '+ generateExercises(exerciseCount);
  }

  function getExerciseCount(repTime:number) :number {
    const exerciseTime = Math.round((Math.random() * (55 - 30) + 30)/5)*5;
    const restTime = Math.round((Math.random() * (25 - 5) + 5)/5)*5;
    const eachRep = exerciseTime+restTime
    const repTimeSeconds = repTime*60
    const exerciseCount = Math.round(repTimeSeconds/eachRep)
    return exerciseCount;
  }

  function getExerciseCountSentence(repTime:number) :string {
    const exerciseTime = Math.round((Math.random() * (55 - 30) + 30)/5)*5;
    const restTime = Math.round((Math.random() * (25 - 5) + 5)/5)*5;
    const eachRep = exerciseTime+restTime
    const repTimeSeconds = repTime*60
    const exerciseCount = Math.round(repTimeSeconds/eachRep)
    return exerciseCount + ' exercises, '+exerciseTime+ ' seconds per exercise with '+restTime+' seconds rest';
  }

  function convertDecimaltoTime(decimal:number):string{
    const minutes = Math.floor(decimal);
    const seconds = (decimal-minutes)*60;
    const secondsInFives = Math.round(seconds/5)*5;
    return minutes +'m '+secondsInFives+'s';
  }

  function convertsSecondstoMixed(seconds:number):string{
    if (seconds<60){
      return seconds +' s';
    } else {
      return convertDecimaltoTime(seconds/60);
    }
  }
  
  
  function getSetRest(min:number, max:number):number {
    const restInMinutes = (Math.random() * (max - min) + min);
    const restInSeconds = (restInMinutes*60)
    const restIn5s = Math.round(restInSeconds/5)*5
    return restIn5s;
  }
  
  function generateSets(min:number, max:number) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  
  const fastExercises:string[] = ["starjumps", "burpees", "tuck jumps", "box jumps"];
  const legExercises:string[] = ["squats", "lunges", "split squats", "romanian deadlift"]
  const armExercises:string[] = ["press-up", "shoulder press", "tricep dips", "tricep extension"]
  const coreExercises:string[] = ["plank", "v-sits", "ball-throw"]
  
  function randomArrayItem(wordList:string[]): string {
    const randomIndex = Math.floor(Math.random()*wordList.length);
    return wordList[randomIndex];
  }

  function generateExercises(noOfExercises:number):string[]{
    const newWorkout:string[] = [];
    let exercisesAdded = 0;
    while (exercisesAdded<noOfExercises){
      const randNum = Math.floor(Math.random()*4);
      let newItem:string;
      if (randNum ===1){
        newItem = randomArrayItem(fastExercises);
      } else if (randNum ===2) {
        newItem = randomArrayItem(legExercises);
      } else if (randNum ===3) {
        newItem = randomArrayItem(armExercises);
      } else {
        newItem = randomArrayItem(coreExercises);
      }
      newWorkout.forEach((element) => {
        if (element === newItem){
          newItem = "double";
        }});
      if (newItem!=="double"){
        newWorkout.push(newItem);
        exercisesAdded++;
      }
    }
    return newWorkout;
  }