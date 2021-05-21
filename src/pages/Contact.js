import { useState } from 'react';
import { contactSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { baseUrl } from '../utils/api';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(contactSchema),
  });
  const onSubmit = async (data) => {
    setSubmitting(true);
    setContactError(null);

    try {
      const response = await axios.post(`${baseUrl}/messages`, data);
      if (response.status) {
        setMessageSent(true);
        setTimeout(() => {
          setMessageSent(false);
        }, 3500);
      }
    } catch (error) {
      console.log(error);
      setContactError(error.toString());
    } finally {
      setSubmitting(false);
      reset();
    }
  };

  return (
    <div className='custom-container'>
      <h1 className='heading'>{t('contact')}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='contactForm'>
        {contactError && <p className='error'>{t('sendingError')}</p>}
        {messageSent ? <p className='success'>{t('messageSent')}</p> : null}
        <fieldset disabled={submitting} className='fieldset'>
          <div className='groupForm'>
            <label htmlFor='name' className='label'>
              {t('fullName')}
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder={t('fullName')}
              ref={register}
              className='inputElem'
            />
            {errors.name && <p className='errorLabel'>{errors.name.message}</p>}
          </div>

          <div className='groupForm'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='example@example.com'
              ref={register}
              className='inputElem'
            />
            {errors.email && (
              <p className='errorLabel'>{errors.email.message}</p>
            )}
          </div>
          <div className='groupForm'>
            <label htmlFor='message' className='label'>
              {t('message')}
            </label>
            <textarea
              rows='5'
              name='message'
              id='message'
              placeholder={t('messageHere')}
              ref={register}
              className='inputElem'
            />
            {errors.message && (
              <p className='errorLabel'>{errors.message.message}</p>
            )}
          </div>
          <button type='submit' className='button contact__btn solid__btn'>
            {submitting ? 'Sending...' : 'Send'}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Contact;
