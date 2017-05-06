import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentDetails from './DocumentDetails';

class DocumentDetailsPage extends React.Component {
  constructor() {
    super();

    this.deleteDoc = this.deleteDoc.bind(this);
  }

  deleteDoc(id) {
    this.props.actions.deleteDocument(id)
      .then(res => toastr.success('Document deleted successfully!'));
  }

  render() {
    return (
      <div>
        <DocumentDetails
         document={this.props.document}
         deleteDocument={this.deleteDoc}
         currentUser={this.props.auth.user}
        />
      </div>
    );
  }
}

DocumentDetailsPage.propTypes = {
  document: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
};

function getDocumentById(documents, id) {
  const document = documents.filter(item => item.id === id);
  if (document) return document[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const documentId = ownProps.params.id; // from the path `/document/:id`

  let document;

  if (documentId && state.documents.length > 0) {
    document = getDocumentById(state.documents, parseInt(documentId, 10));
  }

  return {
    document,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsPage);
