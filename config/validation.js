const validator = require('validator');
const { isEmpty } = require('./is-empty');

module.exports = {
  validationReview: (data) => {
    const errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.review = !isEmpty(data.review) ? data.review : '';

    if (!validator.isLength(data.username, { min: 4, max: 16 })) errors.username = 'Input length name {min: 4, max: 16}';

    if (validator.isEmpty(data.username)) errors.username = 'Please check input username';
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

    if (!validator.isLength(data.username, { min: 4, max: 16 })) errors.username = 'Input length username {min: 4, max: 16}';
    if (!validator.isLength(data.phoneNumber, { min: 10, max: 13 })) errors.phoneNumber = 'Input length phoneNumber {min: 10, max: 13}';
    if (!validator.isLength(data.time, { min: 4, max: 8 })) errors.time = 'Input length name {min: 4, max: 8}';

    if (validator.isEmpty(data.username)) errors.username = 'Please check input username';
    if (validator.isEmpty(data.phoneNumber)) errors.phoneNumber = 'Please check input phoneNumber';
    if (validator.isEmpty(data.date)) errors.date = 'Please check input date';
    if (validator.isEmpty(data.time)) errors.time = 'Please check input time';

    if (Object.keys(errors).length === 0) return { isValid: true };

    return { errors, isValid: isEmpty(errors) };
  },
};
