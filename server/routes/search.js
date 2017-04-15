import express from 'express';
import { searchDoc, searchUser } from '../controllers/search';
import auth from '../middlewares/auth';
import { isAdmin } from '../helpers/helper';

const searchRouter = express.Router();


searchRouter.get('/api/v1/search/documents', auth, isAdmin, searchDoc);
searchRouter.get('/api/v1/search/users', auth, isAdmin, searchUser);

export default searchRouter;


