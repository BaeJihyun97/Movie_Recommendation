import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from './sdk';
import { UserContext } from '../component';
import { useUserRequired } from '../utils/hooks';

import axios from 'axios';

const Main = () => {
  useUserRequired();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  console.log(user)

  const handleLogout = useCallback(() => {
    logout().then(() => {
        setUser(null);
        sessionStorage.clear();
        navigate('/login');
    });
  }, [setUser, navigate]);


  if (!user) {
    return null;
  }

 sessionStorage.setItem("UID", user?user.id:null);
 console.log(sessionStorage.getItem("UID"));


  return (
    <div>
      <h1>Success</h1>
      <h3>{user.email}</h3>
      <button onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Main;