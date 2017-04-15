import express from 'express';
import {
  createDocument,
  findAllDocument,
  findOneDocument,
  updateDocument,
  deleteDocument
} from '../controllers/documents';
import auth from '../middlewares/auth';
import { isAdmin } from '../helpers/helper';

const documentRouter = express.Router();


documentRouter.route('/api/v1/documents')
    .all(auth)
    .get(isAdmin, findAllDocument)
    .post(createDocument);

documentRouter.route('/api/v1/documents/:id')
    .all(auth, isAdmin)
    .get(findOneDocument)
    .put(updateDocument)
    .delete(deleteDocument);

export default documentRouter;

