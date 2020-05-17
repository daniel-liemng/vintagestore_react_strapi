// submit order to Strapi

import axios from 'axios';
import url from '../utils/URL';

const submitOrder = async ({
  name,
  total,
  items,
  stripeTokenId,
  userToken,
}) => {
  const res = await axios
    .post(
      `${url}/orders`,
      {
        name,
        total,
        items,
        stripeTokenId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .catch((err) => console.log(err));
  return res;
};

export default submitOrder;
