import {
  generateSets,
  getExerciseCount,
  getRepRestTime,
  getSetRest,
  getSingleRepTime,
} from "./genHelperFuncs";

test("generates exercise count based on rep and rest time", () => {
  expect(getExerciseCount(10, 45, 15)).toBe(10);
});

test("generates random number between 55 and 30", () => {
  const singleRep = getSingleRepTime();
  expect(singleRep).toBeGreaterThanOrEqual(30);
  expect(singleRep).toBeLessThanOrEqual(55);
});

test("generates random number between 25 and 5", () => {
  const singleRepRest = getRepRestTime();
  expect(singleRepRest).toBeGreaterThanOrEqual(5);
  expect(singleRepRest).toBeLessThanOrEqual(25);
});

test("generates random multiple of 5 between a min and max inclusive", () => {
  const setRest = getSetRest(36, 72);
  expect(setRest).toBeGreaterThanOrEqual(36);
  expect(setRest).toBeLessThanOrEqual(72);
  expect(setRest % 5).toBe(0);
});

test("generates random whole number between the min & max inclusive", () => {
  const sets = generateSets(3, 5);
  expect(sets).toBeGreaterThanOrEqual(3);
  expect(sets).toBeLessThanOrEqual(5);
});
