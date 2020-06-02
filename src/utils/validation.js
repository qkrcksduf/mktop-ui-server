function validateEmail(email) {
  var regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}

function validateCellPhoneNumber(cellPhoneNumber) {
  var regExp = /^d{3}-\d{3,4}-\d{4}$/;
  return regExp.test(String(cellPhoneNumber));
}

function validatePhoneNumber(phoneNumber) {
  var regExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return regExp.test(String(phoneNumber));
}

export { validateEmail, validatePhoneNumber, validateCellPhoneNumber };
