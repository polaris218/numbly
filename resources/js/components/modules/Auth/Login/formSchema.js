/**
 * @deprecated
 */

import * as yup from 'yup';

export default yup.object().shape({
    email: yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password is too short')
});