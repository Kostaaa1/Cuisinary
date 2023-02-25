import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
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
  const { userData } = useContext(AuthContext);
  const { currentUser } = useAuth();
  const [test, setTest] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    if (currentUser) {
      setLayoutData(currentUser.collections);
    }
  });

  const destructuredArray = layoutData?.map((coll) =>
    coll.collRecipes.map((recipes) => ({
      data: { image: recipes?.recipe.image },
    }))
  );

  const layoutArr = destructuredArray?.map((el) => mockData.map((mockEl, i) => (el[i] ? el[i] : mockEl)));

  return {
    layoutArr,
    length,
    destructuredArray,
    layoutData,
    setLayoutData,
  };
};
