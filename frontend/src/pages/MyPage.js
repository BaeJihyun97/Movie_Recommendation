import Nav from '../component/Nav';
import "../sass/index.scss";

import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from './sdk';
import { UserContext } from '../component';
import { useUserRequired, useDidMountEffect } from '../utils/hooks';

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

  sessionStorage.setItem("UID", user?user.id:null)


    useDidMountEffect(() => {
        console.log(sessionStorage.getItem("UID"));
        if (sessionStorage.getItem("UID") === null || sessionStorage.getItem("UID") === undefined ||
        sessionStorage.getItem("UID") === "null" || sessionStorage.getItem("UID") === "undefined") {
            console.log("navigate")
            navigate('/login');
        }
    }, [user]);



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