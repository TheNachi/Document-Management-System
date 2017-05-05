import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import validateInput from '../../../server/shared/validations/createdocument';
import DocumentForm from './DocumentForm';
import * as documentActions from '../../actions/documentActions';


class ManageDocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: Object.assign({}, props.document),
      errors: {},
      saving: false,
    };

    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
  }

  componentDidMount() {
    $('select').material_select();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.document.id !== nextProps.document.id) {
      // Necessary to populate form when existing document is loaded directly.
      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }
  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }

  saveDocument(event) {
    event.preventDefault();
    this.setState({ saving: true });
    if (this.state.document.id) {
      this.props.actions.updateDocument(this.state.document)
        .then(() => {
          this.redirect();
        })
        .catch((error) => {
          toastr.error(error);
          this.setState({ saving: false });
        });
    } else {
      this.props.actions.saveDocument(this.state.document)
      .then(() => {
        this.redirect();
      })
      .catch((error) => {
        toastr.error(error);
        this.setState({ saving: false });
      });
    }
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Document saved');
    this.context.router.push('/app/');
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <DocumentForm
          onChange={this.updateDocumentState}
          onSave={this.saveDocument}
          document={this.state.document}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ManageDocumentPage.propTypes = {
  document: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

 // Pull in the React Router context so router is available on this.context.router.
ManageDocumentPage.contextTypes = {
  router: React.PropTypes.object,
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentPage);
