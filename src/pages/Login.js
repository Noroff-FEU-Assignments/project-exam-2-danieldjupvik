import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { loginSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { baseUrl, authUrl } from '../utils/api';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(`${baseUrl}${authUrl}`, {
        identifier: data.identifier.toLowerCase(),
        password: data.password,
      });
      setAuth(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  if (auth) {
    setTimeout(() => {
      history.push('/dashboard');
    }, 500);
  }

  return (
    <div className='custom-container'>
      <h1 className='heading'>Sign In</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '350px', margin: '0 auto', marginTop: '30px' }}
      >
        {loginError && (
          <p
            style={{
              width: 'fit-content',
              margin: '0 auto',
              borderBottom: '1px solid red',
              paddingBottom: '10px',
            }}
          >
            Wrong password mate.
          </p>
        )}
        <fieldset disabled={submitting} className='fieldset'>
          <div className='groupForm'>
            <p className='label'>Username or Email</p>
            <input
              type='text'
              name='identifier'
              placeholder='Username or email'
              ref={register}
              className='inputElem'
            />
            {errors.identifier && <p>{errors.identifier.message}</p>}
          </div>

          <div className='groupForm'>
            <p className='label'>Password</p>
            <input
              type='password'
              name='password'
              placeholder='Password'
              ref={register}
              className='inputElem'
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type='submit' className='submitBtn'>
            {submitting ? 'Signing in...' : 'Sign in now'}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
