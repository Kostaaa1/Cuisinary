import { useCallback, useEffect, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";

export const useUser = () => {
  const { user, getAccessTokenSilently } = useAuth0();

  const getUserData = async () => {
    if (user) {
      try {
        const mockUser = {
          nickname: user?.nickname,
          email: user?.email,
          name: user?.name,
        };

        const res = await axios.post(
          `/api/auth/${user?.email}/getUser`,
          { user: mockUser },
          {
            headers: {
              authorization: `Bearer ${await getAccessTokenSilently()}`,
            },
          }
        );

        const userData = res.data;

        return userData;
      } catch (error) {
        return null;
      }
    }
  };

  return { getUserData };
};

export const useAuth = () => {
  const [setRefetchedUser] = useState(false);

  const authenticated = useMemo(() => {
    const item = localStorage.getItem(
      "@@auth0spajs@@::Iori8HXqCllLPmy2JEeZOrkjW5lt8bcR::@@user@@"
    );

    return !!item;
  }, [
    localStorage.getItem(
      "@@auth0spajs@@::Iori8HXqCllLPmy2JEeZOrkjW5lt8bcR::@@user@@"
    ),
  ]);

  return { authenticated, setRefetchedUser };
};
