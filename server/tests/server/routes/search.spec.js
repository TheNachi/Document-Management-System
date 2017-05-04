/* global describe:true */
/* global db:true */
/* global expect:true */
/* global request:true */
/* global jwt:true */
/* global faker:true */
const tokenize = (id, username, roleId) => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60),
  data: { id, username, roleId }
}, process.env.JWT_SECRET);


describe('Routes: search', () => {
  const User = db.users;
  const Role = db.roles;
  const Document = db.documents;
  const tokens = { admin: [], regular: [], custom: [] };
  let doctitle;
  const users = { admin: [], regular: [], custom: [] };
  const usernames = { admin: [], regular: [], custom: [] };
  beforeEach((done) => {
    db.sequelize.sync({ force: true }).done(() => {
      Role.bulkCreate([{
        title: 'custom', id: 3
      }, {
        title: 'regular', id: 2
      }, {
        title: 'admin', id: 1
      }]).then(() => {
        User.destroy({ where: {} })
          .then(() => {
            User.bulkCreate(faker.bulkCreateUser, { individualHooks: true })
            .then((res) => {
              res.forEach((user) => {
                switch (user.roleId) {
                  case 1:
                    users.admin.push(user.id);
                    tokens.admin.push(tokenize(
                      user.id,
                      user.username,
                      user.roleId
                    ));
                    usernames.admin.push(user.username);
                    break;
                  case 3:
                    users.custom.push(user.id);
                    tokens.custom.push(tokenize(
                      user.id,
                      user.username,
                      user.roleId
                    ));
                    usernames.custom.push(user.username);
                    break;
                  default:
                    users.regular.push(user.id);
                    tokens.regular.push(tokenize(
                      user.id,
                      user.username,
                      user.roleId
                    ));
                    usernames.regular.push(user.username);
                }
              });
              db.access.bulkCreate(faker.allAccess).then(() => {
                const docs = faker.createDocument(users.admin[0])
                            .concat(faker.createDocument(users.custom[0]))
                            .concat(faker.createDocument(users.custom[1]))
                            .concat(faker.createDocument(users.regular[0]));
                Document.bulkCreate(docs, {
                  individualHooks: true
                })
                .then((createdDocs) => {
                  doctitle = createdDocs[21].title;
                  done();
                });
              });
            });
          });
      });
    });
  });
  afterEach((done) => {
    db.roles.destroy({ where: {} })
      .then(() => {
        db.access.destroy({ where: {} }).then(() => {
          done();
        });
      });
  });

  describe('GET /api/v1/search/users/?q={String}', () => {
    it('should fetch the user that was searched for', (done) => {
      request.get(`/api/v1/search/users/?q=${usernames.regular[0]}`)
        .set('Authorization', tokens.regular[1])
        .expect(200)
        .end((err, res) => {
          expect(Object.keys(res.body)).to.have.lengthOf(1);
          done(err);
        });
    });
    it('should return a not found error if no user matches username',
      (done) => {
        request.get(`/api/v1/search/users/?q=-65${usernames.regular[0]}`)
          .set('Authorization', tokens.regular[1])
          .expect(404)
          .end((err, res) => {
            expect(res.body.message).to.eql('user not found');
            done(err);
          });
      });
  });
  describe('GET /api/v1/search/documents/?q={String}', () => {
    it('should fetch the document that was searched for', (done) => {
      request.get(`/api/v1/search/documents/?q=${doctitle}`)
        .set('Authorization', tokens.regular[1])
        .expect(200)
        .end((err, res) => {
          expect(Object.keys(res.body)).to.have.lengthOf(1);
          done(err);
        });
    });
    it('should return a not found error if no document matches title',
      (done) => {
        request.get(`/api/v1/search/documents/?q=-65${doctitle}`)
          .set('Authorization', tokens.regular[1])
          .expect(404)
          .end((err, res) => {
            expect(res.body.message).to.eql('document not found');
            done(err);
          });
      });
  });
});
