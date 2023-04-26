import React, { createContext, useEffect, useState } from "react";
import { useUser } from "../auth/useAuth";
import { useAuth } from "../auth/useAuth";

export const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
  const [arrayId, setArrayId] = useState([]);
  const { userData, collections } = useUser();
  const { useUpdateUserCache } = useAuth();
  const [contextUser, setContextUser] = useState({});

  useEffect(() => {
    if (!!userData) {
      setContextUser(userData);
    }
  }, [userData]);

  const value = {
    arrayId,
    contextUser,
    collections,
    setArrayId,
    userData,
    useUpdateUserCache,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
