import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { loginSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { baseUrl, authUrl } from '../utils/api';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  document.title = `Holidaze | ${t('login')}`;
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data, e) => {
    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(`${baseUrl}${authUrl}`, {
        identifier: data.identifier.toLowerCase(),
        password: data.password,
      });
      setAuth(response.data);
    } catch (error) {
      console.log(error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
      e.target[2].value = '';
    }
  };

  if (auth) {
    setTimeout(() => {
      history.push('/dashboard');
    }, 500);
  }

  return (
    <div className='custom-container'>
      <h1 className='heading'>{t('login')}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='loginForm'>
        {loginError && <p className='error'>{t('wrongPassword')}</p>}
        <fieldset disabled={submitting} className='fieldset'>
          <div className='groupForm'>
            <label htmlFor='identifier' className='label'>
              {t('usernameOrEmail')}
            </label>
            <input
              type='text'
              id='identifier'
              name='identifier'
              placeholder={t('usernameOrEmail')}
              ref={register}
              className='inputElem'
            />
            {errors.identifier && (
              <p className='errorLabel'>{errors.identifier.message}</p>
            )}
          </div>

          <div className='groupForm'>
            <label htmlFor='password' className='label'>
              {t('password')}
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder={t('password')}
              ref={register}
              className='inputElem'
            />
            {errors.password && (
              <p className='errorLabel'>{errors.password.message}</p>
            )}
          </div>
          <button type='submit' className='button loginPage__btn solid__btn'>
            {submitting ? t('signingIn') : t('signInNow')}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
