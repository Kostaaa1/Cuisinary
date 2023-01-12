import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../app-context-menager/AuthContext";

export const useAuth = () => {
    const { user, isAuthenticated, getAccessTokenSilently, logout, isLoading } =
        useAuth0();
    // const valid = JSON.parse(localStorage.getItem("validation"));
    const [currentUser, setCurrentUser] = useState();
    const [authenticated, setAuthenticated] = useState(
        JSON.parse(localStorage.getItem("validation"))
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
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addNewUser = async () => {
        const mockUser = {
            nickname: user?.nickname,
            email: user?.email,
            name: user?.name,
            picture:
                "https://st3.depositphotos.com/4326917/12573/v/450/depositphotos_125734036-stock-illustration-user-sign-illustration-white-icon.jpg",
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
    };

    return { userLogout, authenticated, currentUser };
};
