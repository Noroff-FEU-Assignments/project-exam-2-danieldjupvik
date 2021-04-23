import { useState } from 'react';
import { loginSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);

    // try {
    //   const response = await axios.post(`${LOGIN_BASE_URL}${AUTH_PATH}`, data);
    //   setAuth(response.data);
    // } catch (error) {
    //   console.log(error);
    //   setLoginError(error.toString());
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <>
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
            <p className='label'>Username</p>
            <input
              type='text'
              name='identifier'
              placeholder='Username'
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
    </>
  );
};

export default Login;
