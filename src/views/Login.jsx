import React from 'react';
import { NavBar } from '../components/NavBar';
import { LoginForm } from '../components/AuthForm';

const Login = () => {
  return (
    <>
      <NavBar />
      <LoginForm />
    </>
  );
};

export default Login;