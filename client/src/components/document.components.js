import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Edit from 'material-ui/svg-icons/image/edit';
import Navbar from './common/nav.components';
import { FroalaEditorView } from './common/fraola.components';
import CustomDrawer from './customDrawer.components';
import FolderDialog from './folderDialog.components';
import DeleteDialog from './deleteDialog.components';
import {
  getDoc,
  createDoc,
  deleteDoc,
  editDoc,
  confirmDeleteDoc,
  clearConfirmDeleteDoc
} from '../actions/document.action';
import {
  addDoc,
  getUserFolders,
} from '../actions/folder.action';
import {
  getUser
} from '../actions/users.action';

@connect(store =>
  ({
    user: store,
    form: store.form,
    error: store.error.error,
    auth: store.auth,
    docs: store.documents,
    folder: store.folder
  }))
/**
 * React component for
 * @class User
 */
class Document extends React.Component {

  /**
   * constructor
   * @param {object} props - object properties of component
   */
  constructor(props) {
    super(props);
    this.handleAddDoc = this.handleAddDoc.bind(this);
    this.handleEditDoc = this.handleEditDoc.bind(this);
    this.handleGetUsersFolders = this.handleGetUsersFolders.bind(this);
    this.handleDeleteDoc = this.handleDeleteDoc.bind(this);
    this.handleConfirmDeleteDoc = this.handleConfirmDeleteDoc.bind(this);
    this.clearDeleteConfirmation = this.clearDeleteConfirmation.bind(this);
  }
  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/app/login');
    } else {
      this.props.dispatch(getUser());
      this.props.dispatch(getDoc(this.props.params.id));
    }
  }

  /**
   * handleGetUsersFolders
   * @return {void}
   */
  handleGetUsersFolders() {
    setTimeout(() => {
      this.props.dispatch(getUserFolders());
    }, 2000);
  }

  /**
   * handleCreateDoc
   * @param {object} values - values to create document with
   * @return {void}
   */
  handleCreateDoc(values) {
    this.props.dispatch(createDoc(values));
  }

  /**
   * handleDeleteDoc
   * @param {object} id - document id to delete
   * @return {void}
   */
  handleDeleteDoc(id) {
    this.props.dispatch(deleteDoc(id));
    browserHistory.push('/app/dashboard');
  }

  /**
   * handleConfirmDeleteDoc
   * @param {object} id - id of document to delete
   * @return {void}
   */
  handleConfirmDeleteDoc() {
    const values = {
      id: this.props.params.id,
      title: this.props.docs.doc.title,
      type: 'document'
    };
    this.props.dispatch(confirmDeleteDoc(values));
  }

  /**
   * clearDeleteConfirmation
   * @return {void}
   */
  clearDeleteConfirmation() {
    this.props.dispatch(clearConfirmDeleteDoc());
  }

  /**
   * handleEditDoc
   * @return {void}
   */
  handleEditDoc() {
    this.props.dispatch(editDoc({
      id: this.props.docs.doc.id,
      title: this.props.docs.doc.title,
      content: this.props.docs.doc.content
    }));
    browserHistory.push(`/app/edit/${this.props.docs.doc.id}`);
  }

  /**
   * handleAddDoc
   * @param {number} folderId - id of folder to add document to
   * @return {void}
   */
  handleAddDoc(folderId) {
    this.props.dispatch(addDoc(folderId,
      { id: this.props.docs.doc.id }));
    browserHistory.push(`/app/folder/${folderId}`);
  }

  /**
   * @return {object} react element to render
   */
  render() {
    return (
      <div>
        <Navbar
         type="dark"
         title="iAmDocuman"
         isAuthenticated={ {
           username: 'asheAmao',
           userPage: '/app/dashboard'
         } }
         showSignout={ false }
        />
        <div className="close-drawer">
        </div>
        <CustomDrawer
          title="iAmDocuman"
          username={ this.props.user.users.details.username }
          id={ this.props.user.users.details.id }
          userRole={ this.props.user.users.details.roleId }
          fullname={
            `${this.props.user.users.details.firstname}
             ${this.props.user.users.details.lastname}`}
        />
          <div className="content-display">
            <div className="row">
              {
                (this.props.docs.doc) ?
                <div className="col s12 m12 l12">
                  <FolderDialog
                    folders={ this.props.folder.data }
                    onAddDoc={ this.handleAddDoc }
                    onGetFolders={ this.handleGetUsersFolders }
                  />
                  <div className="col s3 m3 l1">
                      <FloatingActionButton
                        mini={true}
                        onTouchTap={
                          () => this.handleEditDoc()
                        }
                      >
                        <Edit />
                      </FloatingActionButton>
                  </div>
                  <DeleteDialog
                    deleteButton={ this.props.docs.doc }
                    onDelete={ this.handleDeleteDoc }
                    openDialog={ this.handleConfirmDeleteDoc }
                    onDeleteConfirmation={ this.props.docs.confirmDelete }
                    clearDeleteConfirmation={ this.clearDeleteConfirmation }
                  />

                  <hr />
                  <div>
                    <div id="document-title">
                      <h5>{ this.props.docs.doc.title}</h5>
                    </div>
                    <div id="document-content">
                      <FroalaEditorView
                        model={ this.props.docs.doc.content } />
                    </div>
                  </div>
                </div>
                :
                <div className="circular-loading">
                  <CircularProgress />
                  <h6>Loading document</h6>
                </div>
              }
            </div>
          </div>
      </div>
    );
  }
}

export default Document;
