import express from 'express';
import {
  create,
  findOne,
  findAll,
  updateUser,
  deleteUser,
  login,
  getAllUserDocuments
} from '../controllers/users';
import auth from '../middlewares/auth';
import { isAdmin, targetIsAdmin } from '../helpers/helper';

const userRouter = express.Router();


userRouter.route('/api/v1/users')
    .get(auth, isAdmin, findAll)
    .post(create);

userRouter.route('/api/v1/users/:id')
    .all()
    .get(auth, isAdmin, findOne)
    .put(auth, isAdmin, targetIsAdmin, updateUser)
    .delete(auth, isAdmin, targetIsAdmin, deleteUser);

userRouter.post('/api/v1/users/login', login);

userRouter.get('/api/v1/users/:id/documents', auth, isAdmin,
targetIsAdmin, getAllUserDocuments);

export default userRouter;

