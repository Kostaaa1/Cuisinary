import React, { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useAuth } from "../auth/useAuth";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [arrayId, setArrayId] = useState([]);
    const { loading, getUser, currentUser, setCurrentUser } = useAuth();
    const [userDataContext, setUserDataContext] = useState();
    const { logout, getAccessTokenSilently, user, isAuthenticated } =
        useAuth0();

    const value = {
        arrayId,
        setArrayId,
        loading,
        userDataContext,
        setUserDataContext,
    };

    // sending JWT on backend
    const validation = async () => {
        // try {
        //     let token = await getAccessTokenSilently();
        //     if (token) {
        //         axios
        //             .get("/api/validate", {
        //                 method: "GET",
        //                 headers: {
        //                     authorization: `Bearer ${token}`,
        //                 },
        //             })
        //             .then((res) => setValidated(res.data.valid));
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
