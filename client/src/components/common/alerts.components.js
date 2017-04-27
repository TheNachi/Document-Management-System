import React from 'react';

const buttonStyle = {
  background: 'none',
  border: 'none',
  position: 'absolute',
  top: 15,
  right: 10,
  fontSize: 10
};

/**
 * React component for Alert.
 * Renders an error or success alert box depending on
 * the props that are passed in
 * @class Alert
 */
class Alert extends React.Component {

  /**
   * render - React's render method.
   * Checks if the props is error or success, then renderes appropriate alert
   * @return {object}  description
   */
  render() {
    return (
      <div id="card-alert" className={
          (this.props.info.error) ?
          'card red' : 'card green'
        } >
        <div className="card-content white-text">
          <p>{ this.props.info.error || this.props.info.success }</p>
        </div>
        {
          (this.props.onClose) ?
            <button style={ buttonStyle } type="button" className="close white-text"
                data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"
                  onClick={ () => this.props.onClose() }>
                  X
                </span>
            </button>
            :
            ''
        }
      </div>
    );
  }
}

export default Alert;
