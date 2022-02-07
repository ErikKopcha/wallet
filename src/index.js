import React from 'react';
import ReactDOM from 'react-dom';
import './styleSheet/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';
import transactionsReducer from './features/transactions';
import sessionReducer from './features/session';
import categoriesReducer from './features/trans-categories';
import globalReducer from './features/global';

const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    session: sessionReducer,
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
