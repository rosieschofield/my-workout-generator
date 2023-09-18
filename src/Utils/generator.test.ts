import { generateWorkout } from "./generator";

test("generates workout with positive values", () => {
  expect(generateWorkout("30").set_rest).toBeGreaterThanOrEqual(0);
  expect(generateWorkout("20").set_rest).toBeGreaterThanOrEqual(0);
  expect(generateWorkout("10").set_rest).toBeGreaterThanOrEqual(0);
  expect(generateWorkout("10").set_rest).toBeGreaterThanOrEqual(0);
  expect(generateWorkout("10").set_rest).toBeGreaterThanOrEqual(0);
  expect(generateWorkout("10").set_rest).toBeGreaterThanOrEqual(0);
});

test("generates workout with values that add up", () => {
  const {
    workoutLength,
    sets,
    setWithoutRest,
    set_rest,
    rep_time,
    rep_rest,
    exerciseCount,
  } = generateWorkout("30");
  expect((rep_time + rep_rest) * exerciseCount).toBe(setWithoutRest);
  expect(((rep_time + rep_rest) * exerciseCount + set_rest) * sets).toBe(
    workoutLength
  );
});
