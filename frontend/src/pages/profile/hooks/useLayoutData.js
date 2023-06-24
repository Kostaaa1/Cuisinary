import { useCallback, useMemo } from 'react';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import AuthContext from '../../../setup/app-context-menager/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '../../../setup/auth/useAuth';

export const useLayoutData = () => {
  const { userData } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const { user } = useAuth0();
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

  const layoutData = (collections) => {
    if (!collections) return;

    if (userData) {
      collections ? setCollections(collections) : setCollections([]);
    }
  };

  const layoutArr = useMemo(() => {
    let destructuredArray = collections?.map((coll) =>
      coll.collRecipes.map((recipes) => ({
        data: { image: recipes.recipe?.image },
      }))
    );
    return destructuredArray?.map((el) =>
      mockData.map((mockEl, i) => (el[i] ? el[i] : mockEl))
    );
  }, [collections, mockData]);

  return {
    layoutArr,
    collections,
    layoutData,
    userData,
  };
};
