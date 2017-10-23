// @flow
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from './../redux/actions/actions';

type Props = {
  handleToken: Function,
};

// Stripe use $ as default
const Payments = ({handleToken}: Props) => (
  <StripeCheckout
    name="Emaily"
    description="$5 for 5 emails credits"
    amount={500} // use cents instead of dollars 500 cents = 5 $
    token={token => {
      // console.log (token);
      handleToken (token);
    }} // expect to receive the cb which return the stripe auth
    stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
  >
    <button className="btn">
      Add Credits
    </button>
  </StripeCheckout>
);
export default connect (null, actions) (Payments);
