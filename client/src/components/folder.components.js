import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Navbar from './common/nav.components';
import { FroalaEditorView, FroalaEditor } from './common/fraola.components';
import CustomDrawer from './customDrawer.components';
import EditFolder from './editFolder.components';
import FolderDialog from './folderDialog.components';
import DeleteDialog from './deleteDialog.components';
import DocCard from './docCard.components';
import {
  getDoc,
  createDoc,
  deleteDoc,
  editDoc,
  confirmDeleteDoc,
  clearConfirmDeleteDoc
} from '../actions/document.action';
import {
  getFolder,
  getFolderDocs,
  getUserFolders,
  editFolder,
  clearEditFolder,
  updateFolder,
  confirmDeleteFolder,
  clearConfirmDeleteFolder,
  deleteFolder
} from '../actions/folder.action';
import {
  getUser
} from '../actions/users.action';

@connect((store) => {
  return {
    user: store,
    form: store.form,
    error: store.error.error,
    auth: store.auth,
    docs: store.documents,
    folders: store.folder
  };
})
/**
 * React component for
 * @class Folder
 */
class Folder extends React.Component {

  /**
   * constructor
   * @param {object} props - properties of object
   */
  constructor(props) {
    super(props);
    this.handleEditFolder = this.handleEditFolder.bind(this);
    this.handleClearEditFolder = this.handleClearEditFolder.bind(this);
    this.handleUpdateFolder = this.handleUpdateFolder.bind(this);
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    this.handleEditDoc = this.handleEditDoc.bind(this);
    this.handleGetUsersFolders = this.handleGetUsersFolders.bind(this);
    this.handleDeleteDoc = this.handleDeleteDoc.bind(this);
    this.handleConfirmDeleteDoc = this.handleConfirmDeleteDoc.bind(this);
    this.clearDeleteConfirmation = this.clearDeleteConfirmation.bind(this);
    this.handleConfirmDeleteFolder = this.handleConfirmDeleteFolder.bind(this);
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
      this.props.dispatch(getFolder(this.props.params.id));
      this.props.dispatch(getFolderDocs(this.props.params.id));
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
   * handleClearEditFolder
   * @return {void}
   */
  handleClearEditFolder() {
    this.props.dispatch(clearEditFolder());
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
    this.props.dispatch(deleteDoc(id, {
      action: getFolderDocs,
      id: this.props.params.id
    }));
  }

  /**
   * handleConfirmDeleteDoc
   * @param {object} id - id of document to delete
   * @return {void}
   */
  handleConfirmDeleteDoc(id) {
    this.props.dispatch(confirmDeleteDoc(id));
  }

  /**
   * clearDeleteConfirmation
   * @return {void}
   */
  clearDeleteConfirmation() {
    this.props.dispatch(clearConfirmDeleteDoc());
    this.props.dispatch(clearConfirmDeleteFolder());
  }

  /**
   * handleConfirmDeleteFolder
   * @param {object} values - values needed by
   * confirmation dialog of folder to delete
   * @return {void}
   */
  handleConfirmDeleteFolder() {
    const values = {
      id: this.props.params.id,
      title: this.props.folders.folder.title,
      type: 'folder'
    };
    this.props.dispatch(confirmDeleteFolder(values));
  }

  /**
   * getFolderDocs - map the documents array into jsx react element
   * @param {Array} documents
   * @return {Array} mapped array to be displayed
   */
  getFolderDocs(documents) {
    const self = this;
    return documents.map((doc, index) => (
        <div
          className="col s4 m3 l2"
          key={`folder-root-div-${doc.title} ${index}`}>
          <DocCard
            title={ doc.title }
            key={ doc.title + index }
            id={ doc.id }
            accessId={ doc.accessId }
            content={ doc.content }
            onDelete={ self.handleConfirmDeleteDoc }
            onEdit={ self.handleEditDoc }
          />
      </div>));
  }

  /**
   * handleDeleteFolder
   * @param {object} id - id of folder to delete
   * @return {void}
   */
  handleDeleteFolder(id) {
    this.props.dispatch(deleteFolder(id));
    browserHistory.push('/app/dashboard');
  }
  /**
   * handleEditDoc
   * @param {object} values - values to render dialog with
   * @return {void}
   */
  handleEditDoc(values) {
    this.props.dispatch(editDoc(values));
    browserHistory.push(`/app/edit/${values.id}`);
  }

  /**
   * handleEditFolder
   * @param {object} values - values to render dialog with
   * @return {void}
   */
  handleEditFolder() {
    const values = {
      id: this.props.folders.folder.id,
      title: this.props.folders.folder.title,
      content: this.props.folders.folder.content,
      accessId: this.props.folders.folder.accessId
    };
    this.props.dispatch(editFolder(values));
  }

  /**
   * handleUpdateFolder
   * @param {object} values - values to update folder with
   * @return {void}
   */
  handleUpdateFolder(values) {
    this.props.dispatch(updateFolder(values, {
      action: getFolder,
      payload: this.props.params.id
    }));
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
          userRole={ this.props.user.users.details.roleId }
          fullname={
            `${this.props.user.users.details.firstname}
             ${this.props.user.users.details.lastname}`}
        />
        <div className="content-display">
          <div className="row">
            {
              (this.props.folders.folder
                && this.props.folders.documents) ?
              <div>
                <EditFolder
                  openDialog={ this.handleEditFolder }
                  editButton={ this.props.folders.folder }
                  onEdit={ this.handleUpdateFolder }
                  edit={ this.props.folders.editFolder }
                  open={ (this.props.folders.editFolder) ? true : false }
                  onClose={ this.handleClearEditFolder }
                />
                <DeleteDialog
                  openDialog={ this.handleConfirmDeleteFolder }
                  deleteButton={ this.props.folders.folder }
                  onDelete={ this.handleDeleteFolder }
                  onDeleteConfirmation={ this.props.folders.confirmDelete }
                  clearDeleteConfirmation={ this.clearDeleteConfirmation }
                />
                <DeleteDialog
                  onDelete={ this.handleDeleteDoc }
                  onDeleteConfirmation={ this.props.docs.confirmDelete }
                  clearDeleteConfirmation={ this.clearDeleteConfirmation }
                />
                <hr />
                <div>
                  <div id="document-title">
                    <Link to="/app/dashboard">
                      <b>Dashboard </b>
                    </Link>
                    >
                    <b>
                      <i> { this.props.folders.folder.title }</i>
                    </b>
                  </div>
                  <div>
                  {
                    this.getFolderDocs(this.props.folders.documents)
                  }
                </div>
                </div>
              </div>
              :
              <div className="circular-loading">
                <CircularProgress />
                <h6>Loading folder</h6>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Folder;
