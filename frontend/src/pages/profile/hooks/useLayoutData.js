import { useMemo } from 'react';
import { useState } from 'react';

export const useLayoutData = () => {
  const [collections, setCollections] = useState([]);
  const mockData = [
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
  ];

  const layoutArr = useMemo(() => {
    let destructuredArray = collections?.map((coll) =>
      coll.collRecipes.map((recipes) => ({
        data: { image: recipes.data?.image },
      }))
    );

    return destructuredArray?.map((el) =>
      mockData.map((mockEl, i) => (el[i] ? el[i] : mockEl))
    );
  }, [collections]);

  return {
    layoutArr,
    collections,
    setCollections,
  };
};
