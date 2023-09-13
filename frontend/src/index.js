import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './utils/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ToastContainer />
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
