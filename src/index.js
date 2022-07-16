import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DealReducer from './reducers/DealReducer';
import ManReducer from './reducers/ManReducer';
import CatReducer from './reducers/CatReducer';
import RangeReducer from './reducers/RangeReducer';
import CategoriesReducer from './reducers/CategoriesReducer';

const store = configureStore({
  reducer: {
    dealType: DealReducer,
    manufacturer: ManReducer,
    category: CatReducer,
    priceRange: RangeReducer,
    allCategories: CategoriesReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
