const moment = require('moment');

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

function threeDays() {
  return moment(new Date()).add(3, 'days');
}

function getNowDate() {
  const date = moment(new Date()).format('YYYY-MM-DD');
  return date;
}

function getNowTime() {
  const time = moment(new Date()).format('hh:mm');
  return time;
}

module.exports = {
  getDates, threeDays, getNowDate, getNowTime,
};
