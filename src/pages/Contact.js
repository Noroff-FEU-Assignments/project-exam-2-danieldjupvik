import { useState } from 'react';
import { contactSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { baseUrl } from '../utils/api';
import axios from 'axios';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [contactError, setContactError] = useState(null);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(contactSchema),
  });
  const onSubmit = async (data) => {
    setSubmitting(true);
    setContactError(null);

    try {
      const response = await axios.post(`${baseUrl}/messages`, data);
      console.log(response.data);
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
      <h1 className='heading'>Contact</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '350px', margin: '0 auto', marginTop: '30px' }}
      >
        {contactError && (
          <p
            style={{
              width: 'fit-content',
              margin: '0 auto',
              borderBottom: '1px solid red',
              paddingBottom: '10px',
            }}
          >
            Something went wrong when sending..
          </p>
        )}
        <fieldset disabled={submitting} className='fieldset'>
          <div className='groupForm'>
            <label htmlFor='name' className='label'>
              Full Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Full name'
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
              Message
            </label>
            <textarea
              rows='5'
              name='message'
              id='message'
              placeholder='Your message here'
              ref={register}
              className='inputElem'
            />
            {errors.message && (
              <p className='errorLabel'>{errors.message.message}</p>
            )}
          </div>
          <button type='submit' className='button contact__btn'>
            {submitting ? 'Sending...' : 'Send'}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Contact;
