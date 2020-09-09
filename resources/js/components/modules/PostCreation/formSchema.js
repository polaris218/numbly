import * as yup from 'yup';

export default yup.object().shape({
    description: yup.string()
        .required('Please provide a description to save the post')
});