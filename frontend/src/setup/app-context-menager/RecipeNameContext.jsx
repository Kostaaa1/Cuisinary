import React, { createContext, useEffect, useState, useRef } from "react";

export const RecipeNames = createContext(null);

export const RecipeNamesProvider = ({ children }) => {
  const [arrayOfRecipeNames, setArrayOfRecipeNames] = useState([]);
  const [collectionId, setCollectionId] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef]);

  const value = {
    arrayOfRecipeNames,
    setArrayOfRecipeNames,
    collectionId,
    setCollectionId,
    showSearch,
    setShowSearch,
    searchBarRef,
  };

  return <RecipeNames.Provider value={value}>{children}</RecipeNames.Provider>;
};

export default RecipeNames;
