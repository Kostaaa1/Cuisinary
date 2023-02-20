import React, { createContext, useState } from "react";

export const RecipeNames = createContext(null);

export const RecipeNamesProvider = ({ children }) => {
    const [arrayOfRecipeNames, setArrayOfRecipeNames] = useState([]);
    const [collectionId, setCollectionId] = useState("");

    const value = {
        arrayOfRecipeNames,
        setArrayOfRecipeNames,
        collectionId,
        setCollectionId,
    };

    return (
        <RecipeNames.Provider value={value}>{children}</RecipeNames.Provider>
    );
};

export default RecipeNames;
