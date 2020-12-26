import React, { createContext, useState } from "react";
import Button from "@material-ui/core/Button";

export const breakContext = createContext();
export const workContext = createContext();
export const longBreakContext = createContext();

function Customizer(props) {
  const [breakLength, setBreakLength] = useState(5);
  const [workLength, setWorkLength] = useState(25);
  const [longBreakLength, setLongBreakLength] = useState(15);

  return (
    <>
      <workContext.Provider value={workLength}>
        <breakContext.Provider value={breakLength}>
          <longBreakContext.Provider value={longBreakLength}>
            {props.children}
          </longBreakContext.Provider>
        </breakContext.Provider>
      </workContext.Provider>
      <p>{breakLength}</p>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        onClick={() =>
          setBreakLength((prevLength) =>
            prevLength === 0 ? 0 : prevLength - 1
          )
        }
      >
        Decrement Break Length
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => setBreakLength(breakLength + 1)}
      >
        Increment Break Length
      </Button>
      <p>{workLength}</p>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        onClick={() =>
          setWorkLength((prevLength) => (prevLength === 0 ? 0 : prevLength - 1))
        }
      >
        Decrement Work Length
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => setWorkLength(workLength + 1)}
      >
        Increment Work Length
      </Button>
      <p>{longBreakLength}</p>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        onClick={() =>
          setLongBreakLength((prevLength) =>
            prevLength === 0 ? 0 : prevLength - 1
          )
        }
      >
        Decrement Long Break Length
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        onClick={() => setLongBreakLength(longBreakLength + 1)}
      >
        Increment Long Break Length
      </Button>
    </>
  );
}
export default Customizer;
