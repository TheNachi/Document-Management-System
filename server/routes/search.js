import express from 'express';
import { searchDoc, searchUser } from '../controllers/search';
import auth from '../middlewares/auth';
import { isAdmin } from '../helpers/helper';

const searchRouter = express.Router();


searchRouter.get('/api/search/documents', auth, isAdmin, searchDoc);
searchRouter.get('/api/search/users', auth, isAdmin, searchUser);

export default searchRouter;

