// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import ReactDOMClient from 'react-dom/client';
// import { useUserAuth } from './services/auth.service';
// import authService from './services/auth.service';
// import App from './App';
import './index.css';

// const Index = () => {
//   authService.useUserAuth();

//   return (
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// };

// async function startApp() {
//   ReactDOMClient.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//       <Index />
//     </React.StrictMode>
//   );
// }

// if (import.meta.env.VITE_WITH_SERVER) {
//   console.log('Running with api server');
//   authService.refreshToken().finally(startApp);
//   startApp();
// } else {
//   console.log('No api server');
//   startApp();
// }

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import authService from './services/auth.service';

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
    <React.StrictMode>
      <Index />
    </React.StrictMode>,
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
