import { expect } from 'chai';
import { Role } from '../../models/index';
import helper from '../test-helper';

const roleParams = helper.role;

let role;

describe('Role model', () => {
  before(() => {
    role = Role.build(roleParams);
    return Role.bulkCreate([helper.adminRole, helper.regularRole]);
  });

  // clear DB after test
  after(() => Role.sequelize.sync({ force: true }));

  describe('Create role', () => {
    it('creates a Role instance', () => expect(role).to.exist);

    it('has a title', () => expect(role.title).to.equal(roleParams.title));

    it('saves role with valid attributes', () =>
      role.save()
        .then(newRole => expect(newRole.title).to.equal(role.title)));

    it('has at least "admin" and "regular" roles', () =>
      Role.findAll()
        .then((roles) => {
          expect(roles[0].title).to.equal('admin');
          expect(roles[1].title).to.equal('regular');
        }));
  });

  describe('Validations', () => {
    it('fails without a title', () =>
      Role.create({})
        .then(newRole => expect(newRole).to.not.exist)
        .catch(err =>
          expect(/notNull/.test(err.message)).to.be.true)
    );

    it('fails for non unique title', () =>
      Role.create(roleParams)
        .then(newRole => expect(newRole).to.not.exist)
        .catch(err =>
          expect(/UniqueConstraintError/.test(err.name)).to.be.true));
  });
});
