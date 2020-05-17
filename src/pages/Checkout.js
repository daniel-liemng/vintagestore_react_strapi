import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import { AlertContext } from '../context/alert';

import EmptyCart from '../components/Cart/EmptyCart';

// react-stripe-elements
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';

import submitOrder from '../strapi/submitOrder';

const Checkout = (props) => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { alert, showAlert, hideAlert } = useContext(AlertContext);

  const history = useHistory();

  // state
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // handle showing of Submit button
  const isEmpty = !name || alert.show;

  // function
  const handleSubmit = async (e) => {
    // alert
    showAlert({ msg: 'submitting order... please wait' });

    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch((error) => console.log(error));

    console.log(response);
    const { token } = response;
    if (token) {
      setError('');
      const { id } = token;
      let order = await submitOrder({
        name,
        total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });

      // check if order is success or error
      if (order) {
        showAlert({ msg: 'your order is complete' });
        clearCart();
        history.push('/');
        return;
      } else {
        showAlert({
          msg: 'there was an error with your order. please try again!',
          type: 'danger',
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  };

  if (cart.length < 1) {
    return <EmptyCart />;
  }

  return (
    <section className='section form'>
      <h2 className='section-title'>checkout</h2>
      <form onSubmit={handleSubmit} className='checkout-form'>
        <h3>
          order total : <span>${total}</span>
        </h3>
        {/* single input - name */}
        <div className='form-control'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* card element */}
        <div className='stripe-input'>
          <label htmlFor='card-element'>credit or debit card</label>
          <p className='stripe-info'>
            test using this credit cart: <span>4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the cvc
          </p>
        </div>

        {/* STRIPE ELEMENTS */}
        <CardElement className='card-element'></CardElement>

        {/* stripe errors */}
        {error && <p className='form-empty'>{error}</p>}

        {/* empty value - name OR show Submit button */}
        {isEmpty ? (
          <p className='form-empty'>please fill out name field</p>
        ) : (
          <button type='submit' className='btn btn-primary btn-block'>
            Submit
          </button>
        )}
      </form>
    </section>
  );
};

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey='pk_test_nHCLhd2MjdARhzKdmXWuoYK900QW0kPZgl'>
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
