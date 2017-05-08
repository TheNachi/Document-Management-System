import { Role } from '../models';

export default {

  /**
   * Create a role
   * Route: POST: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  create(req, res) {
    Role.create(req.body)
      .then((role) => {
        res.status(201).send(role);
      })
      .catch((err) => {
        res.status(400).send(err.errors);
      });
  },

   /**
   * Get all roles
   * Route: GET: /roles
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} no returns
   */
  list(req, res) {
    Role.findAll().then((roles) => {
      res.send(roles);
    });
  },

  /**
   * Get a particular role
   * Route: GET: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  retrieve(req, res) {
    Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: `Role with id: ${req.params.id} not found` });
        }

        res.send(role);
      });
  },

  /**
   * Update a particular role
   * Route: PUT: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  update(req, res) {
    Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: `Role with id: ${req.params.id} not found` });
        }

        role.update(req.body)
          .then((updatedRole) => {
            res.send(updatedRole);
          });
      });
  },

  /**
   * Delete a particular role
   * Route: DELETE: /roles/:id
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {Response|void} response object or void
   */
  destroy(req, res) {
    Role.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({ message: `Role with id: ${req.params.id} not found` });
        }

        role.destroy()
          .then(() => res.send({ message: 'Role deleted successfully.' }));
      });
  },
};
