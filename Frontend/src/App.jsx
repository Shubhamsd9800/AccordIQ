import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Bars } from 'react-loader-spinner';

const HomePage = lazy(() => import('./pages/HomePage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f8f9fa'
          }}>
            <Bars
              height="80"
              width="80"
              color="#001A6E"
              ariaLabel="bars-loading"
              visible={true}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
