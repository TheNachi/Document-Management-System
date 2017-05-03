import db from '../models/index';
// import helper from '../helpers/error-render';
// import { isAdmin } from '../helpers/helper';

const Folders = db.folders;
const Document = db.document;

export const createFolder = (req, res) => {
  req.body.ownerId = req.decoded.id || req.decoded;
  Folders.findAll({ where: { title: req.body.title } })
    .then((folders) => {
      if (folders.length < 1) {
        Folders.create(req.body)
          .then((folder) => {
            res.status(200).json(folder);
          });
      } else {
        res.status(409).json({
          message: 'This folder already exists'
        });
      }
    });
};

export const getAllFolders = (req, res) => {
  const ownerId = req.decoded.id || req.decoded;
  Folders.findAll({ where: { ownerId } })
    .then((folders) => {
      res.status(200).json(folders);
    });
};

export const getOneFolder = (req, res) => {
  const ownerId = req.decoded.id || req.decoded;
  Folders.findById(req.params.id)
    .then((folder) => {
      if (!folder) {
        res.status(404).json({
          message: 'folder does not exist'
        });
      } else if (ownerId === folder.ownerId) {
        res.status(200).json(folder);
      } else {
        res.status(401).json({
          message: 'You don\'t have permission to view this folder'
        });
      }
    });
};

export const updateFolder = (req, res) => {
  const ownerId = req.decoded.id || req.decoded;
  if (req.body.ownerId) {
    return res.status(400).json({
      message: 'you can only rename a folder'
    });
  }
  Folders.findAll({ where: { title: req.body.title } })
    .then((result) => {
      if (result.length >= 1) {
        res.status(409).json({
          message: 'This folder already exists'
        });
      } else {
        Folders.findById(req.params.id)
          .then((folder) => {
            if (!folder) {
              res.status(404).json({
                message: 'folder does not exist'
              });
            } else if (ownerId === folder.ownerId) {
              folder.update({ title: req.body.title })
                .then(() => {
                  res.sendStatus(204);
                });
            } else {
              res.status(401).json({
                message: 'You don\'t have permission to do this'
              });
            }
          });
      }
    });
};

export const deleteFolder = (req, res) => {
  const ownerId = req.decoded.id || req.decoded;
  Folders.findById(req.params.id)
    .then((folder) => {
      if (!folder) {
        res.status(404).json({
          message: 'folder does not exist'
        });
      } else if (ownerId === folder.ownerId) {
        folder.destroy({ where: { id: req.params.id } })
          .then(() => {
            res.sendStatus(204);
          });
      } else {
        res.status(401).json({
          message: 'You don\'t have permission to do this'
        });
      }
    });
};

export const putDocument = (req, res) => {
  const id = req.decoded.id || req.decoded;

  Document.findById(req.body.id)
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: 'document not found'
        });
      }
      if (document.ownerId === id) {
        document.update({ folderId: req.params.id })
          .then(() => {
            res.sendStatus(204);
          }).catch(() => {
            res.sendStatus(400);
          });
      } else {
        res.status(401).json({
          error_code: 'Unauthorized',
          message: 'You don\'t have permission to do this'
        });
      }
    });
};

export const removeDoc = (req, res) => {
  const id = req.decoded.id || req.decoded;

  Document.findById(req.body.id)
    .then((document) => {
      if (!document) {
        return res.status(404).json({
          message: 'document not found'
        });
      }
      if (document.ownerId === id) {
        document.update({ folderId: null })
          .then(() => {
            res.sendStatus(204);
          }).catch(() => {
            res.sendStatus(400);
          });
      } else {
        res.status(401).json({
          error_code: 'Unauthorized',
          message: 'You don\'t have permission to do this'
        });
      }
    });
};

export const folderDocs = (req, res) => {
  const id = req.decoded.id || req.decoded;
  Folders.findById(req.params.id)
    .then((folder) => {
      if (folder) {
        if (folder.ownerId === id) {
          Document.findAll({ where: { folderId: req.params.id } })
            .then((documents) => {
              res.status(200).json(documents);
            });
        } else {
          res.status(401).json({
            error_code: 'Unauthorized',
            message: 'You don\'t have permission to do this'
          });
        }
      } else {
        res.status(404).json({
          message: 'folder not found'
        });
      }
    }).catch((error) => {
      res.status(400).json({
        message: error.message
      });
    });
};
