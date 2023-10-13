import { capitalise } from "./capitalise";

test("should capitalise the first letter in every word in an input string", () => {
  const input = "hello world, how are you?";
  const expectedOutput = "Hello World, How Are You?";
  const result = capitalise(input);
  expect(result).toEqual(expectedOutput);
});
