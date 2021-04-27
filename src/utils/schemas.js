import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  identifier: yup.string().required('Please enter your username'),
  password: yup.string().required('Please enter your password'),
});

export const contactSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email().required('Please enter your email'),
  message: yup
    .string()
    .required('Please enter a message')
    .min(10, 'Message must be at least 10 characters'),
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

export const reviewSchema = yup.object().shape({
  name: yup.string().required('Please enter your name'),
  description: yup.string().required('Please enter a description'),
});
