import React, { useContext, useEffect, useState } from "react";
import Duration from "luxon/src/duration.js";
import { longBreakContext, breakContext, workContext } from "./Customizer.js";

function Timer() {
  const [timerLength, setTimerLength] = useState(25);
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(true);

  const [sessionType, setSessionType] = useState("Work");
  const [sessionNumber, setSessionNumber] = useState(0);

  const longBreakLength = useContext(longBreakContext);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        setTimerLength((timerLength) => timerLength - 1);
      }
    }, 200);
    if (timerOn) {
      setTimerDone(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  useEffect(() => {
    if (timerLength === 0) {
      setTimerOn(false);
      setTimerDone(true);
      setSessionType((prevType) => {
        if (prevType === "Work") return "Break";
        if (prevType === "Break") return "Work";
        if (prevType === "Long Break") return "Work";
      });
    }
  }, [timerLength]);

  useEffect(() => {
    if (sessionType === "Work") {
      setTimerLength(25);
    }
    if (sessionType === "Break") {
      setTimerLength(5);
    }
    if (sessionType === "Long Break") {
      setTimerLength(15);
    }
    if (sessionType === "Work" && timerDone) {
      setSessionNumber((prevNumber) => prevNumber + 1);
    }
  }, [sessionType, timerDone]);

  useEffect(() => {
    if (sessionNumber > 4) {
      setSessionType("Long Break");
      setSessionNumber(0);
    }
  }, [sessionNumber]);
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
      <p>Long Break : {longBreakLength}</p>
    </>
  );
}

export default Timer;
