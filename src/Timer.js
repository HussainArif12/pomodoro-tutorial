import React, { useContext, useEffect, useState } from "react";
import Duration from "luxon/src/duration.js";
import { longBreakContext, breakContext, workContext } from "./Customizer.js";
import Button from "@material-ui/core/Button";
import LaptopChromebookOutlinedIcon from "@material-ui/icons/LaptopChromebook";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfast";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotel";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

function Timer() {
  const [timerLength, setTimerLength] = useState(25);
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(true);

  const [sessionType, setSessionType] = useState("Work");
  const [sessionNumber, setSessionNumber] = useState(0);

  const longBreakLength = useContext(longBreakContext);
  const breakLength = useContext(breakContext);
  const workLength = useContext(workContext);

  const minuteMultiplier = 1;
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
      setTimerLength(workLength * minuteMultiplier);
    }
  }, [sessionType, workLength]);
  useEffect(() => {
    if (sessionType === "Break") {
      setTimerLength(breakLength * minuteMultiplier);
    }
  }, [breakLength, sessionType]);

  useEffect(() => {
    if (sessionType === "Long Break") {
      setTimerLength(longBreakLength * minuteMultiplier);
    }
  }, [longBreakLength, sessionType]);

  useEffect(() => {
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
      <div className="flex flex-col">
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={timerOn ? <PauseIcon /> : <PlayArrowIcon />}
          onClick={() => setTimerOn(!timerOn)}
        >
          {timerOn ? "Pause" : "Run"}
        </Button>
        <p className="font-sans tracking-widest text-6xl text-primary">
          {Duration.fromObject({ seconds: timerLength }).toFormat("mm:ss")}
        </p>
        <p className="text-sessionNumber text-2xl">
          Session Number: {sessionNumber}
        </p>
        <div>
          {sessionType === "Break" && (
            <FreeBreakfastOutlinedIcon style={{ color: "white" }} />
          )}
          {sessionType === "Work" && (
            <LaptopChromebookOutlinedIcon style={{ color: "white" }} />
          )}
          {sessionType === "Long Break" && (
            <LocalHotelOutlinedIcon style={{ color: "white" }} />
          )}
        </div>
      </div>
    </>
  );
}

export default Timer;
