export function capitalise(inputString: string) {
  let currentInd = 0;
  let newString =
    inputString.charAt(currentInd).toUpperCase() + inputString.slice(1);
  let nextWhiteSpace = newString.indexOf(" ", currentInd);
  while (nextWhiteSpace !== -1) {
    newString =
      newString.slice(0, nextWhiteSpace + 1) +
      newString.charAt(nextWhiteSpace + 1).toUpperCase() +
      newString.slice(nextWhiteSpace + 2);
    currentInd = nextWhiteSpace += 1;
    nextWhiteSpace = newString.indexOf(" ", currentInd);
  }
  return newString;
}
