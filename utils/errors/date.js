class ValidationDate extends Error {
  constructor(message) {
    super(message);
    this.name = 'Validation Date';
  }
}

module.exports = { ValidationDate };
