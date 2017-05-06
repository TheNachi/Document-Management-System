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
     * /api/v1/users:
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
     *  /api/v1/users/?limit=4&offset=2:
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
     * /api/v1/users:
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
   * /api/v1/users/1:
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
     * /api/v1/users/1:
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
     * /api/v1/users/1:
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

  /**
   * @swagger
   * /api/v1/users/{param}/documents:
   *    get:
   *      description: Returns the documents belonging to the user of id 1
   *      tags:
   *        - Get Documents of A User
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
   *          description: user's documents
   *          schema:
   *            type: array
   */
userRouter.route('/users/:id/documents')
    .get(auth.verifyToken, Documents.userDocuments);
userRouter.route('/search/users')
    .get(auth.verifyToken, Users.search);
userRouter.route('/users/logout')
    .post(Users.logout);

export default userRouter;
