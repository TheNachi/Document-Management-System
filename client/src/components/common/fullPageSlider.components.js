/* globals $:true */

import React from 'react';
import PropTypes from 'prop-types';

/**
* Get zIndex of a component based on the position prop
* @param {Object} props - props of the component
* @return {Object} returns calculated style
*/
function position(props) {
  return {
    zIndex: (props.position === 'back') ? -10 : 10
  };
}

/**
 * React component for FullPageSlider
 * A component that renders a fullpage slide show
 * @class FullPageSlider
 */
class FullPageSlider extends React.Component {

  /**
   * React componentDidMount lifecycle method.
   * It starts the slideshow just after the component renders.
   * @return {void}
   */
  componentDidMount() {
    this.props.startSlider();
  }

  /**
   * React render method. Renders the component
   * @return {ReactElement} JSX react element for FullPageSlider component
   */
  render() {
    return (
    <div>
      <div className="fullpage-overlay">
      </div>
      <div
        className="slider fullscreen"
        style={ position(this.props) }>
        <ul className="slides">
          { this.props.children }
        </ul>
      </div>
    </div>
    );
  }
}

FullPageSlider.defaultProps = {
  style: {},
  position: 'back',
  startSlider() {
    return null;
  }
};

FullPageSlider.propTypes = {
  style: PropTypes.object,
  position: PropTypes.string,
  startSlider: PropTypes.func
};

export default FullPageSlider;
