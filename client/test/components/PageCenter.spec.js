/* global expect:true */
/* global shallow:true */
/* global mount:true */
import React from 'react'; // eslint-disable-line no-unused-vars
import PageCenter from '../../src/components/reusable/PageCenter.component';

describe('<PageCenter />', () => {
  it('should use material css classes to align vertically', () => {
    const wrapper = shallow(
      <PageCenter>
        <h3>I AM CENTER!</h3>
      </PageCenter>
    );
    expect(wrapper.find('.valign'))
      .to.have.length(1);
    expect(wrapper.find('.valign').parent().is('div'))
      .to.equal(true);
    expect(wrapper.find('.valign-wrapper'))
      .to.have.length(1);
  });

  it('should place child element in child div of root div', () => {
    const wrapper = shallow(
      <PageCenter>
        <h3>I AM CENTER!</h3>
      </PageCenter>
    );
    expect(wrapper.find('h3')).to.have.length(1);
    expect(wrapper.find('h3').parent().is('div')).to.equal(true);
  });
});
