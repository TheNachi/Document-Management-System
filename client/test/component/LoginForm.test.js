import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginForm from '../../components/login/LoginForm';

function setup() {
  const props = {
    errors: {},
    loginProps: {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return mount(<LoginForm {...props} />);
}

describe('LoginForm Test', () => {
  it('renders form and h1', () => {
    const wrapper = setup();
    expect(wrapper.find('form')).toExist;
    expect(wrapper.find('Row')).toExist;
    expect(wrapper.find('h1').text()).toEqual('Login');
    expect(wrapper.find('div')).toExist;
  });
  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().loginProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
