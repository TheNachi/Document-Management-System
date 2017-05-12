import { expect } from 'chai';
import { Role, User, Document } from '../../models';
import helper from '../test-helper';

const documentParams = helper.publicDocument;
const userParams = helper.firstUser;

const notNullAttrs = ['title', 'content'];

let document;

describe('Document model', () => {
  before(() =>
    Role.create(helper.adminRole)
      .then((role) => {
        userParams.roleId = role.id;
        return User.create(userParams);
      })
      .then((owner) => {
        documentParams.ownerId = owner.id;
        documentParams.roleId = owner.roleId;
      })
  );

  beforeEach(() => {
    document = Document.build(documentParams);
  });

  after(() => Document.sequelize.sync({ force: true }));

  describe('Create document', () => {
    it('creates a Document instance', () =>
      expect(document).to.exist);

    it('has both title and content', () => {
      expect(document.title).to.equal(documentParams.title);
      expect(document.content).to.equal(documentParams.content);
    });

    it('saves document with valid attributes', () =>
      document.save().then((newDoc) => {
        expect(newDoc.title).to.equal(document.title);
        expect(newDoc.content).to.equal(document.content);
      }).catch(err => expect(err).to.not.exist));

    it('sets default access to public', () =>
      document.save().then(newDoc =>
        expect(newDoc.access).to.equal('public'))
        .catch(err => expect(err).to.not.exist));

    it('has a published date defined', () =>
      document.save().then(newDoc =>
        expect(newDoc.createdAt).to.exist)
        .catch(err => expect(err).to.not.exist));
  });


  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          document[attr] = null;

          return document.save()
            .then(newDoc => expect(newDoc).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    it('fails for invalid access type', () => {
      document.access = 'invalid access';
      return document.save()
        .then(newDocument => expect(newDocument).to.not.exist)
        .catch(err => expect(/isIn failed/.test(err.message)).to.be.true);
    });
  });
});
