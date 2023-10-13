import {
  getExerciseCount,
  getSingleRepTime,
  generateSets,
  getRepRestTime,
  getSetRest,
} from "./genHelperFuncs";

test("divides overall rep time by rep + rest time to generate the number of exercises per set", () => {
  expect(getExerciseCount(10, 45, 15)).toBe(10);
  expect(getExerciseCount(8, 20, 10)).toBe(16);
});

test("generates random number between 55 and 30 to exercise", () => {
  expect(getSingleRepTime()).toBeGreaterThanOrEqual(30);
  expect(getSingleRepTime()).toBeLessThanOrEqual(55);
});

test("generates random number between 25 and 5 for rest", () => {
  expect(getRepRestTime()).toBeGreaterThanOrEqual(5);
  expect(getRepRestTime()).toBeLessThanOrEqual(25);
});

test("gets random multiple of 5 between a min and max inclusive", () => {
  expect(getSetRest(1, 5)).toBeGreaterThanOrEqual(60);
  expect(getSetRest(1, 5)).toBeLessThanOrEqual(300);
});

test("generates random whole number between the min & max inclusive", () => {
  expect(generateSets(1, 5)).toBeGreaterThanOrEqual(1);
  expect(generateSets(1, 5)).toBeLessThanOrEqual(5);
});
