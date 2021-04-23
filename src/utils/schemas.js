import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  identifier: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password'),
});

export const orderSchema = yup.object().shape({
  name: yup.string().min(2).required('Please provide a name'),
  guests: yup
    .number()
    .integer()
    .min(1, 'Must be at least 1 guest')
    .max(20)
    .required('Please provide number of guests')
    .typeError('Please provide number of guests'),
});
