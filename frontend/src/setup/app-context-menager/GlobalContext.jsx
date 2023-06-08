import React, { createContext, useEffect, useState, useRef } from "react";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [arrayOfRecipeNames, setArrayOfRecipeNames] = useState([]);
  const [collectionId, setCollectionId] = useState("");
  const [collectionParams, setCollectionParams] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showSearch2, setShowSearch2] = useState(false);
  const searchBarRef = useRef(null);
  const searchBarRef2 = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        (searchBarRef.current && !searchBarRef.current.contains(e.target)) ||
        (searchBarRef2.current && !searchBarRef2.current.contains(e.target))
      ) {
        setShowSearch(false);
        setShowSearch2(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBarRef, searchBarRef2]);

  const value = {
    arrayOfRecipeNames,
    setArrayOfRecipeNames,
    collectionId,
    setCollectionId,
    collectionParams,
    setCollectionParams,
    showSearch,
    setShowSearch,
    searchBarRef,
    showSearch2,
    setShowSearch2,
    searchBarRef2,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
