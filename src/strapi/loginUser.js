// send Login request to Strapi

import axios from 'axios';
import url from '../utils/URL';

const loginUser = async ({ email, password }) => {
  const res = await axios
    .post(`${url}/auth/local`, {
      identifier: email,
      password,
    })
    .catch((err) => console.log(err));

  return res;
};

export default loginUser;
