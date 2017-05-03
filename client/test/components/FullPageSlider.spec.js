/* global expect:true */
/* global shallow:true */
/* global mount:true */
import React from 'react'; // eslint-disable-line no-unused-vars
import FullPageSlider from '../../src/components/reusable/FullPageSlider.component';

describe('<FullPageSlider />', () => {
  it('should render images', () => {
    const wrapper = shallow(
      <FullPageSlider >
        <li>
          <img src="http://lorempixel.com/580/250/nature/4" />
        </li>
        <li>
          <img src="http://lorempixel.com/580/250/nature/5" />
        </li>
      </FullPageSlider>
    );
    expect(wrapper.find('img')).to.have.length(2);
  });

  it('should set default position to behind most other components',
  () => {
    const wrapper = shallow(
      <FullPageSlider >
        <li>
          <img src="http://lorempixel.com/580/250/nature/4" />
        </li>
        <li>
          <img src="http://lorempixel.com/580/250/nature/5" />
        </li>
      </FullPageSlider>
    );
    expect(wrapper.find('.slider').props().style.zIndex)
      .to.eql(-10);
  });

  it('should have a default function that runs the slider',
  () => {
    const wrapper = mount(
      <FullPageSlider >
        <li>
          <img src="http://lorempixel.com/580/250/nature/4" />
        </li>
        <li>
          <img src="http://lorempixel.com/580/250/nature/5" />
        </li>
      </FullPageSlider>
    );
    expect(wrapper.props().startSlider) // eslint-disable-line no-unused-expressions
      .to.be.a.Function;
  });
});
