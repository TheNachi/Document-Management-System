import React from 'react';

import Alert from '../../src/components/reusable/Alert.component';

describe('<Alert />', () => {
  it('should have a box', () => {
    const wrapper = shallow(
      <Alert info={ { success: 'Yes' } }/>
    );
    expect(wrapper.find('#card-alert')).to.have.length(1);
  });

  it('should have props for message and error type', () => {
    const wrapper = shallow(
      <Alert info={ { error: 'An error occured' } }/>
    );
    expect(wrapper.find('.card-content')
      .props().children.props.children)
  });
});
