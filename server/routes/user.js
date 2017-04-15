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

userRouter.route('/')
  .get((req, res) => {
    res.status(200).send({
      message: 'Welcome to Document Management System API'
    });
  });

userRouter.route('/api/users')
    .get(auth, isAdmin, findAll)
    .post(create);

userRouter.route('/api/users/:id')
    .all()
    .get(auth, isAdmin, findOne)
    .put(auth, isAdmin, targetIsAdmin, updateUser)
    .delete(auth, isAdmin, targetIsAdmin, deleteUser);

userRouter.post('/api/users/login', login);

userRouter.get('/api/users/:id/documents', auth, isAdmin,
targetIsAdmin, getAllUserDocuments);

export default userRouter;

