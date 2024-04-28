/**
 * Validates whether the provided date corresponds to an age of at least 18 years.
 *
 * @param {string} date - The birth date to validate, in string format.
 * @returns {boolean} Returns `true` if the calculated age is at least 18 years, `false` otherwise.
 */
export function validateAndCheckAge(date) {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - dateObj.getFullYear();
  const monthDiff = today.getMonth() - dateObj.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dateObj.getDate())
  ) {
    age--;
  }

  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}

/**
 * Validates if the provided postal code is in the French format (5 digits).
 *
 * @param {string} postalCode - The postal code to validate.
 * @returns {boolean} Returns `true` if the postal code is in the correct format, `false` otherwise.
 */
export function validatePostalCode(postalCode) {
  const regexPostalCode = /^[0-9]{5}$/;
  return regexPostalCode.test(postalCode);
}

/**
 * Validates if the provided value is a valid name, allowing letters, spaces, accents, and certain special characters.
 *
 * @param {string} valeur - The name or first name to validate.
 * @returns {boolean} Returns `true` if the value is a valid name, `false` otherwise.
 */
export function validateName(valeur) {
  const regexName =
    /^[a-zA-ZàâäéèêëïîôöùûüÿçœæÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇŒÆ-]+(\s[a-zA-ZàâäéèêëïîôöùûüÿçœæÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇŒÆ-]+)*$/;
  return regexName.test(valeur);
}

/**
 * Validates if the provided email is in the correct format.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns `true` if the email is in a valid format, `false` otherwise.
 */
export function validateMail(email) {
  const regexMail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexMail.test(email);
}
