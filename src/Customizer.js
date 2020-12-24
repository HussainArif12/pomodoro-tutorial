import React, { createContext, useState } from "react";

export const breakContext = createContext();
export const workContext = createContext();
export const longBreakContext = createContext();

function Customizer(props) {
  const [breakLength, setBreakLength] = useState(5);
  const [workLength, setWorkLength] = useState(25);
  const [longBreakLength, setLongBreakLength] = useState(15);

  return (
    <>
      <p>{breakLength}</p>
      <button
        onClick={() =>
          setBreakLength((prevLength) =>
            prevLength === 0 ? 0 : prevLength - 1
          )
        }
      >
        Decrement Break Length
      </button>
      <button onClick={() => setBreakLength(breakLength + 1)}>
        Increment Break Length
      </button>
      <p>{workLength}</p>
      <button
        onClick={() =>
          setWorkLength((prevLength) => (prevLength === 0 ? 0 : prevLength - 1))
        }
      >
        Decrement Work Length
      </button>
      <button onClick={() => setWorkLength(workLength + 1)}>
        Increment Work Length
      </button>
      <p>{longBreakLength}</p>
      <button
        onClick={() =>
          setLongBreakLength((prevLength) =>
            prevLength === 0 ? 0 : prevLength - 1
          )
        }
      >
        Decrement Long Break Length
      </button>
      <button onClick={() => setLongBreakLength(longBreakLength + 1)}>
        Increment Long Break Length
      </button>

      {
        <workContext.Provider value={workLength}>
          <breakContext.Provider value={breakLength}>
            <longBreakContext.Provider value={longBreakLength}>
              {props.children}
            </longBreakContext.Provider>
          </breakContext.Provider>
        </workContext.Provider>
      }
    </>
  );
}
export default Customizer;
