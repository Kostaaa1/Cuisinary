import React, { createContext, useEffect, useState, useRef } from 'react';
import { useWindowSize } from '../../utils/useWindowSize';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from './AuthContext';

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [arrayOfRecipeNames, setArrayOfRecipeNames] = useState([]);
  const [collectionId, setCollectionId] = useState('');
  const [collectionParams, setCollectionParams] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showSearch2, setShowSearch2] = useState(false);
  const { userData } = useContext(AuthContext);
  const location = useLocation();

  // used for navbar
  const searchBarRef = useRef(null);
  // used in searched component (page that shows searched recipes)
  const searchBarRef2 = useRef(null);

  const closeSearch = () => {
    if (showSearch) setShowSearch(false);
    if (showSearch2) setShowSearch2(false);
  };

  useEffect(() => {
    if (
      arrayOfRecipeNames.length !== 0 &&
      location.pathname !== '/account/profile/saved-items'
    ) {
      handleDeletionOfRecipes();
      setArrayOfRecipeNames([]);
    }
  }, [location.pathname]);

  const handleDeletionOfRecipes = async () => {
    const recipeNames = {
      ids: arrayOfRecipeNames,
      collectionId: collectionParams === 'saved-items' ? '' : collectionId,
    };
    await axios.post(`/api/auth/${userData?.email}/deleteFavs`, recipeNames);
  };

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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    closeSearch,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export default GlobalContext;
