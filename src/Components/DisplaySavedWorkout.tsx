import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import { fetchedCompleteSavedWorkout } from "../Types/Types";
import { DisplaySavedExercise } from "./DisplaySavedExercise";
import axios from "axios";
import { baseUrl } from "../Utils/baseUrl";
import { capitalise } from "../Utils/capitalise";

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
      <CardHeader>
        <Heading size="md">{capitalise(savedWorkout.title)}</Heading>
      </CardHeader>
      <Divider maxW="70%" mx="auto" />
      <CardBody>
        <Text>
          {savedWorkout.sets} sets, {savedWorkout.rep_time}s reps with{" "}
          {savedWorkout.rep_rest}s rest and {savedWorkout.set_rest}s rest
          between sets, {savedWorkout.exercises.length} exercises:{" "}
          <ul className="savedExercises">
            {savedWorkout.exercises.map((exercise, index) => (
              <DisplaySavedExercise key={index} exercise={exercise} />
            ))}
          </ul>
        </Text>
        <Button onClick={() => handleDeleteWorkout(savedWorkout.workout_id)}>
          {" "}
          unsave{" "}
        </Button>{" "}
      </CardBody>
    </Card>
  );
}
