import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        //amount is in cents: 500 = $5.00
        amount={500}
        //call back function where stripe sends
        //us a purchase token
        token={token => this.props.handleToken(token)}
        //our public key provided by stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
        <button className="btn">
          Add credits
        </button>

      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);