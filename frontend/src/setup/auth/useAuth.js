import { useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

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
        console.log('getUserData called');

        return userData;
      } catch (error) {
        return null;
      }
    }
  };

  return { getUserData };
};

export const useAuth = () => {
  const getAuthData = () =>
    localStorage.getItem(
      '@@auth0spajs@@::Iori8HXqCllLPmy2JEeZOrkjW5lt8bcR::@@user@@'
    );

  const authenticated = useMemo(() => {
    const item = getAuthData();
    return !!item;
  }, [getAuthData]);

  return { authenticated };
};
