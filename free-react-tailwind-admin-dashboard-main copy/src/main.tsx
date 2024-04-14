import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider, useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import App from './App';
import './css/style.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';


ReactDOM.render(
  <React.StrictMode>
    
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
