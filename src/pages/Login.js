import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// Strapi function
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';

// Handle user
import { UserContext } from '../context/user';

// Handle alert
import { AlertContext } from '../context/alert';

const Login = () => {
  const history = useHistory();
  // set up UserContext
  const { userLogin } = useContext(UserContext);

  const { alert, showAlert } = useContext(AlertContext);

  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    });
  };

  const handleSubmit = async (e) => {
    // alert
    showAlert({ msg: 'accessing user data. please wait...' });

    e.preventDefault();
    let response;
    if (isMember) {
      // login
      response = await loginUser({ email, password });
    } else {
      // register
      response = await registerUser({ email, password, username });
    }

    if (response) {
      // login or register successfully
      const {
        jwt: token,
        user: { username },
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({
        msg: `you are logged in as ${username}. happy shopping !!!`,
      });
      history.push('/products');
    } else {
      // show alert
      showAlert({
        msg: 'there was an error. please try again...',
        type: 'danger',
      });
    }
  };

  return (
    <section className='form section'>
      <h2 className='section-title'>{isMember ? 'sign in' : 'register'}</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='form-control'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Username */}
        {!isMember && (
          <div className='form-control'>
            <label htmlFor='username'>username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        {/* empty form text */}
        {isEmpty && (
          <p className='form-empty'>please fill out all form fields</p>
        )}

        {/* submit button */}
        {!isEmpty && (
          <button type='submit' className='btn btn-primary btn-block'>
            submit
          </button>
        )}

        {/* register link */}
        <p className='register-link'>
          {isMember ? 'need to register' : 'already a member'}
          <button type='button' onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
};

export default Login;
