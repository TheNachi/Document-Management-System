/* eslint no-unused-expressions: 0 */
/* eslint no-underscore-dangle: 0 */
import httpMocks from 'node-mocks-http';
import events from 'events';
import { expect } from 'chai';
import sinon from 'sinon';
import supertest from 'supertest';
import app from '../../../server';
import Auth from '../../middlewares/auth';
import { Role } from '../models/index.test';
import helper from '../test-helper';

const request = supertest.agent(app);
let adminJwtToken;
let userJwtToken;
let req;

const responseEvent = () => httpMocks
    .createResponse({ eventEmitter: events.EventEmitter });
describe('Auth Middleware', () => {
  before((done) => {
    Role.bulkCreate([helper.adminRole, helper.regularRole]);

    request
      .post('/users/login')
      .send({ identifier: 'Maryse88', password: 'awa321' })
      .end((err, res) => {
        adminJwtToken = res.body.token;
        request
        .post('/users/login')
        .send({ identifier: 'Blair_Lynch', password: 'awa123' })
        .end((err, res) => {
          userJwtToken = res.body.token;
          done();
        });
      });
  });
  after(() => Role.sequelize.sync({ force: true }));

  describe('Verify Token', () => {
    it('Should continue if token is valid', (done) => {
      const res = httpMocks.createResponse();
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { Authorization: adminJwtToken }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('Should not continue if token is invalid', (done) => {
      const res = responseEvent();
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { Authorization: 'invalidtoken' }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.verifyToken(req, res, middlewareStub.callback);
      res.on('end', () => {
        expect(res._getData().message).to
          .equal('Invalid Token');
        done();
      });
    });
  });

  describe('Admin Access', () => {
    it('Should continue not when requester is not an admin', (done) => {
      const res = responseEvent();
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/role',
        headers: { Authorization: userJwtToken },
        decoded: { roleId: 2 }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.permitAdmin(req, res, middlewareStub.callback);
      res.on('end', () => {
        expect(res._getData().message).to
          .equal('You are not an admin');
        done();
      });
    });

    it('Should continue for admin user', (done) => {
      const res = responseEvent();
      req = httpMocks.createRequest({
        method: 'GET',
        url: '/role',
        headers: { Authorization: adminJwtToken },
        decoded: { roleId: 1 }
      });
      const middlewareStub = {
        callback: () => {}
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.permitAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
  });

  describe('validateUserInput', () => {
    it('should not continue when email is null', () => {
      const res = responseEvent();
      req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users',
        body: {
          firstName: 'andela',
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      res.on('end', () => {
        expect(res._getData().message).to.equal('Enter a valid email');
      });
      Auth.validateUserInput(req, res, middlewareStub.callback);
    });

    it('should continue when all the fields are complete', (done) => {
      const res = responseEvent();
      req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users',
        body: {
          username: 'andela',
          firstName: 'andela',
          lastName: 'andela',
          email: 'andela@mail.com',
          password: 'password'
        }
      });
      const middlewareStub = {
        callback: () => { }
      };
      sinon.spy(middlewareStub, 'callback');
      Auth.validateUserInput(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });
  });
});
