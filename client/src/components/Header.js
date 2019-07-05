import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';


class Header extends Component {

//Decides what to dislay on the right side of the header
  renderContent() {
    switch (this.props.auth) {
      case null: 
        return;
      case false:
        return  <li><a href="/auth/google">Login With Google</a></li>;
      default: 
        return [
          <li><Payments/></li>,
          <li><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
          to={this.props.auth ? '/surveys' : '/'} 
          className="left brand-logo">
            Emaily
          </Link>
            <ul className="right">
              {this.renderContent()}
            </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  //return { auth: state.auth };  both work the same way. 
  return { auth };                //Syntatic Sugar
}

export default connect(mapStateToProps)(Header);

//The Connect function calls mapStateToProps and in that function
//we destructure the auth from state and then return the variable auth
// with the value of state.auth or { auth }