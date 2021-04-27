import { BsChevronDoubleLeft } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/api';
import useAxios from '../../utils/useAxios';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { contactSchema } from '../../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const NewPlace = () => {
  const history = useHistory();
  const https = useAxios();
  const [auth] = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [contactError, setContactError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(contactSchema),
  });

  function navigate() {
    history.goBack();
  }

  if (!auth) {
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  const onSubmit = async (data) => {
    setSubmitting(true);
    setContactError(null);

    try {
      const response = await https.post(`${baseUrl}/places`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setContactError(error.toString());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='custom-container'>
      <div onClick={navigate} className={'backIconAbsolute'}>
        <BsChevronDoubleLeft fontSize={'35px'} style={{ textAlign: 'left' }} />
      </div>
      <h1 className='heading'>Create new place</h1>
      <div>
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
              <p className='label'>Full Name</p>
              <input
                type='text'
                name='name'
                placeholder='Full name'
                ref={register}
                className='inputElem'
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className='groupForm'>
              <p className='label'>Email</p>
              <input
                type='text'
                name='email'
                placeholder='example@example.com'
                ref={register}
                className='inputElem'
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className='groupForm'>
              <p className='label'>Message</p>
              <textarea
                rows='5'
                name='message'
                placeholder='Your message here'
                ref={register}
                className='inputElem'
              />
              {errors.message && <p>{errors.message.message}</p>}
            </div>
            <button type='submit' className='submitBtn'>
              {submitting ? 'Sending...' : 'Send'}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default NewPlace;
