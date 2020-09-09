import React from 'react';
import { Redirect } from 'react-router-dom';
import { withFormik } from 'formik';
import Button from '@/ui/Button';
import Image from '@/ui/Image';
import Textarea from '@/ui/Textarea';
import DisableScroll from '@/ui/DisableScroll';
import schema from './formSchema';
import Modal from './Modal';

const PostCreation = props => {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setValues,
      setFieldValue,
      submitForm,
      location: { state },
      modal,
      history,
      hideModal,
    } = props;

    const onBlur = (...args) => {
        handleBlur(...args);
        window.scrollTo(0, 0);
    };

    const onCreateAd = () => {
        setFieldValue('type', 'ad');
        submitForm();
    };

    const onPost = () => {
        setFieldValue('type', 'post');
        submitForm();
    };

    if (!state) {
        return (
            <Redirect to="/" />
        );
    }

    const image = state.image;
    
    return (
        <DisableScroll>
            <div className="create-post">
                <h2 className="create-post__title">Save a post</h2>
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
                        <div className="create-post__buttons">
                            <Button 
                                gray
                                block 
                                center 
                                classes="create-post__btn" 
                                onClick={ onPost }
                            >
                                Save
                            </Button>
                            <Button 
                                block 
                                center 
                                accent 
                                classes="create-post__btn" 
                                onClick={ onCreateAd }
                            >
                                Create an ad
                            </Button>
                        </div>
                    </form>
                    <Modal shown={ modal } history={ history } hideModal={ hideModal } />
                </div>
            </div>
        </DisableScroll>
    );
};
export default withFormik({
    mapPropsToValues: props => {
        const { location: { state } } = props;
        return ({ 
            description: state ? state.caption : '',
            type: 'post'
        });
    },  
    handleSubmit: (values, { setSubmitting, props }) => {
        const { createPost, history, location: { state, pathname } } = props;
        setSubmitting(false);
        const { type, description } = values;
        const { image, id } = state;
        if (type === 'ad') {
            // createAd({
            //     image: state.image,
            //     caption: values.description
            // });
            history.replace(`/ads/audience?id=${ id }`, {
                id: state.id,
                image: image,
                caption: description,
                prevPage: pathname
            });
            return;
        }
        createPost({
            image,
            caption: description
        });
    },
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: schema,
    displayName: 'BasicForm',
  })(PostCreation);