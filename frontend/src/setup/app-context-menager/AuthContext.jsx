import React, { createContext, useEffect, useState } from "react";
import { useUser } from "../auth/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
  const [arrayId, setArrayId] = useState([]);
  const { user } = useAuth0();
  const { getUserData } = useUser();
  // const [contextUser, setContextUser] = useState({});

  const { data: userData } = useQuery(
    ["context-user", user?.email],
    getUserData,
    {
      enabled: !!user,
    }
  );

  useEffect(() => {
    console.log(userData, "Context Data");
  }, [userData]);

  const value = {
    arrayId,
    userData,
    // collections,
    setArrayId,
    // userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
