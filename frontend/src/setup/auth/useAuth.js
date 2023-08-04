import { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export const useUser = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

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

  const updateQueryCache = async (queryKey, newData) => {
    const userData = await getUserData();
    queryClient.setQueryData(queryKey, { ...userData, collections: newData });
  };

  return { updateQueryCache, getUserData };
};

export const useAuth = () => {
  const { logout } = useAuth0();

  const getAuthData = () =>
    localStorage.getItem('@@auth0spajs@@::Iori8HXqCllLPmy2JEeZOrkjW5lt8bcR::@@user@@');

  const logoutUser = () => {
    logout().then(() =>
      localStorage.removeItem(
        '@@auth0spajs@@::Iori8HXqCllLPmy2JEeZOrkjW5lt8bcR::@@user@@'
      )
    );
  };

  const authenticated = useMemo(() => {
    const item = getAuthData();
    return !!item;
  }, [getAuthData]);

  return { authenticated, logoutUser };
};
