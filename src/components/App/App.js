import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../DashboardPage/DashboardPage';
import LoginPage from '../LoginPage/LoginPage'
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../settings/themeSettings';

const App = () => {

  const isUserAuthenticated = false; // for test
  const getRedirectUrl = () => isUserAuthenticated ? "/home/" : "/register"; // wait login component

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={ <Navigate to={getRedirectUrl()} /> } />
          <Route path="*" element={ <Navigate to={getRedirectUrl()} /> } />
          <Route path="/home/*" element={ <DashboardPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegistrationPage /> } />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
