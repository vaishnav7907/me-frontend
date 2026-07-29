import React, { createContext, useContext, useState } from "react";
const MeContext = createContext();
 export const MeProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <MeContext.Provider
      value={{
        sidebar,
        setSidebar,
      }}
    >
      {children}
    </MeContext.Provider>
  );
};



export const UseMe = () => useContext(MeContext);
