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


describe('Routes: folder', () => {
  const User = db.users;
  const Role = db.roles;
  const Document = db.documents;
  const tokens = { admin: [], regular: [], custom: [] };
  let folderTitle, folderId, doc, secondFolderTitle;
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
                const folders = faker.createFolders(users.admin[0])
                .concat(faker.createFolders(users.custom[0]))
                .concat(faker.createFolders(users.custom[1]))
                .concat(faker.createFolders(users.regular[0]));
                db.folders.bulkCreate(folders, {
                  individualHooks: true
                }).then((createdFolders) => {
                  folderTitle = createdFolders[3].title;
                  folderId = createdFolders[3].id;
                  secondFolderTitle = createdFolders[2].title;
                  const docs = faker.createDocument(users.admin[0])
                              .concat(faker.createDocument(users.custom[0]))
                              .concat(faker.createDocument(users.custom[1]))
                              .concat(faker.createDocument(users.regular[0]));
                  Document.bulkCreate(docs, {
                    individualHooks: true
                  })
                  .then((createdDocs) => {
                    doc = createdDocs[0];
                    done();
                  });
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
  describe('GET /api/v1/folders', () => {
    it('should get all folders of user', (done) => {
      request.get('/api/v1/folders')
        .set('Authorization', tokens.admin[0])
        .expect(200)
        .end((err, res) => {
          expect(Object.keys(res.body)).to.have.lengthOf(4);
          done(err);
        });
    });
    it('should reject request from sender without token', (done) => {
      request.get('/api/v1/folders')
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request from sender with invalid token', (done) => {
      request.get('/api/v1/folders')
        .set('Authorization', `e${tokens.admin[0]}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });

  describe('POST /api/v1/folders', () => {
    it('should create a folder', (done) => {
      const folder = faker.createFolders(users.admin[0])[0];
      request.post('/api/v1/folders')
        .set('Authorization', tokens.admin[0])
        .send(folder)
        .expect(200)
        .end((err, res) => {
          expect(res.body.title).to.eql(folder.title);
          done(err);
        });
    });
    it('should reject request if title is null or empty', (done) => {
      const folder = { ...faker.createFolders(users.admin[0])[0] };
      delete folder.title;
      request.post('/api/v1/folders')
        .set('Authorization', tokens.admin[0])
        .send(folder)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.eql('title cannot be empty');
          done(err);
        });
    });
    it('should reject request if title already exists', (done) => {
      const folder = { ...faker.createFolders(users.admin[0])[0] };
      folder.title = folderTitle;
      request.post('/api/v1/folders')
        .set('Authorization', tokens.admin[0])
        .send(folder)
        .expect(409)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('This folder already exists');
          done(err);
        });
    });
    it('should reject request without a token', (done) => {
      const folder = { ...faker.createFolders(users.admin[0])[0] };
      folder.title = folderTitle;
      request.post('/api/v1/folders')
        .send(folder)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request if title already exists', (done) => {
      const folder = { ...faker.createFolders(users.admin[0])[0] };
      folder.title = folderTitle;
      request.post('/api/v1/folders')
        .set('Authorization', `r${tokens.admin[0]}`)
        .send(folder)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });

  describe('PUT /api/v1/folders/:id/add', () => {
    it('should remove a document from a folder', (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .set('Authorization', tokens.admin[0])
        .send({ id: doc.id })
        .expect(204)
        .end((err, res) => {
          Document.findById(doc.id)
            .then((document) => {
              expect(res.body).to.eql({});
              expect(document.folderId).to.eql(null);
              done(err);
            });
        });
    });
    it('should return a not found error if document is not found', (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .set('Authorization', tokens.admin[0])
        .send({ id: 31319 })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.eql('document not found');
          done(err);
        });
    });
    it('should return an unauthorized error if sender is not document owner',
    (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .set('Authorization', tokens.regular[1])
        .send({ id: doc.id })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('You don\'t have permission to do this');
          done(err);
        });
    });
    it('should reject request with invalid token', (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .send({ id: doc.id })
        .set('Authorization', `2${tokens.admin[0]}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request without a token', (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .send({ id: doc.id })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });

  describe('PUT /api/v1/folders/:id/remove', () => {
    it('should add a document to a folder', (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .set('Authorization', tokens.admin[0])
        .send({ id: doc.id })
        .expect(204)
        .end((err, res) => {
          expect(res.body).to.eql({});
          done(err);
        });
    });
    it('should return a not found error if document is not found', (done) => {
      request.put(`/api/v1/folders/${folderId}/add`)
        .set('Authorization', tokens.admin[0])
        .send({ id: 31319 })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.eql('document not found');
          done(err);
        });
    });
    it('should return an unauthorized error if sender is not document owner',
    (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .set('Authorization', tokens.regular[1])
        .send({ id: doc.id })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('You don\'t have permission to do this');
          done(err);
        });
    });
    it('should reject request with invalid token', (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .send({ id: doc.id })
        .set('Authorization', `2${tokens.admin[0]}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request without a token', (done) => {
      request.put(`/api/v1/folders/${folderId}/remove`)
        .send({ id: doc.id })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });

  describe('GET /api/v1/folders/:id/documents', () => {
    it('should return all documents of a folder', (done) => {
      request.get(`/api/v1/folders/${folderId}/documents`)
        .set('Authorization', tokens.admin[0])
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.eql([]);
          done(err);
        });
    });
    it('should return a not found error if folder is not found', (done) => {
      request.get('/api/v1/folders/83272/documents')
        .set('Authorization', tokens.admin[0])
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.eql('folder not found');
          done(err);
        });
    });
    it('should return an unauthorized error if sender is not folder owner',
    (done) => {
      request.get(`/api/v1/folders/${folderId}/documents`)
        .set('Authorization', tokens.regular[1])
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('You don\'t have permission to do this');
          done(err);
        });
    });
    it('should reject request with invalid token', (done) => {
      request.get(`/api/v1/folders/${folderId}/documents`)
        .send({ id: doc.id })
        .set('Authorization', `2${tokens.admin[0]}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request without a token', (done) => {
      request.get(`/api/v1/folders/${folderId}/documents`)
        .send({ id: doc.id })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });

  describe('GET /api/v1/folders/:id', () => {
    it('should return a document', (done) => {
      request.get(`/api/v1/folders/${folderId}`)
        .set('Authorization', tokens.admin[0])
        .expect(200)
        .end((err, res) => {
          expect(res.body.title).to.eql(folderTitle);
          done(err);
        });
    });
    it('should return a not found error if folder is not found', (done) => {
      request.get('/api/v1/folders/32112')
        .set('Authorization', tokens.admin[0])
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.eql('folder does not exist');
          done(err);
        });
    });
    it('should reject request if sender is not folder owner', (done) => {
      request.get(`/api/v1/folders/${folderId}`)
        .set('Authorization', tokens.admin[1])
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('You don\'t have permission to view this folder');
          done(err);
        });
    });
    it('should reject request with invalid token', (done) => {
      request.get(`/api/v1/folders/${folderId}`)
        .set('Authorization', `2${tokens.admin[0]}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request without a token', (done) => {
      request.get(`/api/v1/folders/${folderId}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });

  describe('PUT /api/v1/folders/:id', () => {
    it('should rename the folder', (done) => {
      request.put(`/api/v1/folders/${folderId}`)
        .set('Authorization', tokens.admin[0])
        .send({ title: 'Important %Folder%' })
        .expect(204)
        .end((err, res) => {
          db.folders.findById(folderId)
            .then((folder) => {
              expect(res.body).to.eql({});
              expect(folder.title).to.not.eql(folderTitle);
              done(err);
            });
        });
    });
    it('should not update anything except title', (done) => {
      request.put(`/api/v1/folders/${folderId}`)
        .set('Authorization', tokens.admin[0])
        .send({ ownerId: 21 })
        .expect(400)
        .end((err, res) => {
          expect(res.body.message).to.eql('you can only rename a folder');
          done(err);
        });
    });
    it('should return a not found error if folder is not found', (done) => {
      request.put('/api/v1/folders/8908545')
        .set('Authorization', tokens.admin[0])
        .send({ title: '21' })
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.eql('folder does not exist');
          done(err);
        });
    });
    it('should reject request if title already exists', (done) => {
      request.put(`/api/v1/folders/${folderId}`)
        .set('Authorization', tokens.admin[0])
        .send({ title: secondFolderTitle })
        .expect(409)
        .end((err, res) => {
          expect(res.body.message).to.eql('This folder already exists');
          done(err);
        });
    });
    it('should reject request if token does not exist', (done) => {
      request.put(`/api/v1/folders/${folderId}`)
        .send({ title: secondFolderTitle })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request if token is invalid', (done) => {
      request.put(`/api/v1/folders/${folderId}`)
        .set('Authorization', `e${tokens.admin[0]}`)
        .send({ title: secondFolderTitle })
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });

  describe('DELETE /api/v1/folders/:id', () => {
    it('should delete a folder', (done) => {
      request.delete(`/api/v1/folders/${folderId}`)
        .set('Authorization', tokens.admin[0])
        .expect(204)
        .end((err, res) => {
          db.folders.findById(folderId)
            .then((folder) => {
              expect(res.body).to.eql({});
              expect(folder).to.eql(null);
              done(err);
            });
        });
    });
    it('should delete all folder documents ', (done) => {
      db.documents.bulkCreate(faker.createDocument(users.admin[0], folderId))
        .then((docs) => {
          const docId = docs[0].id;
          request.delete(`/api/v1/folders/${folderId}`)
            .set('Authorization', tokens.admin[0])
            .expect(204)
            .end((err, res) => {
              expect(res.body).to.eql({});
              db.folders.findById(folderId)
                .then((folder) => {
                  expect(folder).to.eql(null);
                  db.documents.findById(docId)
                    .then((document) => {
                      expect(document).to.eql(null);
                    });
                  done(err);
                });
            });
        });
    });
    it('should reject request if sender is not folder owner', (done) => {
      request.delete(`/api/v1/folders/${folderId}`)
        .set('Authorization', tokens.admin[1])
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('You don\'t have permission to do this');
          done(err);
        });
    });
    it('should reject request if sender does not have a token', (done) => {
      request.delete(`/api/v1/folders/${folderId}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
    it('should reject request if sender has invalid token', (done) => {
      request.delete(`/api/v1/folders/${folderId}`)
        .set('Authorization', `e${tokens.admin[1]}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message)
            .to.eql('Sorry you don\'t have permission to perform this operation');
          done(err);
        });
    });
  });
});
