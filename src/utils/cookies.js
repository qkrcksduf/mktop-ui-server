function saveAuthCookie(value) {
  document.cookie = `auth=${value}`;
}

function saveUserToCookie(value) {
  document.cookie = `user=${value}`;
}

function saveUserIdToCookie(value) {
  document.cookie = `user_id=${value}`;
}

function saveCompanyToCookie(value) {
  document.cookie = `company=${value}`;
}

function getUserIdFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user_id\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getCompanyFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)company\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveCompanyToCookie,
  saveAuthCookie,
  saveUserToCookie,
  saveUserIdToCookie,
  getUserFromCookie,
  getAuthFromCookie,
  getUserIdFromCookie,
  getCompanyFromCookie,
  deleteCookie,
};
