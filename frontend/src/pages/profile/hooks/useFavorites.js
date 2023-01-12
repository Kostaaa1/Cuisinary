import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../../../setup/auth/useAuth";
import { useState } from "react";

export const useFavorites = () => {
    const { user } = useAuth0();
    // const { data, isLoading, isSuccess, refetch, isFetched, isFetching } =
    //     useQuery(["favorite"], async () => {
    //         return axios
    //             .get(`/api/auth/${user?.email}`)
    //             .then((res) => res.data.collections[0].collRecipes);
    //     });
    const { currentUser } = useAuth();
    const [layoutData, setLayoutData] = useState([]);

    useEffect(() => {
        if (currentUser) {
            setLayoutData(currentUser.collections[0].collRecipes);
        }
    }, [currentUser]);

    // const length = data?.length;

    const refetchOnLoad = () => {
        useEffect(() => {
            refetch();
        }, []);
    };

    return {
        layoutData,
        // data,
        // isLoading,
        // isSuccess,
        // refetchOnLoad,
        // length,
    };
};
