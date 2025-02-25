import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css';
import { RoutesSpotify } from './routes';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <React.StrictMode>
  <Provider store={store}>
      <RoutesSpotify />
  </Provider>
  
    
  // </React.StrictMode>

);

