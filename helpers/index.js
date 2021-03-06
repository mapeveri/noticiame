const moment = require('moment');

/**
* @method formatDate
* @description format date
* @param {*} d object date
*/
function formatDate(d) {
  let value = '';
  if (typeof (d) === 'object') {
    value = moment(d).format('DD/MM/YYYY');
  }

  return value;
}

/**
* @method isDivisor2
* @description Is multiple of 2
* @param {*} num1 index
*/
function isDivisor2(num1) {
  return num1 % 2 === 0;
}

/**
* @method capitalize
* @description Capitalize string
* @param {*} value
*/
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

module.exports = {
  formatDate,
  isDivisor2,
  capitalize,
};
