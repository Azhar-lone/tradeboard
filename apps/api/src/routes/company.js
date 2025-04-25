import express from 'express';
import { UserAuth, isSuperUser, isCompanyAdmin } from '../middlewares/auth.js';

const companyRouter = express.Router({ strict: true });

companyRouter.use(UserAuth);

companyRouter.use(isCompanyAdmin);
companyRouter.post(
  '/add-users',
  addCompanyValidation,
  validationError,
  AddCompanyUsers,
);

companyRouter.use(isSuperUser);
companyRouter.post('/admin', addCompanyValidation, validationError, AddCompany);
companyRouter.get('/admin', validateIds(false), validationError, getCompany);
companyRouter.delete(
  '/admin',
  validateIds(true),
  validationError,
  deleteCompany,
);
companyRouter.put('/admin', updateCompany);

export default companyRouter;
