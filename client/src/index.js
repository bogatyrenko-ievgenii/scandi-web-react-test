import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import { ApolloProvider } from '@apollo/client'
import client from './services/request';
import { rootreducer } from './redux/rootreducer';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

import './index.css';

const store = createStore(rootreducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
);

