import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import authService from './services/auth.service';
import config from '../config.json';

const Index = () => {
  authService.useUserAuth();

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

async function startApp() {
  ReactDOM.render(
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <React.StrictMode>
        <Index />
      </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
  );
}

if (import.meta.env.VITE_WITH_SERVER) {
  console.log('Running with api server');
  authService.refreshToken().finally(startApp);
} else {
  console.log('No api server');
  startApp();
}
