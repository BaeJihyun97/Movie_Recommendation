import { useContext, useEffect } from 'react';

import { get } from './sdk';
import { UserContext } from '../component';

const getMe = () => get('users/me');

export const useUserRequired = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      getMe().then(resp => setUser(resp.data));
    }
  }, [user, setUser]);
};