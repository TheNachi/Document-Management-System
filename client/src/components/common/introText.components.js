import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';


const rootDivStyle = {
  textAlign: 'center',
  height: '100vh',
  color: '#FFFFFF'
};

const centerDivStyle = {
  width: '100vw',
  padding: '10%',
  display: 'block'
};

/**
 * React component for IntroText
 * A component that renders a centered Introductory message
 * @class IntroText
 */
class IntroText extends React.Component {

  /**
   * React render method. Renders the component
   * @return {ReactElement} JSX react element for IntroText component
   */
  render() {
    return (
      <div style={ this.props.rootDivStyle } className={ 'valign-wrapper' }>
        <div className="valign" style={ this.props.centerDivStyle }>
          <h3 className="intro-text-title">{ this.props.title }</h3>
          <p className="header-text">{ this.props.text }</p>
          {
            (this.props.link) ?
            <a className="intro-link" href={ this.props.link.href }>
              <RaisedButton
                label={ this.props.link.label }
                primary={ true }
              />
            </a>
            :
            ''
          }
        </div>
      </div>
    );
  }
}

IntroText.defaultProps = {
  link: null,
  title: window.location.origin.split('//')[1],
  text: window.location.origin,
  rootDivStyle,
  centerDivStyle
};

IntroText.propTypes = {
  link: PropTypes.object,
  color: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  rootDivStyle: PropTypes.object,
  centerDivStyle: PropTypes.object
};

export default IntroText;
