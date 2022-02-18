import React from 'react';

import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './components/GeneralComponents/GlobalStyles';

import ReactDOM from 'react-dom';

import App from './App';

import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './store/reducers';

import { Provider } from 'react-redux';

// Redux Setup
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))


ReactDOM.render(

  <React.StrictMode>

    <Provider store={store}>

      <BrowserRouter>

        <GlobalStyles />

        <App />

      </BrowserRouter>

    </Provider>

  </React.StrictMode>,

  document.getElementById('root')

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();