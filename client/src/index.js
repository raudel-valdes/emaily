import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from'redux';

import App from './components/App';
import reducers from './reducers';

const store = createStore(() => [], {}, applyMiddleware());


// Provider is a react component that knows how to read changes from
//the redux store any time the redux store gets some new state produced
//inside of it. The provider will inform all of its children component
//with the new state. It also allows all of its child components to 
//acces the state
ReactDOM.render(
  <Provider store ={store}><App /></Provider>,
  document.querySelector('#root')
);