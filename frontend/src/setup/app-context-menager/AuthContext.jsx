import React, { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useAuth } from "../auth/useAuth";

export const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
    const [arrayId, setArrayId] = useState([]);
    const { loading, getUser, currentUser, setCurrentUser } = useAuth();
    const [userData, setUserData] = useState();
    const { logout, getAccessTokenSilently, user, isAuthenticated } =
        useAuth0();

    const value = {
        arrayId,
        setArrayId,
        loading,
        userData,
        setUserData,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
