import {
  Alert,
  AlertIcon,
  Button,
  CloseButton,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DisplaySavedWorkout } from "./Components/DisplaySavedWorkout";
import { DisplayWorkout } from "./Components/DisplayWorkout";
import {
  GeneratedWorkout,
  fetchedCompleteSavedWorkout,
  fetchedSavedWorkoutExercises,
  savedAlertType,
} from "./Types/Types";
import { baseUrl } from "./Utils/baseUrl";
import { mergeExercicesWithSavedWorkouts } from "./Utils/formatImports";
import { generateWorkout } from "./Utils/generator";
import "./styles.css";

function App(): JSX.Element {
  const [workout, setWorkout] = useState<GeneratedWorkout>();
  const [input, setInput] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [savedWorkouts, setSavedWorkouts] =
    useState<fetchedCompleteSavedWorkout[]>();
  const [counter, setCounter] = useState(0);
  const [workoutTitle, setWorkoutTitle] = useState<string>();
  const [savedAlert, setSavedAlert] = useState<savedAlertType>(false);
  const [invalidInputAlert, setInvalidInputAlert] = useState<boolean>(false);

  async function onGetNewClick() {
    if (parseInt(input) < 10) {
      setInvalidInputAlert(true);
    } else {
      setInvalidInputAlert(false);
      const newWorkout = generateWorkout(input);
      let randomExercises;
      do {randomExercises = await fetchRandExercises(newWorkout.exerciseCount);
      } while (randomExercises.length !== newWorkout.exerciseCount)
      newWorkout.exercises = randomExercises;
      setWorkout(newWorkout);
      setDisplay(true);
    }
  }

  async function fetchRandExercises(exerciseCount: number) {
    const res = await axios.get(baseUrl + `/exercises/${exerciseCount}`);
    const randExercises = await res.data;
    return randExercises;
  }

  async function fetchSavedWorkouts() {
    const firstRes = await axios.get(baseUrl + "/savedworkouts/metadata");
    const savedWorkoutMetadataArray: fetchedCompleteSavedWorkout[] =
      await firstRes.data;
    const secondRes = await axios.get(baseUrl + "/savedworkouts/exercises");
    const savedWorkoutExercisesArray: fetchedSavedWorkoutExercises[] =
      await secondRes.data;
    const completeSavedWorkoutArray = mergeExercicesWithSavedWorkouts(
      savedWorkoutMetadataArray,
      savedWorkoutExercisesArray
    );
    setSavedWorkouts(completeSavedWorkoutArray);
  }

  useEffect(() => {
    fetchSavedWorkouts();
  }, [counter]);

  async function handleSaveWorkout() {
    if (workout === undefined) {
      return "error";
    }
    const formattedWorkout = { title: workoutTitle, ...workout };
    try {
      await axios.post(baseUrl + "/saveworkout", formattedWorkout);
      setSavedAlert("success");
      setCounter((prevCounter) => prevCounter + 1);
    } catch (error) {
      setSavedAlert("error");
    }
  }

  function onCloseSavedAlert() {
    setSavedAlert(false);
  }
  function onCloseInputAlert() {
    setInvalidInputAlert(false);
  }

  return (
    <div className="body">
      <header>
        <h1>WORKOUT GENERATOR</h1>
      </header>
      <main>
        <section className="question">
          <h2>how much time do you have to workout? (must be 10+ mins) </h2>
          <input
            value={input}
            onChange={(event) => {
              setDisplay(false);
              setInput(event.target.value);
            }}
            className="input"
            type="text"
            placeholder="mins"
          ></input>
          <Button className="button" onClick={onGetNewClick}>
            GET NEW
          </Button>
        </section>
        {invalidInputAlert ? (
          <Alert
            status="error"
            alignItems="center"
            justifyContent="center"
            maxW={400}
            m="auto"
            textAlign="center"
          >
            <AlertIcon />
            Workout must be atleast 10 minutes !
            <CloseButton
              alignSelf="flex-end"
              position="relative"
              right={-2}
              top={-0.5}
              size="sm"
              onClick={onCloseInputAlert}
            />
          </Alert>
        ) : (
          ""
        )}
        <section>
          {" "}
          {!display || workout === undefined ? (
            <p className="empty"></p>
          ) : (
            <div>
              <DisplayWorkout
                workoutLength={workout.workoutLength}
                sets={workout.sets}
                setWithoutRest={workout.setWithoutRest}
                set_rest={workout.set_rest}
                rep_time={workout.rep_time}
                rep_rest={workout.rep_rest}
                exerciseCount={workout.exerciseCount}
                exercises={workout.exercises}
              />
              <input
                value={workoutTitle}
                onChange={(event) => {
                  setWorkoutTitle(event.target.value);
                }}
                className="inputTitle"
                type="text"
                placeholder="Give the Workout a Title"
              ></input>
              <Button onClick={handleSaveWorkout}> SAVE </Button>
              {savedAlert ? (
                <Alert
                  status={savedAlert}
                  alignItems="center"
                  justifyContent="center"
                  maxW={400}
                  m="auto"
                  textAlign="center"
                >
                  <AlertIcon />
                  {savedAlert === "success"
                    ? "Workout Saved"
                    : "Error Saving Workout"}
                  <CloseButton
                    alignSelf="flex-end"
                    position="relative"
                    right={-20}
                    top={-0.5}
                    size="sm"
                    onClick={onCloseSavedAlert}
                  />
                </Alert>
              ) : (
                ""
              )}
            </div>
          )}
        </section>
        <section>
          <h3>Saved Workouts</h3>
          {savedWorkouts !== undefined && (
            <SimpleGrid
              minChildWidth="250px"
              spacing="30px"
              ml={10}
              mr={10}
              pb={10}
            >
              {savedWorkouts.map((savedWorkout, index) => (
                <DisplaySavedWorkout
                  key={index}
                  savedWorkout={savedWorkout}
                  setCounter={(counter) => setCounter(counter)}
                />
              ))}
            </SimpleGrid>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
