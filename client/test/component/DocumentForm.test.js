import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentForm from '../../components/documents/DocumentForm';

function setup(saving) {
  const props = {
    document: {},
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<DocumentForm {...props} />);
}

describe('DocumentForm Test', () => {
  it('renders form and h5', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h5').text()).toEqual('Create/Update a Document');
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Input').at(3).props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('Input').at(3).props().value).toBe('Saving...');
  });
});
