import expect from 'expect';
import search from '../../reducers/search';
import * as actions from '../../actions/searchActions';

describe('Search Reducer', () => {
  it('should add document SEARCH_RESULTS', () => {
    const initialState = [];
    const documentsSearched = [
      { id: '1', title: 'A' },
      { id: '2', title: 'AA' },
      { id: '3', title: 'AAC' }
    ];

    const action = actions.documentsSearched(documentsSearched);

    // act
    const newState = search(initialState, action);

    expect(newState.length).toEqual(documentsSearched.length);
  });
});
