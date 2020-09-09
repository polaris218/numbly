/**
 * @deprecated
 */

import React from 'react';
import { withFormik } from 'formik';

import Button from 'ui/Button';
import Input from 'ui/Input';
import { ReactComponent as UserPic } from 'assets/svg/user.svg';
import { ReactComponent as PasswordPic } from 'assets/svg/password.svg';
import schema from './formSchema';

const LoginForm = props => {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      back
    } = props;

    return (
        <form onSubmit={ handleSubmit } autoComplete="off">
            <Input 
                classes="nimbly-login__input"
                name="email"
                type="email" 
                icon={ UserPic } 
                label="Your email" 
                onChange={ handleChange } 
                onBlur={ handleBlur }
                value={ values.email }
                error={ touched.email && errors.email }
            />
            <Input 
                classes="nimbly-login__input"
                name="password"
                type="password" 
                icon={ PasswordPic } 
                label="Your password" 
                onChange={ handleChange } 
                onBlur={ handleBlur }
                value={ values.password }
                error={ touched.password && errors.password }
            />
            <Button 
                classes="nimbly-login__button"
                type="submit" 
                accent 
                block 
            >Login</Button>
            <Button
                block
                type="button"
                ghost
                onClick={ back }
            >
                Go back
            </Button>
        </form>
    );
};

export default withFormik({
    mapPropsToValues: () => ({ 
        email: '',
        password: ''
    }),  
    handleSubmit: (values, { setSubmitting, props }) => {
        const { callback } = props;
        setSubmitting(false);
        if (callback) {
            callback(values);
        }
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: schema,
    displayName: 'BasicForm',
  })(LoginForm);