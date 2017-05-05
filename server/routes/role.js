import express from 'express';
import rolesController from '../controllers/roles';
import auth from '../middlewares/auth';

const roleRouter = express.Router();


roleRouter.route('/roles')
    .get(auth.verifyToken, auth.permitAdmin, rolesController.create)
    .post(auth.verifyToken, auth.permitAdmin, rolesController.create);

roleRouter.route('/roles/:id')
    .get(auth.verifyToken, auth.permitAdmin, rolesController.retrieve)
    .put(auth.verifyToken, auth.permitAdmin, rolesController.update)
    .delete(auth.verifyToken, auth.permitAdmin, rolesController.destroy);


export default roleRouter;

