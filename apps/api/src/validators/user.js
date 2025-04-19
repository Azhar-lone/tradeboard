import { check, body } from 'express-validator';
import dns from 'dns';
import { promisify } from 'util';
export const loginValidation = [
  // email
  check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('not a valid email'),
  check('password')
    .exists()
    .withMessage('password is required')
    .trim()
    .escape(),
];

const allowedDomains = [
  // 'test.com',
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'protonmail.com',
];

const checkEmailDomain = (email) => {
  const domain = email.split('@')[1];
  return allowedDomains.includes(domain);
};
const lookupMxRecords = async (domain) => {
  const resolveMx = promisify(dns.resolveMx);
  try {
    const addresses = await resolveMx(domain);
    return addresses && addresses.length > 0;
  } catch (err) {
    return false;
  }
};

export const signUpValidation = [
  // email
  body('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('not a valid email')
    .custom(async (value) => {
      if (!checkEmailDomain(value)) {
        throw new Error('not an allowed domain');
      }
      const domain = value.split('@')[1];
      if (!(await lookupMxRecords(domain))) {
        throw new Error('email domain does not have valid MX records');
      }
      return true;
    }),

  // password
  body('password')
    .exists()
    .withMessage('password is required')
    .trim()
    .isStrongPassword()
    .withMessage('not a strong password')
    .isLength({ max: 16, min: 8 })
    .withMessage('not a valid length')
    .escape(),

  // confirm password
  body('confirmPassword')
    .exists()
    .withMessage('confirm password is required')
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password didn't match");
      }
      return true;
    }),

  // user name
  body('userName')
    .exists()
    .withMessage('user name is required')
    .isString()
    .withMessage('not a valid string')
    .isLength({ max: 16 })
    .withMessage('not a valid length')
    .isSlug()
    .withMessage('not a valid userName')
    .escape(),

  // role
  body('role')
    .optional()
    .isIn(['SUPER_USER', 'COMPANY_ADMIN', 'MANAGER','STAFF'])
    .withMessage(
      'Invalid role. Allowed roles are   SUPER_USER,COMPANY_ADMIN,MANAGER,STAFF',
    ),
];

export const validateIds = (isRequired) => {
  return [
    check('ids')
      .optional({ checkFalsy: true }) // Allows `ids` to be optional by default
      .isArray()
      .withMessage('ids must be an array')
      .custom((value, { req }) => {
        if (isRequired && (!value || value.length === 0)) {
          throw new Error('ids are required for delete operation');
        }
        return true;
      }),
    check('ids.*')
      .optional() // If `ids` exists, this validates each element
      .isString()
      .withMessage('Each id must be a string')
      .matches(/^c[a-z0-9]{24,}$/)
      .withMessage('Each id must be a valid CUID'),
  ];
};
