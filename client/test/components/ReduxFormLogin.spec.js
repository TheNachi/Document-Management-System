/* global expect:true */
/* global shallow:true */
/* global mount:true */
import React from 'react'; // eslint-disable-line no-unused-vars

import ReduxFormLogin from '../../src/components/reusable/ReduxFormLogin.component';

describe('<ReduxFormSignup />', () => {
  it('should display a form using redux-form', () => {
    const wrapper = shallow(
      <ReduxFormLogin />
    );
    expect(wrapper.props().form).to.eql('login');
  });
});
