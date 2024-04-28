import {
  validateAndCheckAge,
  validatePostalCode,
  validateName,
  validateMail,
} from './validator';

describe('Validator Functions', () => {
  /**
   * @function validateAndCheckAge
   */
  describe('validateAndCheckAge', () => {
    test('should return false for invalid date format', () => {
      expect(validateAndCheckAge('not-a-date')).toBeFalsy();
    });

    test('should return false for age under 18', () => {
      const underageDate = new Date();
      underageDate.setFullYear(underageDate.getFullYear() - 17);
      expect(validateAndCheckAge(underageDate.toISOString())).toBeFalsy();
    });

    test('should return true for age 18 and over', () => {
      const ofAgeDate = new Date();
      ofAgeDate.setFullYear(ofAgeDate.getFullYear() - 18);
      expect(validateAndCheckAge(ofAgeDate.toISOString())).toBeTruthy();
    });
  });

  /**
   * @function validatePostalCode
   */
  describe('validatePostalCode', () => {
    const validPostalCode = ['12345', '06000', '91000', '83000'];
    test.each(validPostalCode)(
      'should return true for a valid postal code',
      (postalCode) => {
        expect(validatePostalCode(postalCode)).toBeTruthy();
      }
    );

    test('should return false for a short postal code', () => {
      expect(validatePostalCode('1234')).toBeFalsy();
    });

    test('should return false for a long postal code', () => {
      expect(validatePostalCode('123456')).toBeFalsy();
    });

    test('should return false for a postal code containing letter', () => {
      expect(validatePostalCode('abcd5')).toBeFalsy();
    });

    test('should return false for an empty string', () => {
      expect(validatePostalCode('')).toBeFalsy();
    });
  });

  /**
   * @function validateName
   */
  describe('validateName', () => {
    const validNames = ['Jean', 'Christophe', 'Leo', 'Lucas'];
    test.each(validNames)('should return true for a classic name', (name) => {
      expect(validateName(name)).toBeTruthy();
    });

    test('should return true for a valid name with -', () => {
      expect(validateName('Jean-Luc')).toBeTruthy();
    });

    test('should return true for a valid name with spaces', () => {
      expect(validateName('Marie Claire')).toBeTruthy();
    });

    test('should return true for a name with accent', () => {
      expect(validateName('Léo')).toBeTruthy();
    });

    test('should return false for a name with numbers', () => {
      expect(validateName('Jean123')).toBeFalsy();
    });

    test('should return false for a name with special characters', () => {
      expect(validateName('Jean-Luc!')).toBeFalsy();
    });

    test('should return false for an empty string', () => {
      expect(validateName('')).toBeFalsy();
    });
  });
});

/**
 * @function validateMail
 */
describe('validateMail', () => {
  const validMailAddress = [
    'email@example.com',
    'christophe@gmail.com',
    'leo@gmail.com',
    'lucas@gmail.com',
  ];
  test.each(validMailAddress)(
    'should return true for a valid email',
    (mail) => {
      expect(validateMail(mail)).toBeTruthy();
    }
  );

  test('should return true for a valid email with dot in first part', () => {
    expect(validateMail('name.surname@example-domain.com')).toBeTruthy();
  });

  test('should return true for a valid email with (-) in first part', () => {
    expect(validateMail('name-surname@example-domain.com')).toBeTruthy();
  });

  test('should return true for a valid email with subdomain', () => {
    expect(validateMail('email@example.domain.com')).toBeTruthy();
  });

  test('should return true for a valid email with composed domain', () => {
    expect(validateMail('email@example-domain.com')).toBeTruthy();
  });

  test('should return false for email without domain extension', () => {
    expect(validateMail('email@example')).toBeFalsy();
  });

  test('should return false for email without dot', () => {
    expect(validateMail('email@.com')).toBeFalsy();
  });

  test('should return false for email with double dot', () => {
    expect(validateMail('email@example..com')).toBeFalsy();
  });

  test('should return false for email without domain', () => {
    expect(validateMail('email@.com')).toBeFalsy();
  });

  test('should return false for email without local part', () => {
    expect(validateMail('@example.com')).toBeFalsy();
  });

  test('should return false for email without @', () => {
    expect(validateMail('email.com')).toBeFalsy();
  });

  test('should return false for empty string', () => {
    expect(validateMail('')).toBeFalsy();
  });
});
