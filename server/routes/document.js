import express from 'express';
import {
  createDocument,
  findAllDocument,
  findOneDocument,
  updateDocument,
  deleteDocument
} from '../controllers/documents';
import auth from '../middlewares/auth';
import cleanParam from '../middlewares/cleanParam';
import { isAdmin } from '../helpers/helper';

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
documentRouter.route('/api/documents')
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
    .get(auth, isAdmin, cleanParam, findAllDocument)

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
    .post(auth, createDocument);

documentRouter.route('/api/documents/:id')
    .all(auth, isAdmin)
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
    .get(auth, findOneDocument)

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
    .put(auth, updateDocument)

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
    .delete(auth, deleteDocument);

export default documentRouter;

