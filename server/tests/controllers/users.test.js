import supertest from 'supertest';
import chai from 'chai';
import app from '../../../server';
import { Role, User } from '../../models';
import helper from '../test-helper';

const request = supertest.agent(app);
const expect = chai.expect;

const userParams = helper.firstUser;
const roleParams = helper.adminRole;
const userParamsArray = helper.userArray();


let user, token;

const compareDates = (dateA, dateB) =>
  new Date(dateA).getTime() <= new Date(dateB).getTime();

describe('User API', () => {
  before(() =>
    Role.create(roleParams)
      .then((role) => {
        userParams.roleId = role.id;
      }));

  after(() => User.sequelize.sync({ force: true }));

  describe('CONTEXT: With existing user', () => {
    beforeEach((done) => {
      request.post('/users')
        .send(userParams)
        .end((err, res) => {
          user = res.body.user;
          token = res.body.token;
          done();
        });
    });

    // clear DB after each test
    afterEach(() => User.destroy({ where: {} }));

    describe('Get All GET: /users', () => {
      it('should return unauthorised for no token', (done) => {
        request.get('/users')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should return all users', (done) => {
        request.get('/users')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body.rows)).to.be.true;
            expect(res.body.rows.length).to.equal(1);
            done();
          });
      });
    });

    describe('Get User GET: /users/:id', () => {
      it('should get correct user', (done) => {
        request.get(`/users/${user.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.email).to.equal(user.email);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.get('/users/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Edit user PUT: /users/:id', () => {
      it('updates the user attributes', (done) => {
        const newAttributes = { lastName: 'awa', email: 'awa@awa.com' };

        request.put(`/users/${user.id}`)
          .set({ Authorization: token })
          .send(newAttributes)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.lastName).to.equal(newAttributes.lastName);
            expect(res.body.email).to.equal(newAttributes.email);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.put('/users/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Delete user DELETE: /users/:id', () => {
      it('deletes the user', (done) => {
        request.delete(`/users/${user.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            User.count().then((count) => {
              expect(count).to.equal(0);
              done();
            });
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.delete('/users/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Login POST: /users/login', () => {
      it('should return a token on successful login', (done) => {
        const identifier = userParams.username;
        const password = userParams.password;
        request.post('/users/login')
          .send({ identifier, password })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.token).to.exist;
            done();
          });
      });

      it('should fail for invalid credentials', (done) => {
        request.post('/users/login')
          .send({ identifier: 'fake@email.com', password: 'fakepass' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.token).to.not.exist;
            done();
          });
      });
    });

    describe('Logout POST: /users/logout', () => {
      it('logs out successfully', (done) => {
        request.post('/users/logout')
          .expect(204, done);
      });
    });
  });

  describe('CONTEXT: Without existing user', () => {
    // clear DB after each test
    afterEach(() => User.destroy({ where: {} }));

    describe('Create user POST: /users', () => {
      it('creates a new user and returns a token', (done) => {
        request.post('/users')
          .send(userParams)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.token).to.exist;
            done();
          });
      });

      it('fails if user already exist', (done) => {
        User.create(userParams)
          .then(() => {
            request.post('/users')
              .send(userParams)
              .end((err, res) => {
                expect(res.status).to.equal(409);
                expect(res.body.token).to.not.exist;
                done();
              });
          });
      });

      it('fails for invalid user attributes', (done) => {
        const invalidParams = { firstName: 'Adam', name: 'King' };
        request.post('/users')
          .send(invalidParams)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.token).to.not.exist;
            done();
          });
      });
    });
  });

  describe('CONTEXT: With multiple users', () => {
    before(() =>
      Role.create(helper.regularRole)
        .then((role) => {
          User.bulkCreate(userParamsArray);
        })
    );

    describe('User Pagination', () => {
      it('uses query params "limit" to limit the result', (done) => {
        request.get('/users?limit=5')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.rows.length).to.equal(5);
            done();
          });
      });

      it('is returned in order of their signed up dates', (done) => {
        request.get('/users?limit=5')
          .set({ Authorization: token })
          .end((err, res) => {
            const users = res.body;
            let flag = true;

            for (let i = 0; i < users.length - 1; i += 1) {
              flag = compareDates(users[i].createdAt, users[i + 1].createdAt);
              if (!flag) break;
            }

            expect(flag).to.be.true;
            done();
          });
      });
    });

    describe('User search', () => {
      it('searches and returns the correct users', (done) => {
        const query = userParamsArray[4].username;
        const matcher = new RegExp(query);

        request.get(`/search/users?q=${query}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(matcher.test(res.body.rows[0].username)).to.be.true;
            done();
          });
      });
    });
  });
});
