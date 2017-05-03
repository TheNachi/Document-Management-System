import React from 'react';
import _ from 'underscore';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FolderAdd from 'material-ui/svg-icons/file/create-new-folder';

const customContentStyle = {
  width: '30%',
  maxWidth: 'none',
  textAlign: 'center'
};

/**
 * React component for
 * @class CreateFolder
 */
class CreateFolder extends React.Component {

  /**
   * constructor
   * @param {object} props - props passed to component
   *
   */
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { open: false, folderName: '' };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit(event) {
    event.persist();
    event.preventDefault();
    this.props.onCreate({
      title: this.state.folderName
    });
    this.handleClose();
  }

  handleChange(target) {
    const value = target.value;
    this.setState({ folderName: value });
  }

  /**
   * @return {object} return react element
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Create Folder"
        primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this.handleSubmit }
      />,
    ];

    const changeHandler = _.compose(
      _.debounce(this.handleChange.bind(this), 100),
      _.property('target')
    );

    return (
      <div className="col s3 m3 l1">
        <FloatingActionButton
          mini={true}
          onTouchTap={
            this.handleOpen
          }
        >
          <FolderAdd />
        </FloatingActionButton>
        <Dialog
          title="Create Folder"
          contentStyle={ customContentStyle }
          actions={
            actions
          }
          modal={false}
          open={this.state.open}
          onRequestClose={ this.handleClose }
        >
          <img src="/images/folder.png" style={ { width: '35%' } } />
          <form
            onSubmit={
              event => this.handleSubmit(event)
            }>
            <input
              type="text"
              name="title"
              value={ this.state.folderName }
              onChange={ changeHandler }
            />
            <label>Enter folder name</label>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default CreateFolder;
