import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider, useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import App from './App';
import './css/style.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

const Loading = () => <div>Loading...</div>;

const AppWrapper = () => {
  return <AppWithAuth />;
};

const AppWithAuth = withAuthenticationRequired(App, {
  onRedirecting: () => <Loading />,
});

const AuthenticatedApp = () => {
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const storeAccessToken = async () => {
      try {
        if (isAuthenticated && user) { // Ensure user object is defined
          const accessToken = await getAccessTokenSilently();
          localStorage.setItem('accessToken', accessToken);

        }
      } catch (error) {
        console.error('Error retrieving access token:', error);
      }
    };

    if (!isLoading) {
      storeAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading, user]);

  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-v6owmnmf.eu.auth0.com"
      clientId="2ByRuxbdVRnzp9CTRUy2yX2I3r9RRTlp"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <AuthenticatedApp />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
