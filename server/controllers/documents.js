import db from '../models/index';
import errorRender from '../helpers/error-render';
import { paginate } from '../helpers/helper';

const Document = db.documents;

const createDocument = (req, res) => {
  const id = req.decoded.id;
  const body = req.body;
  body.ownerId = id;
  console.log('[line 8 doc controller]', body);
  Document.create(body)
    .then((result) => {
      res.status(200).json(result);
    }).catch((errors) => {
      const error = errorRender(errors);
      console.log(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
};

const findAllDocument = (req, res) => {
  let query, limit, offset;
  if (req.admin) {
    query = { where: {} };
  } else {
    query = { where: { accessId: 1 } };
  }
  if (req.query) {
    limit = req.query.limit || 10;
    offset = req.query.offset || 0;
  }
  Document.findAll(query)
    .then(documents => res.status(200).json(
      paginate(limit, offset, documents, 'documents')));
};

const findOneDocument = (req, res) => {
  const id = req.decoded.id;
  Document.findById(req.params.id)
    .then((document) => {
      if (id === document.ownerId
          || req.admin
          || document.accessId === 1) {
        res.status(200).json(document);
      } else {
        res.status(401).json({
          error_code: 'Unauthorized',
          message: 'You don\'t have permission to view this document'
        });
      }
    }).catch((errors) => {
      const error = errorRender(errors);
      res.status(error.status)
        .json({
          error_code: error.error_code,
          message: error.message
        });
    });
};

const updateDocument = (req, res) => {
  const id = req.decoded.id;
  Document.findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: 'document not found'
        });
      }
      if (document.ownerId === id) {
        document.update(req.body)
          .then(() => {
            res.sendStatus(204);
          }).catch(() => {
            res.sendStatus(400);
          });
      } else {
        res.status(401).json({
          error_code: 'Unauthorized',
          message: 'You don\'t have permission to update this document'
        });
      }
    });
};

const deleteDocument = (req, res) => {
  const id = req.body.ownerId || req.decoded.id;
  Document.findById(req.params.id)
    .then((document) => {
      if (document.ownerId === id || req.admin) {
        document.destroy()
          .then(() => {
            res.sendStatus(204);
          }).catch(() => {
            res.sendStatus(400);
          });
      } else {
        res.status(401).json({
          error_code: 'Unauthorized',
          message: 'You don\'t have permission to delete this document'
        });
      }
    });
};

export {
  createDocument,
  findAllDocument,
  findOneDocument,
  updateDocument,
  deleteDocument
};
