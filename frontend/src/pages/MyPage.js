import Nav from '../component/Nav';
import "../sass/index.scss";


import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from './sdk';
import { UserContext } from '../component';
import { useUserRequired } from '../utils/hooks';

import axios from 'axios';

const MyPage = () => {
  useUserRequired();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = useCallback(() => {
    logout().then(() => {
        setUser(null);
        sessionStorage.clear();
        navigate('/login');
    });
  }, [setUser, navigate]);


    sessionStorage.setItem("UID", user?user.id:null);

    useEffect(() => {
        if (!sessionStorage.getItem("UID")) {
            navigate('/login');
        }
    }, [])

    if (!user) {
        return null;
    }

  return (
    <div>
      <h3>{user.email}</h3>
      <button onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default MyPage;