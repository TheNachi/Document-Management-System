import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import SignupForm from '../../components/signup/SignupForm';

function setup() {
  const props = {
    errors: {},
    userProps: {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return mount(<SignupForm {...props} />);
}

describe('LoginForm Test', () => {
  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('Input').length).toEqual(7);
    expect(wrapper.find('h4').text()).toEqual('Register');
  });
  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().userProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
