import express from 'express';
import Roles from '../controllers/roles';
import auth from '../middlewares/auth';

const roleRouter = express.Router();


roleRouter.route('/roles')
    .get(auth.verifyToken, auth.permitAdmin, Roles.list)
    .post(auth.verifyToken, auth.permitAdmin, Roles.create);

roleRouter.route('/roles/:id')
    .get(auth.verifyToken, auth.permitAdmin, Roles.retrieve)
    .put(auth.verifyToken, auth.permitAdmin, Roles.update)
    .delete(auth.verifyToken, auth.permitAdmin, Roles.destroy);


export default roleRouter;

