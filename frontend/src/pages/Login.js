import React, { useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import GoogleButton from 'react-google-button';

import { validateTokenAndObtainSession } from './validateTokenAndObtainSession';
import { notifyError } from '../utils/notifications';
import { UserContext } from '../component';


const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_BASE_BACKEND_URL } = process.env;

const Login = () => {

  const history = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleUserInit = useCallback(
    resp => {
      if (resp.ok) {
        setUser(resp.data);
        history('/');
      } else {
        notifyError(resp.data[0]);
      }
    },
    [history, setUser]
  );

  const onGoogleLoginSuccess = useCallback(
    response => {
      const idToken = response.tokenId;
      const data = {
        email: response.profileObj.email,
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName
      };

      validateTokenAndObtainSession({ data, idToken })
        .then(handleUserInit)
        .catch(notifyError);
    },
    [handleUserInit]
  );


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