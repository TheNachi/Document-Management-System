import { User, Document } from '../models';
import Helper from '../helpers/paginateHelper';

const ownerParams =
  [{
    model: User,
    as: 'owner',
    attributes: [
      'username',
      'firstName',
      'lastName',
      'email'
    ]
  }];

const Documents = {
  /**
   * Create a document
   * Route: POST: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  create(req, res) {
    const { title, content, access } = req.body;
    const ownerId = req.decoded.userId;
    Document.create({ title, content, access, ownerId })
      .then((document) => {
        Document.findById(document.id,
         { include: ownerParams })
         .then(documentFetched =>
           res.status(201).send(documentFetched));
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

  /**
   * Get all documents
   * Route: GET: /documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  list(req, res) {
    const query = {
      where: {
        $or: [
          { access: 'public' },
          { ownerId: req.decoded.userId },
        ]
      },
      include: ownerParams,
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };

    Document.findAndCountAll(query).then((documents) => {
      const condition = {
        count: documents.count,
        limit: query.limit,
        offset: query.offset
      };
      delete documents.count;
      const pagination = Helper.pagination(condition);
      res.status(200)
        .send({
          pagination,
          rows: documents.rows
        });
    });
  },

  /**
   * Get a particular document
   * Route: GET: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  retrieve(req, res) {
    Document.findById(req.params.id, { include: ownerParams })
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        if ((document.access === 'public') ||
          (document.ownerId === req.decoded.userId)) {
          return res.send(document);
        }

        User.findById(document.ownerId)
            .then((owner) => {
              if (owner.roleId === req.decoded.roleId) {
                return res.send(document);
              }

              res.status(403)
                .send({ message: 'You cannot access this document.' });
            });
      });
  },

  /**
   * Update a particular document
   * Route: PUT: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  update(req, res) {
    Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }

        document.update(req.body)
          .then((updatedDocument) => {
            Document.findById(updatedDocument.id,
              { include: ownerParams })
              .then(doc =>
                res.status(201).send(doc));
          }).catch((err) => {
            res.status(400).send(err);
          });
      });
  },

  /**
   * Delete a particular document
   * Route: DELETE: /documents/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    Document.findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({ message: `Document with id: ${req.params.id} not found` });
        }
        document.destroy()
          .then(() => res.send({ message: 'Document deleted successfully.' }));
      });
  },

  /**
   * Get all documents that belongs to a user
   * Route: GET: /users/:id/documents
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  userDocuments(req, res) {
    Document.findAll({ where: { ownerId: req.params.id } })
      .then((documents) => {
        res.send(documents);
      });
  },

  /**
   * Search for documents by title
   * Route: GET: /search/documents?q={title}
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  search(req, res) {
    const queryString = req.query.q;
    const query = {
      where: {
        $and: [{ $or: [
          { access: 'public' },
          { ownerId: req.decoded.userId },
        ],
        }],
      },
      include: [{ model: User, as: 'owner' }],
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };

    if (queryString) {
      query.where.$and.push({ $or: [
        { title: { $iLike: `%${queryString}%` } },
      ] });
    }

    Document.findAndCountAll(query).then((documents) => {
      const condition = {
        count: documents.count,
        limit: query.limit,
        offset: query.offset
      };
      delete documents.count;
      const pagination = Helper.pagination(condition);
      res.status(200)
        .send({
          pagination,
          rows: documents.rows
        });
    });
  }
};

export default Documents;
