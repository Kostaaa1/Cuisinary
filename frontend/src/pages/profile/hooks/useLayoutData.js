import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../../setup/auth/useAuth";
import { useFavorites } from "./useFavorites";

export const useLayoutData = () => {
    const [mockData, setMockData] = useState([
        {
            data: {
                image: "/src/assets/images/gray-background.jpg",
            },
        },
        {
            data: {
                image: "/src/assets/images/gray-background.jpg",
            },
        },
        {
            data: {
                image: "/src/assets/images/gray-background.jpg",
            },
        },
        {
            data: {
                image: "/src/assets/images/gray-background.jpg",
            },
        },
    ]);

    const [layoutData, setLayoutData] = useState(null);
    const { currentUser, setCurrentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            setLayoutData(currentUser.collections[0].collRecipes);
        }
    }, [currentUser]);

    const destructuredArray = layoutData?.map((x) => ({
        data: { image: x.recipe?.image },
    }));

    const length = destructuredArray?.length;

    const arr = mockData.map((fav, i) =>
        destructuredArray?.[i] ? destructuredArray[i] : fav
    );

    return {
        arr,
        length,
        layoutData,
    };
};
