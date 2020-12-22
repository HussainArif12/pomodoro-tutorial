import React, { useEffect, useState } from "react";
import Duration from "luxon/src/duration.js";

function Timer() {
  const [timerLength, setTimerLength] = useState(10);
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  const [sessionType, setSessionType] = useState("Work");
  const [sessionNumber, setSessionNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        setTimerLength((timerLength) => timerLength - 1);
      }
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  useEffect(() => {
    if (timerLength === 0) {
      setTimerOn(false);
      setTimerDone(false);
    }
  }, [timerLength]);
  return (
    <>
      <p>
        Duration:{" "}
        {Duration.fromObject({ seconds: timerLength }).toFormat("mm:ss")}
      </p>
      <button onClick={() => setTimerOn(!timerOn)}>
        {timerOn ? "Pause" : "Run"}
      </button>
      <p>{timerDone ? "Timer is completed" : "Timer running"}</p>
      <p>{sessionType}</p>
      <p>Session Number: {sessionNumber}</p>
    </>
  );
}

export default Timer;
