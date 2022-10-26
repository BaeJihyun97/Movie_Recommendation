import Nav from '../component/Nav';
import "../sass/index.scss";
import "../css/myPage.css"

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

        const [data, setData] = useState({ movieTitle: ''});


    const onChange = e => {
        const {name, value} = e.target;
        setData({
            ...data, [name]: value
        });
    };

    const sendTitle = async () => {
        navigate("/recommend", { state: data });
    }



    if (!user) {
        return null;
    }



  return (
    <div id="userinfobody">

                <Nav onChange={onChange} sendTitle={sendTitle} />


                <div id="userinfo">
                    <h3>{user.email}</h3>
                    <button onClick={handleLogout}>
                        LOGOUT
                    </button>
                </div>

    </div>
  );
};

export default MyPage;