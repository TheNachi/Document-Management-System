import express from 'express';
import Documents from '../controllers/documents';
import auth from '../middlewares/auth';

const documentRouter = express.Router();

/**
 * @swagger
 * definitions:
 *   NewDocument:
 *     type: object
 *     required:
 *       - title
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: text
 *   Document:
 *     allOf:
 *       - $ref: '#/definitions/NewDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
documentRouter.route('/documents')
    /** @swagger
      *  /api/v1/documents/?limit=4&offset=2:
      *   get:
      *     description: Returns {limit} documents from the the {offset}
      *     tags:
      *       - Get documents
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
      *          description: get documents from the database
      *          schema:
      *            type: array
      *            items:
      *              $ref: '#/definitions/Document'
      */
    .get(auth.verifyToken, Documents.list)

    /**
     * @swagger
     * /api/v1/documents:
     *   post:
     *     description: Creates a document
     *     tags:
     *      - Create Document
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
     *           $ref: '#/definitions/NewDocument'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Document'
     */
    .post(auth.verifyToken, Documents.create);

documentRouter.route('/documents/:id')
    /** @swagger
      *  /api/v1/documents/:id:
      *   get:
      *     description: Returns {limit} documents from the the {offset}
      *     tags:
      *       - Get single document
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
      *          description: get documents from the database
      *          schema:
      *            type: array
      *            items:
      *              $ref: '#/definitions/Document'
      */
    .get(auth.verifyToken, Documents.retrieve)

    /**
     * @swagger
     * /api/v1/documents/:id:
     *   put:
     *     description: Update  a document
     *     tags:
     *      - Update a Document
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
     *           $ref: '#/definitions/NewDocument'
     *     responses:
     *       200:
     *         description: users
     *         schema:
     *          type: object,
     *          items:
     *            $ref: '#/definitions/Document'
     */
    .put(auth.verifyToken, auth.permitOwner, Documents.update)

    /**
     * @swagger
     * /api/v1/documents/1:
     *    delete:
     *      description: Deletes the document with the id of 1
     *      tags:
     *        - Delete document
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
     *              $ref: '#/definitions/Document'
     */
    .delete(auth.verifyToken, Documents.destroy);

documentRouter.route('/search/documents')
    .get(auth.verifyToken, Documents.search);

export default documentRouter;

