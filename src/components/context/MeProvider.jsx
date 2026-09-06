import React, { createContext, useContext, useState } from "react";
const MeContext = createContext();
export const MeProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  return (
    <MeContext.Provider
      value={{
        sidebar,
        setSidebar,
        FullName,
        setFullName,
        Email,
        setEmail,
        Password,
        setPassword,
      }}
    >
      {children}
    </MeContext.Provider>
  );
};

export const UseMe = () => useContext(MeContext);
