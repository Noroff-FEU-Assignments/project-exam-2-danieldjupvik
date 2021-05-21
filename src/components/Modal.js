import Modal from 'react-bootstrap/Modal';
import { orderSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { baseUrl } from '../utils/api';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const OrderModal = (props) => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [errorDate, setErrorDate] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [endDate, setEndDate] = useState(tomorrow);

  const setTomorrowDate = (date) => {
    const today = date;
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setEndDate(tomorrow);
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(orderSchema),
  });

  const onSubmit = async (data) => {
    setOrderError(null);
    if (startDate && endDate) {
      setSubmitting(true);
      try {
        const response = await axios.post(`${baseUrl}/orders`, {
          name: data.name,
          guests: data.guests,
          check_in: startDate,
          check_out: endDate,
          place_id: props.id,
          image_url: props.image_url,
          place_name: props.name,
        });
        if (response.status) {
          setOrderConfirmed(true);
          setTimeout(() => {
            props.onHide();
            setOrderConfirmed(false);
          }, 3500);
        }
      } catch (error) {
        console.log(error);
        setOrderError(error.toString());
      } finally {
        setSubmitting(false);
      }
    } else {
      setErrorDate(true);
    }
  };

  return (
    // Will get findDOMNode error because the component doesn't use REF.
    // There isn't anything I can do to prevent fix it and the warning doesn't break anything.
    // You can set animation to false on line 88 and it doesn't appear.
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      animation
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='modalForm'
          id='order-form'
        >
          {orderError && <p className='error'>{t('orderError')}</p>}
          {orderConfirmed ? (
            <p className='success'>{t('confirmOrder')}</p>
          ) : null}
          <fieldset disabled={submitting} className='fieldset'>
            <div className='groupForm'>
              <label htmlFor='name' className='label'>
                {t('fullName')}
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder={t('fullName')}
                ref={register}
                className='inputElem'
              />
              {errors.name && (
                <p className='errorLabel'>{errors.name.message}</p>
              )}
            </div>

            <div className='groupForm'>
              <label htmlFor='guests' className='label'>
                {t('guests')}
              </label>
              <input
                type='number'
                id='guests'
                name='guests'
                defaultValue={1}
                ref={register}
                className='inputElem guestInput'
              />
              {errors.guests && (
                <p className='errorLabel'>{errors.guests.message}</p>
              )}
            </div>

            <div className='groupForm'>
              <label htmlFor='startDate' className='label'>
                {t('checkIn')}
              </label>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    id={'startDate'}
                    autoOk
                    label={false}
                    variant='inline'
                    inputVariant='outlined'
                    format={'dd/MM/yyyy'}
                    placeholder='Select a start date'
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setTomorrowDate(date);
                    }}
                    minDate={new Date()}
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>

            <div className='groupForm'>
              <label htmlFor='endDate' className='label'>
                {t('checkOut')}
              </label>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    id={'endDate'}
                    autoOk
                    label={false}
                    inputVariant='outlined'
                    variant='inline'
                    placeholder='Select a end date'
                    format={'dd/MM/yyyy'}
                    value={endDate}
                    minDate={startDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>
              {errorDate ? (
                <p className='errorLabel'>Both check in and out is required</p>
              ) : null}
            </div>
          </fieldset>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className='modalBtnDiv'>
          <button onClick={props.onHide} className='closeBtn button'>
            {t('close')}
          </button>
          <button
            type='submit'
            form='order-form'
            className='sendOrderBtn button solid__btn'
          >
            {submitting ? t('sendingOrder') : t('sendOrder')}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
