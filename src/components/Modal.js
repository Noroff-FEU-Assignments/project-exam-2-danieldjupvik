import Modal from 'react-bootstrap/Modal';
import { orderSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { baseUrl } from '../utils/api';
import axios from 'axios';

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
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [errorDate, setErrorDate] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [endDate, setEndDate] = useState(tomorrow);
  // console.log(startDate);
  // console.log(endDate);

  const setTomorrowDate = (date) => {
    const today = date;
    const tomorrow = new Date(today);
    setEndDate(tomorrow.setDate(tomorrow.getDate() + 1));
  };

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(orderSchema),
  });

  const onSubmit = async (data) => {
    setOrderError(null);
    if (startDate && endDate) {
      setSubmitting(true);
      console.log(data);
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
        console.log(response);
        if (response.status) {
          props.onHide();
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
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          // style={{ maxWidth: '350px', margin: '0 auto', marginTop: '30px' }}
        >
          {orderError && (
            <p
              style={{
                width: 'fit-content',
                margin: '0 auto',
                borderBottom: '1px solid red',
                paddingBottom: '10px',
              }}
            >
              Something went wrong...
            </p>
          )}
          <fieldset disabled={submitting} className='fieldset'>
            <div className='groupForm'>
              <p className='label'>Full name</p>
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
              <p className='label'>Guests</p>
              <input
                type='number'
                name='guests'
                defaultValue={1}
                ref={register}
                className='inputElem'
              />
              {errors.guests && <p>{errors.guests.message}</p>}
            </div>

            <div className='groupForm'>
              {errorDate ? <p>Both check in and out is required</p> : null}

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    id={'startDate'}
                    autoOk
                    label='Check In'
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
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    id={'endDate'}
                    autoOk
                    label='Check Out'
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
            </div>
            <button onClick={props.onHide} className='submitBtn'>
              Close
            </button>
            <button type='submit' className='submitBtn'>
              {submitting ? 'Sending order...' : 'Send order'}
            </button>
          </fieldset>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
