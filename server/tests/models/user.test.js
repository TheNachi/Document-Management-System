import { expect } from 'chai';
import { Role, User } from '../../models';
import helper from '../test-helper';

const userParams = helper.firstUser;
const roleParams = helper.adminRole;

const notNullAttrs = ['firstName', 'lastName', 'email', 'password', 'roleId'];
const uniqueAttrs = ['username', 'email'];

let user;

describe('User model', () => {
  before(() =>
    Role.create(roleParams)
      .then((role) => {
        userParams.roleId = role.id;
      }));

  beforeEach(() => {
    user = User.build(userParams);
  });

  // clear DB after each test
  after(() => User.sequelize.sync({ force: true }));

  afterEach(() => User.destroy({ where: {} }));

  describe('Create user', () => {
    it('creates a User instance', () =>
      expect(user).to.exist);

    it('has both first name and last name', () => {
      expect(user.firstName).to.equal(userParams.firstName);
      expect(user.lastName).to.equal(userParams.lastName);
    });

    it('saves user with valid attributes', () =>
      user.save().then((newUser) => {
        expect(newUser.username).to.equal(user.username);
        expect(newUser.firstName).to.equal(user.firstName);
        expect(newUser.lastName).to.equal(user.lastName);
        expect(newUser.email).to.equal(user.email);
        expect(newUser.roleId).to.equal(user.roleId);
      })
    );
    it('has a role defined', () =>
      user.save().then(newUser =>
        User.findById(newUser.id, { include: [Role] })
          .then((foundUser) => {
            expect(foundUser.Role.title).to.equal(roleParams.title);
          })));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          user[attr] = null;

          return user.save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });

    describe('UNIQUE attributes', () => {
      uniqueAttrs.forEach((attr) => {
        it(`fails for non unique ${attr}`, () =>
          user.save()
            .then(newUser => User.build(userParams).save()
            )
            .then(newUser2 => expect(newUser2).to.not.exist)
            .catch(err =>
              expect(/UniqueConstraintError/.test(err.name)).to.be.true));
      });
    });

    it('fails for invalid email', () => {
      user.email = 'invalid email';
      return user.save()
        .then(newUser => expect(newUser).to.not.exist)
        .catch(err =>
          expect(/isEmail failed/.test(err.message)).to.be.true);
    });
  });
});
