import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DocumentAdd from 'material-ui/svg-icons/action/note-add';
import { FroalaEditor } from './common/fraola.components';

const customContentStyle = {
  width: '70%',
  maxWidth: 'none',
  marginTop: 20,
  textAlign: 'center'
};

/**
 * A dialog box to create documents
 * @class CreateDoc
 */
class CreateDoc extends React.Component {

  /**
   * @constructor
   * @param {object} props - props of this component
   */
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.state = {
      open: false,
      title: '',
      content: '',
      accessId: 1
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  /**
   * handleOpen - change the open state of component to true
   * @return {void}
   */
  handleOpen() {
    this.setState({ open: true });
  }

  /**
   * handleClose - change the open state of component to false
   * @return {void}
   */
  handleClose() {
    this.setState({ open: false });
  }

  /**
   * handleSubmit
   * @param {object} event - properties of element
   * @return {void}
   */
  handleSubmit(event) {
    event.persist();
    event.preventDefault();
    this.props.onCreate(this.state);
    this.handleClose();
  }

  /**
   * handleChange
   * @param {object} event - properties of element
   * @return {void}
   */
  handleChange(event) {
    event.persist();
    const value = event.target.value;
    this.setState({ title: value });
  }

  /**
   * handleSelectChange
   * @param {object} event - event properties of selected option
   * @param {number} index - index location of selected option
   * @param {string} value - current option from SelectField
   * @return {void}
   */
  handleSelectChange(event, index, value) {
    this.setState({ accessId: value });
  }

  /**
   * handleContentChange
   * @param {object} content - text in the content text area
   * @return {void}
   */
  handleContentChange(content) {
    this.setState({ content });
  }

  /**
   * @return {ReactElement} returns component
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this.handleClose }
      />,
      <FlatButton
        label="Create Document"
        primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this.handleSubmit }
      />,
    ];

    return (
      <div className="col s3 m3 l1">
        <FloatingActionButton
          mini={true}
          onTouchTap={
            this.handleOpen
          }
        >
          <DocumentAdd />
        </FloatingActionButton>
        <Dialog
          title="Create Document"
          contentStyle={ customContentStyle }
          actions={
            actions
          }
          modal={false}
          open={this.state.open}
          onRequestClose={ this.handleClose }
          autoScrollBodyContent={true}
          bodyClassName="create-doc"
        >
          <div className="row container">
            <div className="input-field col s6 m6 l6">
              <input
                type="text"
                name="title"
                value={ this.state.title }
                onChange={
                  event => this.handleChange(event)
                }
              />
              <label>Enter document title</label>
            </div>
            <div className="input-field col l6 m6 s6">
              <SelectField
                floatingLabelText="Select Access Level"
                value={this.state.accessId}
                onChange={this.handleSelectChange}
              >
                <MenuItem value={1} primaryText="PUBLIC" />
                <MenuItem value={2} primaryText="PRIVATE" />
              </SelectField>
            </div>
          </div>
          <FroalaEditor
            tag='textarea'
            model={
              (this.props.type === 'edit') ?
                this.props.edit.content
                :
                this.state.content
              }
            onModelChange={ this.handleContentChange }
          />
        </Dialog>
      </div>
    );
  }
}

export default CreateDoc;
