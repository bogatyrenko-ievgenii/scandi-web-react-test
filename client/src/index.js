import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import { ApolloProvider } from '@apollo/client'
import client from './services/request';
import { rootreducer } from './redux/rootreducer';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import './index.scss';

export const store = configureStore(
    { reducer: rootreducer }
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ApolloProvider>,
);

