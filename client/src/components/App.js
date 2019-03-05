import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render () {
  return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>

      </div>
    )
  }
}

export default connect(null, actions)(App);


//BrowserRouter is used to create a group of routing pages
//BrowseRouter only takes one parent component. Meaning that
//all of the other tags need to go inside of the same parent div

//Route is a component that allows to specifcy the route of your page
//and what to show the user when the browser is in that page.

//The option exact={true} tells the BrowserRouter that the broser needs
//to be in that specific path for it to be able to display that component.
//The reason for this is because Browser router goes through all of the 
//Routed that are in within the current route that the browser in and displays
//all of them unless specified with exact={true} || exact
//if you just put the a component inside of BrowserRouter without specifiying 
//a path inside of a Route component then the component will appear in all of the routes
