import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
  };

  export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
  }; 

//By using redux-thunk we are able to call an action creator without having to
//immidiately return an action and it gives us direct access to the dispatch function. 
//To make all of this possible what we do is that we return a function with the ajax 
//request. When redux-thunk recieves this fucntion it will execute the function that we returned
// and pass in the dispatch function as a paramter. Luckily we set up the fucntion to where
//it takes in a dispatch parameter and we have handled the promise returned by the ajax request
//with a .then that will call the dispatch funciton and pass in the type and payload (action)
//whenver the promise is met (whenver we get back the data we asked for in the ajax request)