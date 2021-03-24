import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; 
import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import './index.css';

import reducers from './reducers';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

const container = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>,
    container);