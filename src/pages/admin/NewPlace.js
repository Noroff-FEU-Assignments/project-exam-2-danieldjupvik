import { BsChevronDoubleLeft } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/api';
import useAxios from '../../utils/useAxios';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { createPlaceSchema } from '../../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const NewPlace = () => {
  const history = useHistory();
  const [config, setConfig] = useState([]);
  const https = useAxios();
  const [auth] = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [mostPopular, setMostPopular] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(createPlaceSchema),
  });

  function navigate() {
    history.goBack();
  }

  if (!auth) {
    setTimeout(() => {
      history.push('/');
    }, 0);
  }

  useEffect(() => {
    const getConfig = async () => {
      try {
        const response = await axios.get(`${baseUrl}/config`);
        setConfig(response.data);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };
    getConfig();
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setCreateError(null);
    console.log(data);

    try {
      const response = await https.post(`${baseUrl}/places`, {
        name: data.name,
        image_url: data.image_url,
        price: data.price,
        type: data.type,
        description: data.description,
        most_popular: mostPopular,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setCreateError(error.toString());
    } finally {
      setSubmitting(false);
      reset();
      setMostPopular(false);
    }
  };

  const handleToggleContact = () => {
    setMostPopular(!mostPopular);
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
          {createError && (
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
                Place name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Place name'
                ref={register}
                className='inputElem'
              />
              {errors.name && (
                <p className='errorLabel'>{errors.name.message}</p>
              )}
            </div>

            <div className='groupForm'>
              <label htmlFor='image_url' className='label'>
                Image URL
              </label>
              <input
                type='url'
                name='image_url'
                id='image_url'
                placeholder='https://example.com/img.jpg'
                ref={register}
                className='inputElem'
              />
              {errors.image_url && (
                <p className='errorLabel'>{errors.image_url.message}</p>
              )}
            </div>

            <div className='groupForm'>
              <label htmlFor='type' className='label'>
                Place type
              </label>
              <select
                name='type'
                id='type'
                ref={register}
                className='inputElem'
              >
                <option value=''>Choose a type</option>

                {config.type?.map((type) => {
                  return (
                    <option key={type.id} value={type.type}>
                      {type.type}
                    </option>
                  );
                })}
              </select>
              {errors.type && (
                <p className='errorLabel'>{errors.type.message}</p>
              )}
            </div>

            <div className='groupForm'>
              <label htmlFor='price' className='label'>
                Price
              </label>
              <select
                name='price'
                id='price'
                ref={register}
                className='inputElem'
              >
                <option value=''>Choose a price</option>
                {config.price?.map((price) => {
                  return (
                    <option key={price.id} value={price.price}>
                      {price.price},-
                    </option>
                  );
                })}
              </select>
              {errors.price && (
                <p className='errorLabel'>{errors.price.message}</p>
              )}
            </div>

            <div className='groupForm'>
              <label className='label' htmlFor='toggleBtn'>
                Most Popular
              </label>
              <label className='toggleBtn '>
                <input
                  id='toggleBtn'
                  className='toggleBtn--input'
                  type='checkbox'
                  onClick={handleToggleContact}
                />
                <span className='toggleBtn--slider'></span>
              </label>
            </div>

            <div className='groupForm'>
              <label htmlFor='description' className='label'>
                Description
              </label>
              <textarea
                rows='5'
                name='description'
                id='description'
                placeholder='Description here'
                ref={register}
                className='inputElem'
              />
              {errors.description && (
                <p className='errorLabel'>{errors.description.message}</p>
              )}
            </div>

            <button type='submit' className='button newPlace__btn'>
              {submitting ? 'Creating...' : 'Create'}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default NewPlace;
