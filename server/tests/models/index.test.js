import { expect } from 'chai';
import { User, Role, Document } from '../../models/index';

describe('Models', () => {
  it('User model exists', () => expect(User).to.exist);
  it('Role model exists', () => expect(Role).to.exist);
  it('Document model exists', () => expect(Document).to.exist);
});
