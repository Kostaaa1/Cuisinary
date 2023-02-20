import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../app-context-menager/AuthContext";

export const useAuth = () => {
    const { user, isAuthenticated, getAccessTokenSilently, logout, isLoading } =
        useAuth0();
    const [currentUser, setCurrentUser] = useState();
    const { userData, setUserData } = useContext(AuthContext);
    const [authenticated, setAuthenticated] = useState(
        JSON.parse(localStorage.getItem("validation")) || false
    );

    useEffect(() => {
        const item = localStorage.getItem("validation");

        if (!item && isAuthenticated) {
            localStorage.setItem("validation", true);
            setAuthenticated(true);
        }
    });

    const userLogout = () => {
        localStorage.clear();
        logout();
    };

    useEffect(() => {
        getUser();
    }, [user]);

    const getUser = async () => {
        try {
            if (user) {
                const res = await fetch(`/api/auth/${user?.email}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${await getAccessTokenSilently()}`,
                    },
                });
                const data = await res.json();

                if (!data) {
                    addNewUser();
                }

                setCurrentUser(data);
                setUserData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addNewUser = async () => {
        try {
            const mockUser = {
                nickname: user?.nickname,
                email: user?.email,
                name: user?.name,
                firstName: "",
                lastName: "",
                birthDate: { month: "", day: "", year: "" },
                zipCode: "",
                picture: {
                    fileName: "",
                    fileType: "",
                    fileSize: "",
                    image: "",
                    cloudinaryId: "",
                },
                collections: [
                    {
                        collName: "All saved items",
                        collDesc: "",
                        private: false,
                        collRecipes: [],
                    },
                ],
            };
            const newUser = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: mockUser,
                    email: user?.email,
                }),
            });

            const data = await newUser.json();

            setCurrentUser(data);
            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    };

    return { userLogout, authenticated, currentUser };
};
