import { generateWorkout } from "./generator";

describe("generates a valid workout object", () => {
  test("input 30", () => {
    const workout = generateWorkout("30");
    expect(parseInt(workout.workoutLength)).toBe(
      ((workout.exerciseCount * (workout.rep_time + workout.rep_rest) +
        workout.set_rest) /
        60) *
        workout.sets
    );
    expect(workout.setWithoutRest).toBe(
      workout.exerciseCount * (workout.rep_time + workout.rep_rest)
    );
    expect(workout.set_rest).toBeGreaterThanOrEqual(0);
    expect(workout.rep_time).toBeGreaterThan(0);
    expect(workout.rep_rest).toBeGreaterThanOrEqual(0);
    expect(workout.exerciseCount).toBeGreaterThan(0);
  });

  test("input 10", () => {
    const workout = generateWorkout("10");
    expect(parseInt(workout.workoutLength)).toBe(
      ((workout.exerciseCount * (workout.rep_time + workout.rep_rest) +
        workout.set_rest) /
        60) *
        workout.sets
    );
    expect(workout.setWithoutRest).toBe(
      workout.exerciseCount * (workout.rep_time + workout.rep_rest)
    );
    expect(workout.set_rest).toBeGreaterThanOrEqual(0);
    expect(workout.rep_time).toBeGreaterThan(0);
    expect(workout.rep_rest).toBeGreaterThanOrEqual(0);
    expect(workout.exerciseCount).toBeGreaterThan(0);
  });
});
