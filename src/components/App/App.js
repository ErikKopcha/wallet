import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../DashboardPage/DashboardPage';
import RegistrationPage from '../RegistrationPage/RegistrationPage';
import { ThemeProvider} from '@mui/material/styles';
import theme from '../../styleSheet/MaterialUITheme';

function App() {
  const isUserAuthenticated = false; // for test
  const getRedirectUrl = () => isUserAuthenticated ? "/home/" : "/register"; // wait login component

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={ <Navigate to={getRedirectUrl()} /> } />
            <Route path="*" element={ <Navigate to={getRedirectUrl()} /> } />
            <Route path="/home/*" element={ <DashboardPage /> } />
            <Route path="/register" element={ <RegistrationPage /> } />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
