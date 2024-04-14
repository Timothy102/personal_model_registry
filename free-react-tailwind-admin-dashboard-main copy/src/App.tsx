import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import NotFoundPage from './components/404';
import ConnectWithStripe from './pages/Authentication/ConnectWithStripe';
import Marketplace from './pages/Dashboard/Marketplace'
import ModelDetails from './pages/Dashboard/ModelDetails';
import BuildYourOwnModelRegistry from './pages/Dashboard/Create';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="TimC Models" />
              <Marketplace />
            </>
          }
        />
        <Route path="models/:modelName" element={<ModelDetails />} />
        <Route
          path="/create"
          element={
            <>
              <PageTitle title="Create Your Own Personal Model Registry | Arcadia" />
              <BuildYourOwnModelRegistry />
            </>
          }
        />
        <Route
          path="/auth/stripe"
          element={
            <>
              <PageTitle title="Stripe Connect | Arcadia" />
              <ConnectWithStripe />
            </>
          }
        />
        <Route
          path="/404"
          element={
            <>
              <PageTitle title="404 - Page Not Found" />
              <NotFoundPage />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
