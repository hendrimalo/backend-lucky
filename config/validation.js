const validator = require('validator');
const { isEmpty } = require('./is-empty');

module.exports = {
  validationReview: (data) => {
    const errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.review = !isEmpty(data.review) ? data.review : '';

    if (!validator.isLength(data.name, { min: 4, max: 16 })) errors.name = 'Please check input name';

    if (validator.isEmpty(data.name)) errors.name = 'Please check input name';
    if (validator.isEmpty(data.review)) errors.review = 'Please check input review';

    if (Object.keys(errors).length === 0) return { isValid: true };

    return { errors, isValid: isEmpty(errors) };
  },
  validationReservation: (data) => {
    const errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.date = !isEmpty(data.date) ? data.date : '';
    data.time = !isEmpty(data.time) ? data.time : '';

    if (!validator.isLength(data.username, { min: 4, max: 16 })) errors.username = 'Please check input username';
    if (!validator.isLength(data.phoneNumber, { min: 10, max: 13 })) errors.phoneNumber = 'Please check input phoneNumber';
    if (!validator.isLength(data.time, { min: 4, max: 8 })) errors.time = 'Please check input time';

    if (validator.isEmpty(data.username)) errors.username = 'Please check input username';
    if (validator.isEmpty(data.phoneNumber)) errors.phoneNumber = 'Please check input phoneNumber';
    if (validator.isEmpty(data.date)) errors.date = 'Please check input date';
    if (validator.isEmpty(data.time)) errors.time = 'Please check input time';

    if (Object.keys(errors).length === 0) return { isValid: true };

    return { errors, isValid: isEmpty(errors) };
  },
};
