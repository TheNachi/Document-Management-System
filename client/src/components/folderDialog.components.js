import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FolderAdd from 'material-ui/svg-icons/file/create-new-folder';
import CircularProgress from 'material-ui/CircularProgress';

const customContentStyle = {
  width: '20%',
  maxWidth: 'none',
  maxHeight: 600,
  overflowY: 'scroll',
  textAlign: 'center'
};

/**
 * React component for
 * @class CreateFolder
 */
class FolderDialog extends React.Component {

  /**
   * constructor
   * @param {object} props - props passed to component
   *
   */
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.renderFolders = this.renderFolders.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { open: false, folderName: '' };
  }

  handleOpen() {
    if (!this.props.folders) {
      this.props.onGetFolders();
    }
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleSubmit(event) {
    event.persist();
    event.preventDefault();
    this.props.onCreate({
      title: this.state.folderName
    });
    this.handleClose();
  }

  /**
   * renderFolders
   * @return {void}
   */
  renderFolders() {
    const self = this;
    return this.props.folders.map((folder, index) => (
        <div key={ `div-${folder.title} ${index}` }
          onClick={ () => self.props.onAddDoc(folder.id) }>
          <ListItem
            leftIcon={<img src="/images/folder.png" />}
            primaryText={ folder.title }
            key={ `${folder.title} ${index}` }
          />
        </div>
      ));
  }

  /**
   * @return {object} react element to render
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this.handleClose }
      />
    ];

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
          title="Add to folder"
          contentStyle={ customContentStyle }
          actions={
            actions
          }
          style={ { paddingTop: 0 } }
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={ true }
          onRequestClose={ this.handleClose }
        >
          {
            (!this.props.folders) ?
              <CircularProgress />
              :
              <List>
                { this.renderFolders() }
              </List>
          }
        </Dialog>
      </div>
    );
  }
}

export default FolderDialog;
