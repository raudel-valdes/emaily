import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//The first parameter in the createStore function is all of the reducers
//that you might have in your application. The second parameter is for some
//initial state that we want to provide for server side rendering.
//The third and final parameter us for middle ware for Ex: reduxThunk

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Provider is a react component that knows how to read changes from
//the redux store any time the redux store gets some new state produced
//inside of it. The provider will inform all of its children component
//with the new state. It also allows all of its child components to 
//acces the state
ReactDOM.render(
  <Provider store ={store}><App /></Provider>,
  document.querySelector('#root')
);