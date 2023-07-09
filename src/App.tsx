//import { greet } from "./utils/greet";
import React from "react";
import { useState } from "react";
import generateWorkout from "./generator";
import "./styles.css";

type workoutFormat = JSX.Element;

function App(): JSX.Element {
  const [workoutValueFromCurrentRender, queueRerenderNewWorkoutValue] =
    useState<workoutFormat>(<p className="empty"></p>);
  const [input, setInput] = useState<string>("");
  //const [display, setDisplay]=useState<JSX.Element>()
  function onClick() {
    //queueRerenderNewWorkoutValue(generateWorkout(input))
    queueRerenderNewWorkoutValue(generateWorkout(input));
  }
  return (
    <html lang="en">
      <head>
        <title>My Workout Generator</title>
        <link rel="stylesheet" href="styles.css"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;500&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="body">
        <header>
          <h1>WORKOUT GENERATOR</h1>
        </header>
        <main>
          <section className="question">
            <h3>how much time do you have to workout?</h3>
            <input
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
              className="input"
              type="text"
              placeholder="minutes"
            ></input>
            <button className="button" onClick={onClick}>
              GO
            </button>
          </section>
          <section>
            <p className="workout">
              {" "}
              {input.length === 0 ? <p className="empty"></p> : workoutValueFromCurrentRender}
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}

export default App;

/*function sayHello() {
  alert('You clicked me!');
}*/
