function isValidText(value, minLength = 1) {
    return value && value.trim().length >= minLength;
  }
  function isValidEmail(value) {
    return value && value.includes('@');
  }
  function isValidDate(value) {
    const date = new Date(value);
    return value && date !== 'Invalid Date';
  }
  exports.isValidText = isValidText;
  exports.isValidEmail = isValidEmail;
  exports.isValidDate= isValidDate;