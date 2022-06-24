import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import { ApolloProvider } from '@apollo/client'
import client from './graphql/request';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <ErrorBoundary>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ErrorBoundary>
        </Provider>
    </ApolloProvider>,
);

