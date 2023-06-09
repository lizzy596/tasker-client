import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { http } from './http.service';
import { redirect } from "react-router-dom"

const userSubject = new BehaviorSubject(null);



export const authService = {
  register,
  login,
  logout,
  useUserAuth,
  loginWithApple,
  refreshToken,
  loginWithGoogleToken,
  useRedirectLoggedIn,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  }
}


export function register(params) {
  return http.post('/auth/register', params);
}

export function login({ email, password }) {
  return http.post('/auth/login/email', { email, password }).then((response) => {
    const { user, tokens } = response.data;
    const { token, expires } = tokens.access;
    userSubject.next({ ...user, token })
    startRefreshTokenTimer(expires);
    return user;
  })
}

export function logout() {
  http
    .post(`/auth/logout`, {})
    .finally(() => {
      stopRefreshTokenTimer();
      userSubject.next(null);
      redirect('/login')
      // window.location.replace('/login');
    })
    // .catch(() => window.location.replace('/login'));
    .catch(() => redirect('/login'));
}


export function useRedirectLoggedIn(navigate) {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
    // eslint-disable-next-line
  }, [user]);

  return { user, setUser };
}

export function loginWithGoogleToken(accessToken) {
  return http
    // .post('/auth/login/google', { token: googleData.idToken })
    .post('/auth/login/google', { token: accessToken })
    .then(response => {
      const { user, tokens } = response.data;
      const { token, expires } = tokens.access;
      //setRefreshToken(tokens.refresh.token);
      userSubject.next({ ...user, token });
      startRefreshTokenTimer(expires);
      return user;
    });
}

export function loginWithApple(appleToken, fullName) {
  return http
    .post('/auth/login/apple', {
      token: appleToken,
      firstName: fullName?.givenName,
      lastName: fullName?.familyName
    })
    .then(response => {
      const { user, tokens } = response.data;
      const { token, expires } = tokens.access;
      //setRefreshToken(tokens.refresh.token);
      userSubject.next({ ...user, token });
      startRefreshTokenTimer(expires);
      return user;
    });
}



export function refreshToken() {
  stopRefreshTokenTimer();
  return http
    .post(`/auth/refresh-tokens`)
    .then((response) => {
      const { user, tokens } = response.data;
      const { token, expires } = tokens.access;
      userSubject.next({ ...user, token });
      startRefreshTokenTimer(expires);
      return user;
    })
    .catch(() => {
      console.log('You must login to access');
      return redirect("/login");
    });
}

export default authService


let refreshTokenTimeout;

function startRefreshTokenTimer(exp) {
  const expires = new Date(exp);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}

export function useUserAuth() {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    const subscription = authService.user.subscribe(x => {
      return setUser(x);
    });
    return () => subscription.unsubscribe();
  }, []);
  return user;
}

