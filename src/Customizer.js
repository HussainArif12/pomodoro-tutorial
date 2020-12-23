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
      <workContext.Provider value={workLength}>
        <breakContext.Provider value={breakLength}>
          <longBreakContext.Provider value={longBreakLength}>
            {props.children}
          </longBreakContext.Provider>
        </breakContext.Provider>
      </workContext.Provider>
    </>
  );
}
export default Customizer;
