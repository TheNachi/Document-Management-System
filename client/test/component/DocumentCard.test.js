import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentCard from '../../components/documents/DocumentCard';

function setup() {
  const props = {
    document: { title: '', content: '', access: '' },
    deleteDocument: () => {},
  };

  return mount(<DocumentCard {...props} />);
}

describe('DocumentForm Test', () => {
  it('renders a row div', () => {
    const wrapper = setup();
    expect(wrapper.find('.row')).toExist;
  });

  it('renders card', () => {
    const wrapper = setup();
    expect(wrapper.find('.card')).toExist;
  });
});
