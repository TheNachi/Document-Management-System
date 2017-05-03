/* global expect:true */
/* global shallow:true */
/* global mount:true */
import React from 'react'; // eslint-disable-line no-unused-vars

import ReduxFormSignup from '../../src/components/reusable/ReduxFormSignup.component';

describe('<ReduxFormSignup />', () => {
  it('should display a form using redux-form', () => {
    const wrapper = shallow(
      <ReduxFormSignup />
    );
    expect(wrapper.props().form).to.eql('signup');
  });
});
