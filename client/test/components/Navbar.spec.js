/* global expect:true */
/* global shallow:true */
/* global mount:true */

import React from 'react'; // eslint-disable-line no-unused-vars
import { shallow } from 'enzyme';

import Navbar from '../../src/components/reusable/Navbar.component';

const defaultStyle = {
  backgroundColor: '#222222',
  opacity: 0.7,
  position: 'fixed',
  top: 0,
  zIndex: 10
};

describe('<Navbar />', () => {
  it('should leverage on materialize-ui AppBar component to render view',
  () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('AppBar')).to.have.length(1);
  });

  it('should render <AppBar /> with title', () => {
    const wrapper = shallow(
      <Navbar
        title="test"
        showLogin={ false }
      />
    );
    expect(wrapper.props().title) // eslint-disable-line no-unused-expressions
      .to.be.defined;
    expect(wrapper.props().title)
      .to.eql('test');
  });

  it('should render <AppBar /> with default style', () => {
    const wrapper = shallow(
      <Navbar
        title="test"
        showLogin={ false }
      />
    );
    expect(wrapper.props().style) // eslint-disable-line no-unused-expressions
      .to.be.defined;
    expect(wrapper.props().style)
      .to.eql(defaultStyle);
  });

  it('should render <AppBar /> and show by default, Login and Signup button',
  () => {
    const wrapper = shallow(
      <Navbar
        title="test"
      />
    );
    expect(wrapper.props()
    .iconElementRight.props.children[0]
    .props.children.props.label).to.eql('Login');
    expect(wrapper.props()
    .iconElementRight.props.children[1]
    .props.children.props.label).to.eql('Sign Up');
  });

  it('should render <AppBar /> and hide login button if showLogin prop is false',
  () => {
    const wrapper = shallow(
      <Navbar
        title="test"
        showLogin={ false }
      />
    );
    expect(wrapper.props()
    .iconElementRight.props.children[0]).to.eql('');
    expect(wrapper.props()
    .iconElementRight.props.children[1]
    .props.children.props.label).to.eql('Sign Up');
  });

  it('should render <AppBar /> and hide signup button if showSignup prop is false',
  () => {
    const wrapper = shallow(
      <Navbar
        title="test"
        showSignup={ false }
      />
    );
    expect(wrapper.props()
    .iconElementRight.props.children[0]
    .props.children.props.label).to.eql('Login');
    expect(wrapper.props()
    .iconElementRight.props.children[1]).to.eql('');
  });

  it('should use material-ui <RaisedButton /> component for signup and login',
  () => {
    const wrapper = shallow(
      <Navbar
        title="test"
      />
    );
    expect(wrapper.props()  // eslint-disable-line no-unused-expressions
    .iconElementRight.props.children[0]
    .props.children.type).to.be.a.Function;
    expect(wrapper.props()
    .iconElementRight.props.children[0]
    .props.children.type.muiName).to.eql('RaisedButton');
    expect(wrapper.props()  // eslint-disable-line no-unused-expressions
    .iconElementRight.props.children[1]
    .props.children.type).to.be.a.Function;
    expect(wrapper.props()
    .iconElementRight.props.children[1]
    .props.children.type.muiName).to.eql('RaisedButton');
  });

  it('should only show Hello {username}! and signout button if isAuthenticated',
  () => {
    const wrapper = shallow(
      <Navbar
        title="test"
        isAuthenticated={ {
          username: 'Freddy',
          userPage: '/user'
        } }
      />
    );
    expect(wrapper.props()
    .iconElementRight.props.children[0]
    .props.to).to.eql('/user');
    expect(wrapper.props()
    .iconElementRight.props.children[0]
    .props.children.join('')).to.eql('Hello Freddy!');
    expect(wrapper.props()
    .iconElementRight.props.children[1]
    .props.children.props.label).to.eql('Sign Out');
  });

  it('should wrap every button in <Link /> component from react-router',
  () => {
    const wrapper = shallow(
      <Navbar
        title="test"
      />
    );
    expect(wrapper.props()
    .iconElementRight.props.children[0]
    .type.displayName).to.eql('Link');
    expect(wrapper.props()
    .iconElementRight.props.children[0]
    .props.to).to.eql('/login');
    expect(wrapper.props()
    .iconElementRight.props.children[1]
    .type.displayName).to.eql('Link');
    expect(wrapper.props()
    .iconElementRight.props.children[1]
    .props.to).to.eql('/signup');
  });
});
