import { useContext, useEffect } from "react";
import { useState } from "react";
import AuthContext from "../../../setup/app-context-menager/AuthContext";
import { useAuth } from "../../../setup/auth/useAuth";

export const useLayoutData = () => {
    const [mockData, setMockData] = useState([
        {
            data: {},
        },
        {
            data: {},
        },
        {
            data: {},
        },
        {
            data: {},
        },
    ]);
    const [layoutData, setLayoutData] = useState([]);
    const { currentUser } = useAuth();
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            setLayoutData(currentUser.collections);
        }
    }, [currentUser]);

    const destructuredArray = layoutData?.map((coll) =>
        coll.collRecipes.map((recipes) => ({
            data: { image: recipes?.recipe.image },
        }))
    );

    const layoutArr = destructuredArray?.map((el) =>
        mockData.map((mockEl, i) => (el[i] ? el[i] : mockEl))
    );

    return {
        layoutArr,
        length,
        destructuredArray,
        layoutData,
        setLayoutData,
    };
};
