import React from 'react';
import NavigationBar from './common/NavigationBar';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

export default App;
