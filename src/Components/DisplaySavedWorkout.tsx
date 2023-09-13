import { Button, Card, CardBody, Text } from "@chakra-ui/react";
import { fetchedCompleteSavedWorkout } from "../Types/Types";
import { DisplaySavedExercise } from "./DisplaySavedExercise";
import axios from "axios";
import { baseUrl } from "../Utils/baseUrl";

interface DisplaySavedWorkoutProps {
  savedWorkout: fetchedCompleteSavedWorkout;
  setCounter: (value: React.SetStateAction<number>) => void;
}

export function DisplaySavedWorkout({
  savedWorkout,
  setCounter,
}: DisplaySavedWorkoutProps): JSX.Element {
  async function handleDeleteWorkout(id: number) {
    await axios.delete(baseUrl + `/savedworkouts/${id}`);
    setCounter((prevCounter) => prevCounter - 1);
  }

  return (
    <Card
      style={{
        backgroundColor: "lightblue",
        borderRadius: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardBody>
        <Text> {savedWorkout.title} </Text>
        <Text>
          {savedWorkout.sets} sets, {savedWorkout.rep_time}s reps with{" "}
          {savedWorkout.rep_rest}s rest and {savedWorkout.set_rest}s rest
          between sets, {savedWorkout.exercises.length} exercises,{" "}
          {savedWorkout.exercises.map((exercise, index) => (
            <DisplaySavedExercise key={index} exercise={exercise} />
          ))}
        </Text>
        <Button onClick={() => handleDeleteWorkout(savedWorkout.workout_id)}>
          {" "}
          unsave{" "}
        </Button>{" "}
      </CardBody>
    </Card>
  );
}
