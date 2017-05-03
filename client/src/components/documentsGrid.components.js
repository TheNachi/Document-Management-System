import React from 'react';
import PropTypes from 'prop-types';
import DocCard from './docCard.components';
import FolderCard from './folderCard.components';
import CreateFolder from './documents/createFolder.components';
import CreateDoc from './createDoc.components';
import EditFolder from './editFolder.components';
import DeleteDialog from './deleteDialog.components';
import renderFromProps from '../utilities/helper';

/**
 * React component for
 * @class DocumentGrid
 */
class DocumentGrid extends React.Component {

  /**
   * constructor
   * @param {object} props - props belonging to component
   */
  constructor(props) {
    super(props);
    this.renderDocs = this.renderDocs.bind(this);
    this.renderFolders = this.renderFolders.bind(this);
  }

  /**
   * renderFolders
   * @param {Array} folders - folders data retrieved from endpoint
   * @return {Array} mapped folders
   */
  renderFolders(folders) {
    const self = this;
    return folders.map((folder, index) =>
      (
        <div className="col s4 m3 l2" key={`root-div-${folder.title} ${index}`}>
          <FolderCard
            title={ folder.title }
            key={ folder.title + index }
            id={ folder.id }
            onDelete={ self.props.onConfirmFolderDelete }
            onEdit={ self.props.onEditFolder }
            />
        </div>));
  }

  /**
   * renderDocs
   * @param {Array} documents - documents data retrieved from endpoint
   * @return {Array} mapped documents
   */
  renderDocs(documents) {
    const self = this;
    return documents.map((doc, index) => (
      (doc.folderId === null || self.props.showOnlyDoc) ?
        <div className="col s4 m3 l2" key={`root-div-${doc.title} ${index}`}>
          <DocCard
            title={ doc.title }
            key={ doc.title + index }
            id={ doc.id }
            accessId={ doc.accessId }
            content={ doc.content }
            onDelete={ self.props.onConfirmDocDelete }
            onEdit={ self.props.onEditDoc }
            />
        </div>
        : ''
    ));
  }

  /**
   * render
   * @return {object} react element to render
   */
  render() {
    return (
      <div className="content-display">
        <div className="row">
          <CreateFolder onCreate={ this.props.onFolderCreate } />
          <CreateDoc onCreate={ this.props.onDocCreate } />
        </div>
        <EditFolder
          onEdit={ this.props.onUpdateFolder }
          edit={ this.props.toEditFolder }
          open={ (this.props.toEditFolder) ? true : false }
          onClose={ this.props.clearEditFolder }
        />
        <DeleteDialog
          onDelete={
            (renderFromProps(
              this.props.openDeleteDialog,
              'type') === 'folder') ?
              this.props.onFolderDelete
              :
              this.props.onDocDelete
          }
          onDeleteConfirmation={ this.props.openDeleteDialog }
          clearDeleteConfirmation={ this.props.clearDeleteConfirmation }
        />
        <hr />
        <div className="row ">
          {
            (this.props.folders && !this.props.views.showOnlyDoc) ?
              this.renderFolders(this.props.folders)
              : ''
          }
          {
            (this.props.docs && !this.props.views.showOnlyFolder) ?
              this.renderDocs(this.props.docs)
              : ''
          }
        </div>
      </div>
    );
  }
}

DocumentGrid.defaultProps = {
  views: {
    showOnlyFolder: false,
    showOnlyDoc: false
  }
};

DocumentGrid.propTypes = {
  data: PropTypes.array,
  docs: PropTypes.array,
  folder: PropTypes.array,
  openDeleteDialog: PropTypes.func,
  clearDeleteConfirmation: PropTypes.func,
  onFolderDelete: PropTypes.func,
  onDocDelete: PropTypes.func,
  onFolderCreate: PropTypes.func,
  onDocCreate: PropTypes.func,
  onUpdateFolder: PropTypes.func,
  onUpdateDoc: PropTypes.func,
  clearEditFolder: PropTypes.func,
  editFolder: PropTypes.func
};

export default DocumentGrid;
