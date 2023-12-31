import {
  convertDecimaltoTime,
  convertSecondstoMixed,
} from "./displayTimeValues";

test("converts decimal input to minutes and seconds and a multiple of 5", () => {
  expect(convertDecimaltoTime(1.5)).toBe("1m 30s");
  expect(convertDecimaltoTime(1.25)).toBe("1m 15s");
  expect(convertDecimaltoTime(1.6)).toBe("1m 35s");
  expect(convertDecimaltoTime(2)).toBe("2m");
});

test("converts input to seconds string or minutes and seconds string", () => {
  expect(convertSecondstoMixed(45)).toBe("45s");
  expect(convertSecondstoMixed(60)).toBe("1m");
  expect(convertSecondstoMixed(75)).toBe("1m 15s");
});
