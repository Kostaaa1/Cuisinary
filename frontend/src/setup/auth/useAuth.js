import { useEffect, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUser = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);

  const query = useQuery(
    ["user", user?.email],
    async () => {
      if (user) {
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

        return res.data || {};
      }
    },
    { enabled: !!user }
  );

  useEffect(() => {
    if (user) {
      query.refetch().then(() => setIsLoading(true));
    }
  }, [user]);

  return { ...query, userData: query.data, isLoading, setIsLoading };
};

export const useAuth = () => {
  const [setRefetchedUser] = useState(false);

  const authenticated = useMemo(() => {
    const item = localStorage.getItem(
      "@@auth0spajs@@::LWAyzb9ustA8ktJ2j3tsFGiPUBj5zf5X::CatPiss123::openid profile email offline_access"
    );
    console.log(item);
    return !!item;
  }, [
    localStorage.getItem(
      "@@auth0spajs@@::LWAyzb9ustA8ktJ2j3tsFGiPUBj5zf5X::CatPiss123::openid profile email offline_access"
    ),
  ]);

  return { authenticated, setRefetchedUser };
};
