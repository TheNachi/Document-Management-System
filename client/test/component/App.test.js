import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import App from '../../components/App.components.jsx';
import NavigationBar from '../../components/common/NavBar.components.jsx';

describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders NavigationBar', () => {
    const wrapper = shallow(<App />);
    const navbar = <NavigationBar />;
    expect(wrapper.contains(navbar)).toEqual(true);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <App>
        <NavigationBar />
      </App>
    );
    expect(wrapper.contains(<NavigationBar />)).toEqual(true);
  });
});
