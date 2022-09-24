import React, { useEffect, useCallback, useContext } from 'react';


import GoogleButton from 'react-google-button';

import { notifyError } from '../utils/notifications';


const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_BASE_BACKEND_URL } = process.env;

const Login = () => {



  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const redirectUri = 'api/v1/auth/login/google/';

    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' ');

    const params = {
      response_type: 'code',
      client_id: REACT_APP_GOOGLE_CLIENT_ID,
      redirect_uri: `${REACT_APP_BASE_BACKEND_URL}/${redirectUri}`,
      prompt: 'select_account',
      access_type: 'offline',
      scope
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}`;
  }, []);

  return (
    <div>
      <h1>Welcome to our Demo App!</h1>

      <h2>Server-side flow:</h2>
      <GoogleButton
        onClick={openGoogleLoginPage}
        label="Sign in with Google"
        disabled={!REACT_APP_GOOGLE_CLIENT_ID}
      />

    </div>
  );
};

export default Login;

/*

import { useNavigate, useLocation } from 'react-router-dom';

  const navigate = useNavigate();
  const { search } = useLocation();


  useEffect(() => {
    const queryParams = new URLSearchParams(search);

    const error = queryParams.get('error');

    if (error) {
      notifyError(error);
      navigate(to, { search: null });
    }
  }, [search]);
*/