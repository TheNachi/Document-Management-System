import express from 'express';
import auth from '../middlewares/auth';
import { folders } from '../middlewares/validate';
import {
  createFolder,
  getAllFolders,
  getOneFolder,
  putDocument,
  removeDoc,
  folderDocs,
  updateFolder,
  deleteFolder
} from '../controllers/folder';
import { isAdmin } from '../helpers/helper';

const folderRouter = express.Router();


folderRouter.route('/api/folders')
    .get(auth, isAdmin, getAllFolders)
    .post(auth, folders, isAdmin, createFolder);
folderRouter.route('/api/folders/:id')
    .get(auth, isAdmin, getOneFolder)
    .put(auth, isAdmin, updateFolder)
    .delete(auth, isAdmin, deleteFolder);
folderRouter.put('/api/folders/:id/add', auth, isAdmin, putDocument);
folderRouter.put('/api/folders/:id/remove', auth, isAdmin, removeDoc);
folderRouter.get('/api/folders/:id/documents', auth, isAdmin, folderDocs);

export default folderRouter;
