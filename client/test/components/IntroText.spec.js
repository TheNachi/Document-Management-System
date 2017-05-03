/* global expect:true */
/* global shallow:true */
/* global mount:true */

import React from 'react'; // eslint-disable-line no-unused-vars
import IntroText from '../../src/components/reusable/IntroText.component';

describe('<IntroText />', () => {
  it('should render a bold title and normal text', () => {
    const wrapper = shallow(
      <IntroText
        title="Tesing IntroText"
        text="testing IntroText with mocha and enzyme"
      />
    );
    expect(wrapper.find('h3')).to.have.length(1);
    expect(wrapper.find('h3').props().children)
      .to.eql('Tesing IntroText');
    expect(wrapper.find('.header-text')).to.have.length(1);
    expect(wrapper.find('.header-text').props().children)
      .to.eql('testing IntroText with mocha and enzyme');
  });

  it('should create a link and use materialize-ui <RaisedButton/> if link prop is set',
  () => {
    const wrapper = shallow(
      <IntroText
        title="Tesing IntroText"
        text="testing IntroText with mocha and enzyme"
        link={ {
          label: 'External',
          href: 'http://google.com'
        } }
      />
    );
    expect(wrapper.find('a')).to.have.length(1);
    expect(wrapper.find('a').props().children
      .type.muiName).to.eql('RaisedButton');
    expect(wrapper.find('a').props().children.props.label)
      .to.eql('External');
    expect(wrapper.find('a').props().href)
      .to.eql('http://google.com');
  });
});
