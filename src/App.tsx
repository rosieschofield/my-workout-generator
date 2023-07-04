//import { greet } from "./utils/greet";
import React from "react";
import { useState } from "react";
import generateWorkout from "./generator";
import "./styles.css";

function App(): JSX.Element {
  const [workoutValueFromCurrentRender,queueRerenderNewWorkoutValue] = useState(generateWorkout)
  function onClick() {
    queueRerenderNewWorkoutValue(generateWorkout)
}
  return (
<html lang="en">
  <head>
    <title>My Workout Generator</title>
    <link rel="stylesheet" href="styles.css"></link>
  </head>
  <body className = "body">
    <header>
      <h1>My Workout Generator</h1>
    </header>
    <main>
      <section className = "question">
        <h3>how much time do you have for a workout?</h3>
        <input className="input" type="text" placeholder="minutes"></input>
        <button className="button" onClick={onClick}>generate workout</button>
      </section>
      <section>
      <h2>Your Workout</h2>
      <p className = "workout">{workoutValueFromCurrentRender}</p>
        <h3>Saved Workouts</h3>
        <ul>
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