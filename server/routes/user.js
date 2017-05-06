import express from 'express';
import Users from '../controllers/users';
import Documents from '../controllers/documents';
import auth from '../middlewares/auth';

const userRouter = express.Router();

userRouter.route('/')
  .get((req, res) => {
    res.status(200).send({
      message: 'Welcome to Document Management System API'
    });
  });

  /**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - firstname
 *       - lastname
 *       - username
 *       - email
 *       - password
 *     properties:
 *       firstname:
 *         type: string
 *         example: Han
 *       lastname:
 *         type: string
 *         example: Solo
 *       username:
 *         type: string
 *         example: g-pirate
 *       password:
 *         type: string
 *         format: password
 *         example: millenium-falcon
 *       email:
 *         type: string
 *         example: hansolo@documan.api
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 *   NewLogin:
 *    type: object
 *    required:
 *      - email
 *      - password
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *        format: password
 *   Login:
 *    allOf:
 *      - $ref: '#/definitions/NewLogin'
 *
 */

userRouter.route('/users')
    /**
     * @swagger
     * /users:
     *    get:
     *      description: Returns all users
     *      tags:
     *        - Get users
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
   /** @swagger
     *  /users/?limit=4&offset=2:
     *   get:
     *     description: Returns {limit} users from the the {offset}
     *     tags:
     *       - Get users
     *     produces:
     *        - application/json
     *     parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *     responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
    .get(auth.verifyToken, Users.list)
    /**
     * @swagger
     * /users:
     *   post:
     *     description: Creates a user
     *     tags:
     *      - Create User
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/User'
     */
    .post(auth.validateUserInput, Users.create);

userRouter.route('/users/:id')
  /**
   * @swagger
   * /users/1:
   *    get:
   *      description: Returns the user with the id of 1
   *      tags:
   *        - Get user
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: Authorization
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   */
    .get(auth.verifyToken, Users.retrieve)
    /**
     * @swagger
     * /users/1:
     *   put:
     *     description: Creates a user
     *     tags:
     *      - Update User
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: Authorization
     *         in: header
     *         description: an authorization header
     *         required: true
     *         type: string
     *       - name: body
     *         description: User object
     *         in:  body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewUser'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/User'
     */
    .put(auth.verifyToken, Users.update)

    /**
     * @swagger
     * /users/1:
     *    delete:
     *      description: Deletes the user with the id of 1
     *      tags:
     *        - Delete user
     *      produces:
     *        - application/json
     *      parameters:
     *        - name: Authorization
     *          in: header
     *          description: an authorization header
     *          required: true
     *          type: string
     *      responses:
     *        200:
     *          description: users
     *          schema:
     *            type: array
     *            items:
     *              $ref: '#/definitions/User'
     */
    .delete(auth.verifyToken, auth.permitAdmin, Users.destroy);

  /**
   * @swagger
   * /api/v1/users/login:
   *   post:
   *     description: Logs in a user
   *     tags:
   *      - Login User
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: Authorization
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: body
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewLogin'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *          type: object,
   *          items:
   *            $ref: '#/definitions/Login'
   */
userRouter.route('/users/login')
      .post(auth.validateLoginInput, Users.login);

  // Find all documents belonging to the user.
/**
 * @swagger
 * definitions:
 *   NewFetchDoc:
 *     type: object
 *   FetchDoc:
 *     allOf:
 *       - $ref: '#/definitions/NewFetchDoc'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRouter.route('/users/:id/documents')
  /**
   * @swagger
   * /users/{id}/documents:
   *   get:
   *     description: Returns the documents of a particular user
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The user's id
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/FetchDoc'
   */
    .get(auth.verifyToken, Documents.userDocuments);
  // Search for a user
  /**
   * @swagger
   * definitions:
   *   NewSearchUser:
   *     type: object
   *   SearchUser:
   *     allOf:
   *       - $ref: '#/definitions/NewSearchUser'
   *       - required:
   *         - id
   *       - properties:
   *         id:
   *           type: integer
   *           format: int64
   */
userRouter.route('/search/users')
  /**
   * @swagger
   * /search/users/?q={username}:
   *   get:
   *     description: Returns the documents of a particular user
   *     tags:
   *      - Find Users
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: username
   *         description: The user's username
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/SearchUser'
   */
    .get(auth.verifyToken, Users.search);
    // logs out a user
  /**
   * @swagger
   * definitions:
   *   NewLogout:
   *     type: object
   *   Logout:
   *     allOf:
   *       - $ref: '#/definitions/NewLogout'
   *       - required:
   *         - id
   *       - properties:
   *         id:
   *           type: integer
   *           format: int64
   */
userRouter.route('/users/logout')
    .post(Users.logout);

export default userRouter;
