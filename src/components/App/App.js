import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import LoginPage from '../../pages/LoginPage/LoginPage'
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../settings/themeSettings';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import { TailSpin } from 'react-loader-spinner';

const App = () => {
  const isUserAuthenticated = useSelector((state) => state.session.isAuth);
  const redirectUrl = isUserAuthenticated ? "/home/" : "/login";
  const showLoader = useSelector((state) => state.global.isLoading);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={ <Navigate to={redirectUrl} /> } />
          <Route path="*" element={ <Navigate to={redirectUrl} /> } />
          <Route path="/home/*" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegistrationPage /> } />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        { showLoader &&
          <div className={'loader'}>
            <TailSpin
              color='var(--redAccentColor)'
              height={80}
              width={80}
            />
          </div>
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
