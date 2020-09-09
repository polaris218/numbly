import React from 'react';
import { Redirect } from 'react-router-dom';
import { withFormik } from 'formik';
import Button from 'ui/Button';
import Image from 'ui/Image';
import Textarea from 'ui/Textarea';
import DisableScroll from 'ui/DisableScroll';
import schema from './formSchema';

const AdCreation = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        location: { state }
    } = props;

    const onBlur = (...args) => {
        handleBlur(...args);
        window.scrollTo(0, 0);
    };

    if (!state) {
        return (
            <Redirect to="/" />
        );
    }

    const { fullImage } = state;
    const image = fullImage
        ? state.image
        : `${ process.env.REACT_APP_STORAGE_URL }posts/${ state.image }`; 
    
    return (
        <DisableScroll>
            <div className="create-post">
                <h2 className="create-post__title">Create an ad</h2>
                <div className="container container--limited create-post__wrap">
                    <Image classes="create-post__img" src={ image } alt="" />
                    <form onSubmit={ handleSubmit } autoComplete="off">
                        <Textarea 
                            name="description" 
                            onChange={ handleChange }
                            onBlur={ onBlur }
                            setValues={ setValues }
                            value={ values.description }
                            error={ touched.description && errors.description }
                        />
                        <div className="create-post__buttons create-post__buttons--centered">
                            <Button type="submit" classes="create-post__btn" center block accent>Continue</Button>
                        </div>
                    </form>
                </div>
            </div>
        </DisableScroll>
    );
};

export default withFormik({
    mapPropsToValues: props => {
        const { location: { state } } = props;
        return ({ 
            description: state ? state.caption : ''
        });
    },  
    handleSubmit: (values, { setSubmitting, props }) => {
        const { location: { state, pathname }, history } = props;
        setSubmitting(false);
        const image = state.fullImage
            ? state.image
            : `${ process.env.REACT_APP_STORAGE_URL }posts/${ state.image }`;        
        const id = state.id;
        history.replace(`/ads/audience?id=${ id }`, {
            id: state.id,
            image: image,
            caption: values.description,
            prevPage: pathname
        });
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: schema,
    displayName: 'AdCreation',
  })(AdCreation);