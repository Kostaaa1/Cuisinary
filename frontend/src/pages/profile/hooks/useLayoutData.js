import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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
  const { userData } = useContext(AuthContext);
  const { currentUser } = useAuth();
  const [test, setTest] = useState([]);
  const { user } = useAuth0();

  const layoutData = useMemo(() => {
    return currentUser?.collections;
  }, [currentUser]);

  const destructuredArray = useMemo(() => {
    return layoutData?.map((coll) =>
      coll.collRecipes.map((recipes) => ({
        data: { image: recipes?.recipe.image },
      }))
    );
  }, [layoutData]);

  const layoutArr = useMemo(() => {
    return destructuredArray?.map((el) => mockData.map((mockEl, i) => (el[i] ? el[i] : mockEl)));
  }, [destructuredArray, mockData]);

  return {
    layoutArr,
    destructuredArray,
    layoutData,
    currentUser,
  };
};
