import './App.css';
import DashboardPage from '../DashboardPage/DashboardPage';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PoppinsBoldWoff from '../../assets/fonts/Poppins-Bold.woff';
import PoppinsRegularWoff from '../../assets/fonts/Poppins-Regular.woff';
import AbelRegularWoff from '../../assets/fonts/Abel-Regular.woff';
import PoppinsBoldWoff2 from '../../assets/fonts/Poppins-Bold.woff2';
import PoppinsRegularWoff2 from '../../assets/fonts/Poppins-Regular.woff2';
import AbelRegularWoff2 from '../../assets/fonts/Abel-Regular.woff2';
import AddTransaction from '../AddTransaction/AddTransaction';

const theme = createTheme({
  palette: {
    primary: {
      main: '#24CCA7',
    },
    secondary: {
      main: '#FF6596',
    },
  },
  typography: {
    fontFamily: 'Abel, Poppins, sans-serif',
    fontSize: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
        font-family: 'Poppins';
        src: url(${PoppinsBoldWoff2}) format('woff2'),
          url(${PoppinsBoldWoff}) format('woff');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
      }

        @font-face {
          font-family: 'Poppins';
          src: url(${PoppinsRegularWoff2}) format('woff2'),
            url(${PoppinsRegularWoff}) format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Abel';
          src: url(${AbelRegularWoff2}) format('woff2'),
            url(${AbelRegularWoff}) format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '300px',
          height: '50px',
          textTransform: 'uppercase',
          borderRadius: '20px'
        },
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h1' },
          style: {
            fontFamily: 'Poppins',
            fontSize: 30,
            lineHeight: 1.5,
          },
        },
      ],
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <DashboardPage />
        {/*<ModalAddTransaction/>*/}
        {/*<AddTransaction/>*/}
      </div>
    </ThemeProvider>
  );
}

export default App;
