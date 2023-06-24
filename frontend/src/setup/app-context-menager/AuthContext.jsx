import React, { createContext, useEffect, useState } from 'react';
import { useUser } from '../auth/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthContext = createContext('');

export const AuthContextProvider = ({ children }) => {
  const { user, logout } = useAuth0();
  const { getUserData } = useUser();
  const [userCollections, setUserCollections] = useState([]);
  const [arrayId, setArrayId] = useState([]);
  // const [contextUser, setContextUser] = useState({});s

  const {
    data: userData,
    refetch,
    isLoading: contextUserLoading,
  } = useQuery(['context-user', user?.email], getUserData, {
    enabled: !!user,
  });

  const logoutUser = () => {
    localStorage.removeItem(
      '@@auth0spajs@@::Iori8HXqCllLPmy2JEeZOrkjW5lt8bcR::@@user@@'
    );
    logout();
  };

  useEffect(() => {
    if (userData) {
      setUserCollections(
        userData.collections.filter(x => x.collName !== 'All Saved Items')
      );
    }
  }, [userData]);

  const value = {
    arrayId,
    setArrayId,
    userData,
    userCollections,
    refetch,
    logoutUser,
    contextUserLoading,
    // userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
