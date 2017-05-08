import express from 'express';
import Documents from '../controllers/documentsControllers';
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
      *  /documents/?limit=4&offset=2:
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
     * /documents:
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

    /**
     * @swagger
     * definitions:
     *   NewDocUpdate:
     *     type: object
     *     required:
     *       - title
     *       - content
     *       - access
     *     properties:
     *       title:
     *         type: string
     *       content:
     *         type: string
     *       access:
     *         type: string
     *   DocUpdate:
     *     allOf:
     *       - $ref: '#/definitions/NewDocUpdate'
     *       - required:
     *         - id
     *       - properties:
     *         id:
     *           type: integer
     *           format: int64
     */
documentRouter.route('/documents/:id')
    /** @swagger
      *  /documents/:id:
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
     * /documents/:id:
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
     * /documents/1:
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

    /**
     * @swagger
     * definitions:
     *   NewSearchDocument:
     *     type: object
     *   SearchDocument:
     *     allOf:
     *       - $ref: '#/definitions/NewSearchDocument'
     *       - required:
     *         - id
     *       - properties:
     *         id:
     *           type: integer
     *           format: int64
     */
documentRouter.route('/search/documents')
    /**
     * @swagger
     * /search/documents/?q={document_title}:
     *   get:
     *     description: Returns the documents that matches the title
     *     tags:
     *      - Find Documents
     *     produces:
     *      - application/json
     *     parameters:
     *       - name: document_title
     *         description: The document's title
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
     *         description: documents
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/SearchDocument'
     */
    .get(auth.verifyToken, Documents.search);

export default documentRouter;

