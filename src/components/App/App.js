import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../DashboardPage/DashboardPage';
import LoginPage from '../LoginPage/LoginPage'
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../settings/themeSettings';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  // wait login state
  const isUserAuthenticated = true;
  const getRedirectUrl = () => isUserAuthenticated ? "/home/" : "/login";

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={ <Navigate to={getRedirectUrl()} /> } />
          <Route path="*" element={ <Navigate to={getRedirectUrl()} /> } />
          <Route path="/home/*" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegistrationPage /> } />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
