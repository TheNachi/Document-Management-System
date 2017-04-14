import express from 'express';
import user from '../controllers/users';
// import auth from '../middlewares/auth';

const userRouter = express.Router();

// landing page
userRouter.route('/')
  .get((req, res) => {
    res.status(200).send({
      message: 'Welcome to Document Management System API'
    });
  });

// creates a new user
userRouter.route('/users')
  // .get(// auth, auth.validateSearch,
  //      user.getAll
  //      )
  .post(user.create);

// // logs in a user
// userRouter.route('/users/login')
//   .post(auth.validateLoginInput, user.login);

// // logs out a user
// userRouter.route('/users/logout')
//   .post(auth.verifyToken, user.logout);

// // Find user, update user attributes and delete user.
// userRouter.route('/users/:id')
//   .get(auth.verifyToken, auth.getSingleUser, user.getUser)
//   .put(auth.verifyToken, auth.validateUserUpdate, user.update)
//   .delete(auth.verifyToken,
//     auth.hasAdminPermission,
//     auth.validateDeleteUser,
//     user.delete);

// // Find all documents belonging to the user.
// userRouter.route('/users/:id/documents')
//   .get(auth.verifyToken, auth.validateSearch, user.findUserDocuments);

// // Search for a user
// userRouter.route('/search/users')
//   .get(auth.verifyToken, auth.getUserName, user.getUserName);

export default userRouter;
