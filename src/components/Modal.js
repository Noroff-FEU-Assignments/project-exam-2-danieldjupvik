import Modal from 'react-bootstrap/Modal';
import { orderSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { baseUrl } from '../utils/api';
import axios from 'axios';

import red from '@material-ui/core/colors/red';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const OrderModal = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);

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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(orderSchema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setOrderError(null);
    try {
      const response = await axios.post(`${baseUrl}/orders`, {
        name: data.name,
        guests: data.guests,
        check_in: startDate,
        check_out: endDate,
        place_id: props.id,
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
              <p className='label'>Name</p>
              <input
                type='text'
                name='name'
                placeholder='Name'
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
              <LocalizationProvider dateAdapter={DateFnsUtils}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <DatePicker
                    label='Check In'
                    inputVariant='outlined'
                    inputFormat={'dd/MM/yyyy'}
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setTomorrowDate(date);
                    }}
                    minDate={new Date()}
                    showToolbar
                    renderInput={(props) => <TextField {...props} />}
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </div>

            <div className='groupForm'>
              <LocalizationProvider dateAdapter={DateFnsUtils}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <MobileDatePicker
                    label='Check Out'
                    inputVariant='outlined'
                    inputFormat={'dd/MM/yyyy'}
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={new Date()}
                    renderInput={(props) => <TextField {...props} />}
                  />
                </ThemeProvider>
              </LocalizationProvider>
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
