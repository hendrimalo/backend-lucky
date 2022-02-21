const moment = require('moment');
const momentTZ = require('moment-timezone');

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = moment(startDate);
  const targetDate = moment(stopDate);
  while (currentDate <= targetDate) {
    dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

function dateJakarta() {
  return momentTZ(new Date()).tz('Asia/Jakarta').format('YYYY-MM-DD');
}

function threeDays() {
  return moment(new Date()).add(3, 'days');
}

module.exports = { getDates, dateJakarta, threeDays };
