//converts decimal input to minutes and seconds in multiple of 5
export function convertDecimaltoTime(decimal: number): string {
  const minutes = Math.floor(decimal);
  const seconds = (decimal - minutes) * 60;
  const secondsInFives = Math.round(seconds / 5) * 5;
  if (secondsInFives <= 0) {
    return minutes + "m";
  }
  return minutes + "m " + secondsInFives + "s";
}

//converts input to seconds string or minutes and seconds string
export function convertSecondstoMixed(seconds: number): string {
  if (seconds === 0) {
    return "no";
  } else if (seconds < 60) {
    return seconds + "s";
  } else {
    return convertDecimaltoTime(seconds / 60);
  }
}
