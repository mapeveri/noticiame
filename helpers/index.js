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

module.exports = {
  formatDate,
};
