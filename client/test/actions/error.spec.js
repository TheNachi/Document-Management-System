/* global expect: true */
import { clearError, validationError } from '../../src/actions/error.action';

describe('Action::Error', () => {
  describe('#clearError()', () => {
    it('returns action CLEAR_ERROR', () => {
      const action = clearError();
      expect(action).to.deep.equal({
        type: 'CLEAR_ERROR'
      });
    });
  });

  describe('#validationError()', () => {
    it('returns action VALIDATION_ERROR with error info', () => {
      const action = validationError({
        error: 'firstname is empty'
      });
      expect(action).to.deep.equal({
        type: 'VALIDATION_ERROR',
        payload: {
          error: 'firstname is empty'
        }
      });
    });
    it('returns action VALIDATION_ERROR with default info', () => {
      const action = validationError();
      expect(action).to.deep.equal({
        type: 'VALIDATION_ERROR',
        payload: {
          error: 'Oops! an error occured :('
        }
      });
    });
  });
});
