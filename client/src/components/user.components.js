import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Navbar from './common/nav.components';
import DocumentsGrid from './documentsGrid.components';
import CustomDrawer from './customDrawer.components';
import Search from './search.components';
import {
  getUserDocs,
  createDoc,
  confirmDeleteDoc,
  clearConfirmDeleteDoc,
  editDoc,
  clearEditDoc,
  updateDoc,
  deleteDoc
} from '../actions/document.action';
import {
  editFolder,
  clearEditFolder,
  updateFolder,
  getUserFolders,
  createFolder,
  confirmDeleteFolder,
  clearConfirmDeleteFolder,
  deleteFolder
} from '../actions/folder.action';
import {
  getUser
} from '../actions/users.action';
import {
  showOnlyFolder,
  showOnlyDoc,
  showAll
} from '../actions/views.action';
import { searchUser, searchDocs, clearSearch } from '../actions/search.action';

@connect(store => ({
  user: store,
  form: store.form,
  error: store.error.error,
  auth: store.auth,
  docs: store.documents,
  folder: store.folder,
  views: store.views,
  search: store.search
}))
/**
 * React component for
 * @class User
 */
class User extends React.Component {

  /**
   * constructor
   * @param {object} props - props/properties belonging to this component
   */
  constructor(props) {
    super(props);
    this.handleShowAll = this.handleShowAll.bind(this);
    this.handleShowOnlyDoc = this.handleShowOnlyDoc.bind(this);
    this.handleShowOnlyFolder = this.handleShowOnlyFolder.bind(this);
    this.handleCreateFolder = this.handleCreateFolder.bind(this);
    this.handleDeleteFolder = this.handleDeleteFolder.bind(this);
    this.handleDeleteDoc = this.handleDeleteDoc.bind(this);
    this.handleCreateDoc = this.handleCreateDoc.bind(this);
    this.handleConfirmDeleteDoc = this.handleConfirmDeleteDoc.bind(this);
    this.handleConfirmDeleteFolder = this.handleConfirmDeleteFolder.bind(this);
    this.clearDeleteConfirmation = this.clearDeleteConfirmation.bind(this);
    this.handleEditDoc = this.handleEditDoc.bind(this);
    this.handleUpdateDoc = this.handleUpdateDoc.bind(this);
    this.handleClearEditDoc = this.handleClearEditDoc.bind(this);
    this.handleEditFolder = this.handleEditFolder.bind(this);
    this.handleUpdateFolder = this.handleUpdateFolder.bind(this);
    this.handleClearEditFolder = this.handleClearEditFolder.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
      this.props.dispatch(getUserFolders());
      this.props.dispatch(getUserDocs());
    }
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
   * handleClearEditDoc
   * @return {void}
   */
  handleClearEditDoc() {
    this.props.dispatch(clearEditDoc());
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
   * handleUpdateDoc
   * @param {object} values - values to update document with
   * @return {void}
   */
  handleUpdateDoc(values) {
    this.props.dispatch(updateDoc(values));
  }

  /**
   * handleEditFolder
   * @param {object} values - values to render dialog with
   * @return {void}
   */
  handleEditFolder(values) {
    this.props.dispatch(editFolder(values));
  }

  /**
   * handleClearEditFolder
   * @return {void}
   */
  handleClearEditFolder() {
    this.props.dispatch(clearEditFolder());
  }

  /**
   * handleUpdateFolder
   * @param {object} values - values to update folder with
   * @return {void}
   */
  handleUpdateFolder(values) {
    this.props.dispatch(updateFolder(values));
  }

  /**
   * handleDeleteDoc
   * @param {object} id - document id to delete
   * @return {void}
   */
  handleDeleteDoc(id) {
    this.props.dispatch(deleteDoc(id));
  }

  /**
   * handleConfirmDeleteDoc
   * @param {object} values - object to render confirmation dialog with
   * @return {void}
   */
  handleConfirmDeleteDoc(values) {
    this.props.dispatch(confirmDeleteDoc(values));
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
   * @param {object} values - object to render confirmation dialog with
   * @return {void}
   */
  handleConfirmDeleteFolder(values) {
    this.props.dispatch(confirmDeleteFolder(values));
  }

  /**
   * handleCreateFolder
   * @param {object} values - object to create folder with
   * @return {void}
   */
  handleCreateFolder(values) {
    this.props.dispatch(createFolder(values));
  }

  /**
   * handleDeleteFolder
   * @param {object} value - folder data to render confirmation dialog with
   * @return {void}
   */
  handleDeleteFolder(value) {
    this.props.dispatch(deleteFolder(value));
  }

  handleShowOnlyFolder() {
    this.props.dispatch(showOnlyFolder());
  }

  handleShowOnlyDoc() {
    this.props.dispatch(showOnlyDoc());
  }

  handleShowAll() {
    this.props.dispatch(showAll());
  }

  handleSearch(query) {
    if (query.target.value.length > 0) {
      this.props.dispatch(searchDocs(query.target.value));
      this.props.dispatch(searchUser(query.target.value));
    } else {
      this.handleClearSearch();
    }
  }

  handleClearSearch() {
    this.props.dispatch(clearSearch());
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
           username: this.props.user.users.details.username,
           userPage: '/app/dashboard'
         } }
         showSignout={ false }
         showSearch={ true }
         handleSearch={ this.handleSearch }
        />
        <div className="close-drawer">
        </div>
        <CustomDrawer
          title="iAmDocuman"
          showAll={ this.handleShowAll }
          showOnlyDoc={ this.handleShowOnlyDoc }
          id={ this.props.user.users.details.id }
          userRole={ this.props.user.users.details.roleId }
          showOnlyFolder={ this.handleShowOnlyFolder }
          username={ this.props.user.users.details.username }
          fullname={
            `${this.props.user.users.details.firstname}
             ${this.props.user.users.details.lastname}`}
        />
        {
          (this.props.search.results.users
            || this.props.search.results.docs) ?
            <Search data={ this.props.search.results }/>
          :
          <DocumentsGrid
            views={ this.props.views }
            docs={ this.props.docs.data || null }
            folders={ this.props.folder.data || null }
            onFolderCreate={ this.handleCreateFolder }
            onEditFolder={ this.handleEditFolder }
            toEditFolder={ this.props.folder.editFolder }
            clearEditFolder={ this.handleClearEditFolder }
            onFolderDelete={ this.handleDeleteFolder }
            onUpdateFolder={ this.handleUpdateFolder }
            openDeleteDialog={
              this.props.folder.confirmDelete
              || this.props.docs.confirmDelete
            }
            onConfirmFolderDelete={ this.handleConfirmDeleteFolder }
            onDocCreate={ this.handleCreateDoc }
            onDocDelete={ this.handleDeleteDoc }
            onConfirmDocDelete={ this.handleConfirmDeleteDoc }
            clearDeleteConfirmation={ this.clearDeleteConfirmation }
            onEditDoc={ this.handleEditDoc }
            toEdit={ this.props.docs.editDoc }
            clearEdit={ this.handleClearEditDoc }
            onUpdateDoc={ this.handleUpdateDoc }
          />
        }
      </div>
    );
  }
}

export default User;
