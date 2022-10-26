import React, { useContext, useEffect, useRef } from 'react';

import { get } from './sdk';
import { UserContext } from '../component';

const getMe = () => get('users/me');

export const useUserRequired = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      getMe().then(resp => setUser(resp.data))
      .then(function(){
        sessionStorage.setItem("UID", user?user.id:null);
        console.log(sessionStorage.getItem("UID"))
      });
    }
  }, [user, setUser]);
};



export const useDidMountEffect = (func, deps) => {
	const didMount = useRef(false);

	useEffect(() => {
		if (didMount.current) func();
		else didMount.current = true;
	}, deps);
};
