/* eslint-disable no-param-reassign */
const validator = require('./errors/date');
const moment = require('moment');

module.exports = {
  validateReservation: (date, dformat, time, tformat) => {
    let valid = false;
    valid = moment(date, dformat, true).isValid();
    if (!valid) {
      throw new validator.ValidationDate('format date is invalid');
    }
    valid = moment(time, tformat).isValid;
    if (!valid) {
      throw new validator.ValidationDate('format time is invalid');
    }

    const dateYMD = moment(date, dformat).format('YYYY-MM-DD');
    const reservation = moment(dateYMD);
    const nowYMD = moment().format('YYYY-MM-DD');
    const now = moment(nowYMD);

    const diff = reservation.diff(now, 'days');
    if (diff >= 14) {
      throw new validator.ValidationDate('maximum reservation period of 14 days');
    } else if (diff === 0) {
      const timeHms = moment(time, tformat);
      const nowHms = new Date();

      const subHour = timeHms.hours() - nowHms.getHours() === 0;
      const subMinute = timeHms.minutes() < nowHms.getMinutes();
      if (subHour && subMinute) {
        throw new validator.ValidationDate('reservation time has passed');
      }
    }
    return true;
  },
};
