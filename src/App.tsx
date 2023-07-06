//import { greet } from "./utils/greet";
import React from "react";
import { useState } from "react";
import generateWorkout from "./generator";
import "./styles.css";

type workoutFormat = (string|number)[]

function App(): JSX.Element {
  const [workoutValueFromCurrentRender,queueRerenderNewWorkoutValue] = useState<workoutFormat>(generateWorkout);
  function onClick() {
    queueRerenderNewWorkoutValue(generateWorkout)
}
  return (
<html lang="en">
  <head>
    <title>My Workout Generator</title>
    <link rel="stylesheet" href="styles.css"></link>
    <link rel="preconnect" href="https://fonts.googleapis.com"></link>
    <link rel="preconnect" href="https://fonts.gstatic.com"></link>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;500;700&display=swap" rel="stylesheet"></link>
  </head>
  <body className = "body">
    <header>
      <h1>🚴🤸‍♀️   Workout Generator   🏋️🏃‍♀️</h1>
    </header>
    <main>
      <section className = "question">
        <h3>how much time do you have for a workout?</h3>
        <input className="input" type="text" placeholder="minutes"></input>
        <button className="button" onClick={onClick}>generate workout</button>
      </section>
      <section>
      <h2>Your Workout</h2>
      <p className = "workout"> 30 minute Workout 
        <ul className="generatedOutput">
          <li>{workoutValueFromCurrentRender[0]} sets with {workoutValueFromCurrentRender[3]} exercises </li>
          <li>{workoutValueFromCurrentRender[1]} work with {workoutValueFromCurrentRender[2]} rest </li>
          <li className = "preExercises">{workoutValueFromCurrentRender[4]} s per exercise, {workoutValueFromCurrentRender[5]} s rest </li>
          {workoutValueFromCurrentRender.slice(6,workoutValueFromCurrentRender.length).map((x,index)=><li key={workoutValueFromCurrentRender[index]}>{x}</li>)}
        </ul>
        </p>
      </section>
      <section className = "savedWorkout">
        <h3>Saved Workouts</h3>
        <ul className="navwrap">
          <li>⭐ <a href="google.com">HiiTs</a></li>
          <li>🏋️‍♀️ <a href="google.com">Strength</a></li>
          <li>🏃‍♀️ <a href="google.com">Sprint Sessions </a></li>
          <li>🚣🏻‍♀️ <a href="google.com">Erg Workouts </a></li>
        </ul>
      </section>
    </main>
  </body>
</html>
)}

export default App;

/*function sayHello() {
  alert('You clicked me!');
}*/