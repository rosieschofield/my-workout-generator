//import { greet } from "./utils/greet";
import React from "react";
import generateWorkout from "./generator";
import "./styles.css";

function App(): JSX.Element {
  /*const [newWorkout,setNewWorkout] = React.useState(30)
  function onClick() {
    setNewWorkout(generateWorkout)
}*/
  return (
<html lang="en">
  <head>
    <title>My Workout Generator</title>
  </head>
  <body>
    <header>
      <h1>My Workout Generator</h1>
    </header>
    <main>
      <section>
        <h2>how much time do you have for a workout?</h2>
        <input type="text" placeholder="minutes"></input>
        <button /*onClick={onClick}*/>generate workout</button>;
      </section>
      <section>
      <h3>Your Workout</h3>
      <p className = "workout">{generateWorkout(30)}</p>
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