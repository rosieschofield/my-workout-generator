import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";

//when called needs to start timer based on external setCount state props
//when count reaches 0 clear interval

export function Timer() {
  const [count, setCount] = useState(10);
  const [text, setText] = useState("Let's Go");
  const [delay, setDelay] = useState<number | null>(1000);
  const savedCallback: MutableRefObject<() => void> = useRef(callback);

  function callback() {
    if (count === 0) {
      setText("Time's Up");
    } else {
      setCount(count - 1);
    }
  }

  const handlePause = () => {
    setDelay(null);
  };

  const handleResume = () => {
    setDelay(1000);
  };

  const handleRestart = () => {
    setCount(10);
    delay === null && setDelay(1000);
  };

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  return (
    <>
      <h1>{count}</h1>
      <h1>{text}</h1>
      <Button onClick={handlePause}>pause</Button>
      <Button onClick={handleResume}>resume</Button>
      <Button onClick={handleRestart}>restart</Button>
    </>
  );
}
