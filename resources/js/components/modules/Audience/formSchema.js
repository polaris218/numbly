import * as yup from 'yup';

function greaterThanRef(ref, msg) {
	return this.test({
		name: 'equalTo',
		exclusive: false,
        message: msg || '${path} must be the same as ${reference}',
		params: {
			reference: ref.path
		},
		test: function(value) {
            return value >= this.resolve(ref); 
		}
	});
};

yup.addMethod(yup.number, 'greaterThanRef', greaterThanRef);

export default (...args) => {
    return yup.object().shape({
        minAge: yup.number()
            .required('Please specify the age.')
            .min(18, 'Minimum age should not be less than 18.')
            .max(60, 'Minimum age should not be greater than 60.')
            .integer('Age fields should be integers.'),
        maxAge: yup.number()
            .required('Please specify the age.')
            .min(18, 'Minimum age should not be less than 18.')
            .max(60, 'Minimum age should not be greater than 60.')
            .integer('Age fields should be integers.')
            .greaterThanRef(yup.ref('minAge'), 'Minimum age should not be greater than maximum age.')
    });
};