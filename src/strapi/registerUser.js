import axios from 'axios';
import url from '../utils/URL';

const registerUser = async ({ email, password, username }) => {
  const res = await axios
    .post(`${url}/auth/local/register`, {
      email,
      password,
      username,
    })
    .catch((err) => console.log(err));

  return res;
};

export default registerUser;
