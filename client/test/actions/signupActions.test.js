import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import userSignupRequest from '../../actions/signupActions';
import * as types from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('creates ADD_USER when sign up has been done',
    () => {
      const user = {
        username: 'chinonso',
        firstName: 'chinonso',
        lastName: 'ugorji',
        email: 'chinonsougorji@gmail.com',
        password: 'chinonsougorji' };
      nock('http://localhost.com/')
        .post('/users', user)
        .reply(200, {
          body: { user } });

      const expectedActions = [{ type: types.ADD_USER,
        user }];

      const store = mockStore({ users: [] });

      store.dispatch(userSignupRequest(user))
        .then((res) => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
