/* eslint-disable no-unused-expressions */

module.exports = {
  isEmpty: (value) => {
    if (value === undefined
      || value === null
      || value === ''
      || value === 0
      || (typeof value === 'object' && Object.keys(value).length === 0)
      || (typeof value === 'string' && value.trim().length === 0)) return true;
  },
};
