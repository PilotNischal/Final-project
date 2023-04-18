import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51MA1w7G9ZwN3X5brmLc5kTaWz4mOXtxnMCF7Upjr5pu8EbsF6W35HXWOrB0B4bBNUNGmllIftuiNWZVyGk4MrgYy00CReN2tEX'
    );
  }
  return stripePromise;
};

export default getStripe;
