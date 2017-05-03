import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import returnFromProp from '../utilities/helper';


const customContentStyle = {
  width: '30%',
  maxWidth: 'none',
  textAlign: 'center'
};

/**
 * @class DeleteDialog
 *
 */
class DeleteDialog extends React.Component {

  /**
   * constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { open: false };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.onDeleteConfirmation
      && typeof nextProps.onDeleteConfirmation.id
      && !this.state.open) {
      this.handleOpen();
    }
  }

  handleClose() {
    this.setState({ open: false });
    this.props.clearDeleteConfirmation();
  }

  handleSubmit() {
    if (this.props.deleteButton) {
      this.props
        .onDelete(this.props.deleteButton.id);
    } else {
      this.props
        .onDelete(this.props.onDeleteConfirmation.id);
    }
    this.handleClose();
  }

  /**
   * render
   * @return {object} returns a react object
   */
  render() {
    const actions = [
      <FlatButton
        label="NO"
        primary={ true }
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="YES"
        primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this.handleSubmit }
      />,
    ];

    return (
      <div>
        {
          (this.props.deleteButton) ?
          <FloatingActionButton
            mini={true}
            onTouchTap={ this.props.openDialog }
          >
            <DeleteIcon />
          </FloatingActionButton>
          :
          ''
        }
        <Dialog
          title={ `Delete ${
            returnFromProp(this.props.onDeleteConfirmation, 'type')
          }` }
          contentStyle={ customContentStyle }
          actions={
            actions
          }
          modal={ false }
          open={ this.state.open }
          onRequestClose={ this.handleClose }
        >
          <img
            src={ (
              returnFromProp(
                this.props.onDeleteConfirmation,
                'type') === 'folder') ?
              '/images/folder.png' : '/images/file.png'
          } style={ { width: '35%' } } />
          <p>
            <b>
              { returnFromProp(this.props.onDeleteConfirmation, 'title') }
            </b>
          </p>
          <h5>Are you sure you want to delete this {
            returnFromProp(this.props.onDeleteConfirmation, 'type')
          }?</h5>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
