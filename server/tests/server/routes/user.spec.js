/* global describe:true */
/* global db:true */
/* global expect:true */
/* global request:true */
/* global jwt:true */
/* global faker:true */

const tokenize = (id, username, roleId) => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: { id, username, roleId }
}, process.env.JWT_SECRET);

describe('Routes: user', () => {
  const User = db.users;
  const Role = db.roles;
  let token;
  let fakeUID;
  let secondUserToken;
  let adminToken;
  let admin;
  let secondRegUser;
  let fourthRegUser;
  let fifthRegUserToken;
  const customRoles = [];
  const customRolesToken = [];
  beforeEach((done) => {
    Role.bulkCreate([{
      title: 'custom', id: 3
    }, {
      title: 'regular', id: 2
    }, {
      title: 'admin', id: 1
    }])
      .then(() => {
        User.destroy({ where: {} })
          .then(() => {
            User.bulkCreate(faker.bulkCreateUser, { returning: true })
            .then((res) => {
              fakeUID = res[0];
              admin = res[1];
              secondRegUser = res[2];
              fourthRegUser = res[4];
              customRoles.push(res[4], res[5]);

              customRolesToken.push(tokenize(
                res[4].id,
                res[4].username,
                res[4].roleId
              ), tokenize(
                res[5].id,
                res[5].username,
                res[5].roleId
              ));
              token = tokenize(
                res[0].id,
                res[0].username,
                res[0].roleId
              );
              secondUserToken = tokenize(
                res[2].id,
                res[2].username,
                res[2].roleId
              );
              fifthRegUserToken = tokenize(
                res[5].id,
                res[5].username,
                res[5].roleId
              );
              adminToken = tokenize(
                res[3].id,
                res[3].username,
                res[3].roleId
              );
              const docs = faker.createDocument(fakeUID.id)
                .concat(faker.createDocument(secondRegUser.id))
                .concat(faker.createDocument(admin.id)
                .concat(faker.createDocument(customRoles[0].id)));
              db.access.bulkCreate(faker.allAccess)
                .then(() => {
                  db.documents
                    .bulkCreate(docs).then(() => done());
                });
            });
          });
      });
  });
  afterEach((done) => {
    Role.destroy({ where: {} })
      .then(() => {
        User.destroy({ where: {} })
          .then(() => {
            db.access.destroy({ where: {} })
              .then(() => {
                db.documents.destroy({ where: {} });
                done();
              });
          });
      });
  });
  describe('POST /api/users', () => {
    it('creates a new user', (done) => {
      request.post('/api/users')
        .send(faker.create_valid_user)
        .expect(200)
        .end((err, res) => {
          expect(res.body.user.firstname)
            .to.eql(faker.create_valid_user.firstname);
          expect(res.body.user.lastname)
            .to.eql(faker.create_valid_user.lastname);
          expect(res.body.user.username)
            .to.eql(faker.create_valid_user.username);
          expect(res.body.user.email)
            .to.eql(faker.create_valid_user.email);
          expect(res.body.user.password)
            .to.not.eql(faker.create_valid_user.password);
          expect(res.body).to.have.property('token');
          done(err);
        });
    });
    it('should reject request if roleId if is found in request', (done) => {
      const req = faker.valid_user;
      req.roleId = 1;
      request.post('/api/users')
        .send(req)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.eql('sorry, you can\'t signup as an admin');
          done(err);
        });
    });
    it('rejects requests without an email field', (done) => {
      request.post('/api/users')
        .send(faker.no_email_user)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('notNull Violation');
          expect(res.body.message).to.eql('email cannot be empty');
          done(err);
        });
    });
    it('rejects requests without an incorrect email field', (done) => {
      request.post('/api/users')
        .send(faker.invalid_email_user)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Validation error');
          expect(res.body.message).to.eql('Email is not valid');
          done(err);
        });
    });
    it('rejects requests without a firstname field', (done) => {
      request.post('/api/users')
        .send(faker.no_firstname_user)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('notNull Violation');
          expect(res.body.message).to.eql('firstname cannot be empty');
          done(err);
        });
    });
    it('rejects request if firstname field contains anything but letters',
      (done) => {
        request.post('/api/users')
          .send(faker.symbol_firstname_user)
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to.eql('firstname can only contain letters and/or - and \'');
            done(err);
          });
      });
    it('rejects request if firstname field does not contain letters',
      (done) => {
        request.post('/api/users')
          .send(faker.noletter_firstname_user)
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message).to.eql('firstname must contain letters');
            done(err);
          });
      });
    it('rejects requests if firstname contains more than one "\'"', (done) => {
      request.post('/api/users')
        .send(faker.firstname_more_quote)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Validation error');
          expect(res.body.message).to.eql('firstname cannot have more than one \'');
          done(err);
        });
    });
    it('rejects requests if firstname contains more than one "-"', (done) => {
      request.post('/api/users')
        .send(faker.firstname_more_hyphen)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Validation error');
          expect(res.body.message).to.eql('firstname cannot have more than one -');
          done(err);
        });
    });
    it('rejects request if firstname field is greater than 16 characters',
      (done) => {
        request.post('/api/users')
          .send(faker.long_firstname_user)
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to
              .eql(
                'firstname cannot be less than 2 or greater than 16 characters'
              );
            done(err);
          });
      });
    it('rejects request if firstname field is less than 2 characters',
      (done) => {
        request.post('/api/users')
          .send(faker.short_firstname_user)
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code)
              .to.eql('Validation error');
            expect(res.body.message)
              .to
              .eql(
                'firstname cannot be less than 2 or greater than 16 characters'
              );
            done(err);
          });
      });
    it('rejects requests without a lastname field', (done) => {
      request.post('/api/users')
        .send(faker.no_lastname_user)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('notNull Violation');
          expect(res.body.message).to.eql('lastname cannot be empty');
          done(err);
        });
    });
    it('rejects request if lastname field contains anything but letters and/or \' and -',
      (done) => {
        request.post('/api/users')
          .send(faker.symbol_lastname_user)
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to.eql('lastname can only contain letters and/or - and \'');
            done(err);
          });
      });
    it('rejects request if lastname field does not contain letters',
      (done) => {
        request.post('/api/users')
          .send({
            firstname: 'O\'hara',
            lastname: '-\'',
            username: 'scalawag',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message).to.eql('lastname must contain letters');
            done(err);
          });
      });
    it('rejects requests if lastname contains more than one "\'"', (done) => {
      request.post('/api/users')
        .send(faker.lastname_more_quote)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Validation error');
          expect(res.body.message).to.eql('lastname cannot have more than one \'');
          done(err);
        });
    });
    it('rejects requests if lastname contains more than one "-"', (done) => {
      request.post('/api/users')
        .send(faker.lastname_more_hyphen)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Validation error');
          expect(res.body.message).to.eql('lastname cannot have more than one -');
          done(err);
        });
    });
    it('rejects request if lastname field is greater than 16 characters',
      (done) => {
        request.post('/api/users')
          .send({
            firstname: 'Rhett',
            lastname: 'O\'HaraButtlerScarlett',
            username: 'scalawag',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to
              .eql('lastname cannot be less than 2 or greater than 16 characters');
            done(err);
          });
      });
    it('rejects request if lastname field is less than 2 characters',
      (done) => {
        request.post('/api/users')
          .send({
            firstname: 'Rhett',
            lastname: 'B',
            username: 'scalawag',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code)
              .to.eql('Validation error');
            expect(res.body.message)
              .to
              .eql('lastname cannot be less than 2 or greater than 16 characters');
            done(err);
          });
      });
    it('rejects requests without a username field', (done) => {
      request.post('/api/users')
        .send({
          firstname: 'Rhett',
          lastname: 'Butler',
          email: 'rhett@g.com',
          password: 'password7'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('notNull Violation');
          expect(res.body.message).to.eql('username cannot be empty');
          done(err);
        });
    });
    it('rejects requests if username field is less than 4 characters',
      (done) => {
        request.post('/api/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Butler',
            username: 'sc',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to
              .eql('username cannot be less than 4 or greater than 16 characters');
            done(err);
          });
      });
    it('rejects requests if username field is greater than 16 characters',
      (done) => {
        request.post('/api/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Pool',
            username: 'scalawage890olp0u',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to
              .eql('username cannot be less than 4 or greater than 16 characters');
            done(err);
          });
      });
    it('rejects request if username field contains symbols except _ and .',
      (done) => {
        request.post('/api/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Butler',
            username: 'da n^ke',
            email: 'rhett@g.com',
            password: 'password7'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to
              .eql('username must contains only letters, numbers, "." and "_"');
            done(err);
          });
      });
    it('rejects requests without a password field', (done) => {
      request.post('/api/users')
        .send({
          firstname: 'Rhett',
          lastname: 'Butler',
          username: 'scalawag',
          email: 'rhett@g.com'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('notNull Violation');
          expect(res.body.message)
            .to.eql('password cannot be empty');
          done(err);
        });
    });
    it('rejects requests if password field is less than 8 characters',
      (done) => {
        request.post('/api/users')
          .send({
            firstname: 'Rhett',
            lastname: 'Butler',
            username: 'scalawag',
            email: 'rhett@g.com',
            password: 'pass'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.error_code).to.eql('Validation error');
            expect(res.body.message)
              .to.eql('password cannot be less than 8 characters');
            done(err);
          });
      });
    it('rejects request if email already exists', (done) => {
      request.post('/api/users')
        .send({
          lastname: 'John',
          username: 'depp',
          email: 'lordvold@gmail.com',
          password: 'I hate the potters',
          firstname: 'Thomas'
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unique key violation');
          expect(res.body.message).to.eql('This email is already in use');
          done(err);
        });
    });
    it('rejects request if username already exists', (done) => {
      request.post('/api/users')
        .send({
          lastname: 'John',
          username: 'tommyrid',
          email: 'lordold@gmail.com',
          password: 'I hate the potters',
          firstname: 'Thomas'
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unique key violation');
          expect(res.body.message).to.eql('This username is already in use');
          done(err);
        });
    });
  });
  describe('GET /api/users/:id', () => {
    it('should return a user\'s basic data if not admin', (done) => {
      request.get(`/api/users/${fakeUID.id}`)
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.firstname).to.eql('Thomas');
          expect(res.body.password).to.be.a('undefined');
          done(err);
        });
    });
    it('should return all users data if admin', (done) => {
      request.get(`/api/users/${fakeUID.id}`)
        .set('Authorization', adminToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.firstname).to.eql(faker.bulkCreateUser[0].firstname);
          expect(res.body.password).to.not.be.a('undefined');
          done(err);
        });
    });
    it('should reject an unauthorized user', (done) => {
      request.get(`/api/users/${fakeUID.id}`)
        .set('Authorization', `JW ${token}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });
  describe('GET /api/users', () => {
    it('should get and return all users with default limit of 10 per page',
    (done) => {
      request.get('/api/users')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success.users.length).to.eql(6);
          done(err);
        });
    });
    it('should return 3 users per page', (done) => {
      request.get('/api/users/?limit=3')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success.users.length).to.eql(3);
          expect(res.body.success.paginationMeta.page).to.eql(1);
          done(err);
        });
    });
    it('should return all users from the second with default limit of 10',
    (done) => {
      request.get('/api/users/?offset=1')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success.users.length).to.eql(5);
          done(err);
        });
    });
    it('should return all users if limit exceeds max users', (done) => {
      request.get('/api/users/?limit=10')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success.users.length).to.eql(6);
          done(err);
        });
    });
    it('should reject an unauthorized user', (done) => {
      request.get(`/api/users/${fakeUID}`)
        .set('Authorization', `${token}s2`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });

  describe('POST /api/users/login', () => {
    it('should log a valid user in', (done) => {
      request.post('/api/users/login')
      .send({
        email: 'inumidun@sky.com',
        password: 'password!'
      })
      .expect(200)
      .end((err, res) => {
        /* eslint-disable */
        expect(res.body.token).to.be.ok;
        done(err);
      });
    });
    it('should reject a request without an email', (done) => {
      request.post('/api/users/login')
        .send({
          password: 'password!'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unauthorized Access');
          expect(res.body.message).to.eql('email/password do not match');
          done(err);
        });
    });
    it('should reject a request without a password', (done) => {
      request.post('/api/users/login')
        .send({
          email: 'inumidun@sky.com'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unauthorized Access');
          expect(res.body.message).to.eql('email/password do not match');
          done(err);
        });
    });
    it('should reject a request with an invalid password', (done) => {
      request.post('/api/users/login')
        .send({
          email: 'inumidun@sky.com',
          password: 'passrd!'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unauthorized Access');
          expect(res.body.message).to.eql('email/password do not match');
          done(err);
        });
    });
    it('should reject a request with an invalid email', (done) => {
      request.post('/api/users/login')
        .send({
          email: 'inumidun@skee.com',
          password: 'password!'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unauthorized Access');
          expect(res.body.message).to.eql('email/password do not match');
          done(err);
        });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user with given id', (done) => {
      request.put(`/api/v1/users/${fakeUID.id}`)
        .set('Authorization', token)
        .send({
          password: 'a new password'
        })
        .expect(204)
        .end((err, res) => {
          expect(res.text).to.eql('');
          expect(Object.keys(res.body).length).to.eql(0);
          done(err);
        });
    });
    it('should allow admin promote regular roles to admin roles', (done) => {
      request.put(`/api/users/${fakeUID.id}`)
        .set('Authorization', adminToken)
        .send({
          roleId: 1
        })
        .expect(204)
        .end((err, res) => {
          expect(res.body).to.eql({});
          done(err);
        });
    });
    it('should reject request if token is not valid', (done) => {
      request.put(`/api/users/${fakeUID.id}`)
        .set('Authorization', `s${token}`)
        .send({
          password: 'a new password'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request if sender\'s id does not match param', (done) => {
      request.put(`/api/users/${fakeUID.id}`)
        .set('Authorization', secondUserToken)
        .send({
          password: 'a new password'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('Cannot update properties of another user');
          done(err);
        });
    });
    it('should reject request if admin tries to update user details', (done) => {
      request.put(`/api/users/${fakeUID.id}`)
        .set('Authorization', adminToken)
        .send({
          password: 'a new password'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('Cannot update properties of another user');
          done(err);
        });
    });
    it('should reject request if admin tries to update admin roleId', (done) => {
      request.put(`/api/users/${admin.id}`)
        .set('Authorization', adminToken)
        .send({
          roleId: 2
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unauthorized');
          expect(res.body.message)
            .to.eql('Cannot update properties of another admin');
          done(err);
        });
    });
    it('should reject request if email already exists', (done) => {
      request.put(`/api/users/${fakeUID.id}`)
        .set('Authorization', token)
        .send({
          email: faker.bulkCreateUser[2].email
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.eql('This email is already in use');
          done(err);
        });
    });
    it('should reject request if username exists', (done) => {
      request.put(`/api/users/${fakeUID.id}`)
        .set('Authorization', token)
        .send({
          username: faker.bulkCreateUser[2].username
        })
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.eql('This username is already in use');
          done(err);
        });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', (done) => {
      request.delete(`/api/users/${secondRegUser.id}`)
        .set('Authorization', secondUserToken)
        .expect(204)
        .end((err, res) => {
          expect(res.body).to.eql({});
          done(err);
        });
    });
    it('should allow admin delete a user', (done) => {
      request.delete(`/api/users/${fakeUID.id}`)
        .set('Authorization', adminToken)
        .expect(204)
        .end((err, res) => {
          expect(res.body).to.eql({});
          done(err);
        });
    });
    it('should reject request to delete user from a regular user', (done) => {
      request.delete(`/api/users/${fourthRegUser.id}`)
        .set('Authorization', fifthRegUserToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unauthorized');
          expect(res.body.message).to.eql('you cannot delete another user');
          done(err);
        });
    });
    it('should reject request if user was not found', (done) => {
      request.delete('/api/users/99999')
        .set('Authorization', fifthRegUserToken)
        .expect(404)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Not found');
          expect(res.body.message).to.eql('User not found');
          done(err);
        });
    });
    it('should reject requests from unauthorized users', (done) => {
      request.delete(`/api/users/${fourthRegUser.id}`)
        .set('Authorization', `${fifthRegUserToken}1`)
        .expect(401)
        .end((err, res) => {
          // expect(res.body.error_code).to.eql('Unauthorized');
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request to delete admin user from admin user', (done) => {
      request.delete(`/api/users/${admin.id}`)
        .set('Authorization', adminToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unauthorized');
          expect(res.body.message).to.eql('you cannot delete an admin');
          done(err);
        });
    });
  });

  describe('GET /api/users/:id/documents', () => {
    it('should return only public documents of a user to another reqular users',
    (done) => {
      request.get(`/api/users/${fakeUID.id}/documents`)
        .set('Authorization', customRolesToken[1])
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(5);
          done(err);
        });
    });
    it('should return all documents belonging to the requester',
    (done) => {
      request.get(`/api/users/${fakeUID.id}/documents`)
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.lengthOf(7);
          done(err);
        });
    });
    it('should return role documents if both users are on the same role',
      (done) => {
        request.get(`/api/users/${customRoles[0].id}/documents`)
          .set('Authorization', customRolesToken[1])
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.lengthOf(6);
            done(err);
          });
      });
    it('should return both private and public documents if admin requests',
      (done) => {
        request.get(`/api/users/${secondRegUser.id}/documents`)
          .set('Authorization', adminToken)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.lengthOf(7);
            done(err);
          });
      });
    it('should reject requests from an unauthorized user', (done) => {
      request.get(`/api/users/${customRoles[0].id}/documents`)
        .set('Authorization', `q${customRolesToken[1]}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Unauthorized');
          done(err);
        });
    });
    it('should reject request if user does not exist', (done) => {
      request.get('/api/users/10345/documents')
        .set('Authorization', customRolesToken[0])
        .expect(404)
        .end((err, res) => {
          expect(res.body.error_code).to.eql('Not found');
          done(err);
        });
    });
  });
});
