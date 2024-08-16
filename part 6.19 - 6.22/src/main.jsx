// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import rootReducer from './reducers/index'; // Corrected import path

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Create Redux store with middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);
