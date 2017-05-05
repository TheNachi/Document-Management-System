import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentsList from './DocumentList';
import { fetchDocuments, deleteDocument } from '../../actions/documentActions';
import { searchDocuments } from '../../actions/searchActions';
import Search from '../common/Search';

class DocumentsPage extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchDocuments();
  }

  handleSearch(e) {
    e.preventDefault();
    const query = e.target.value;
    this.props.searchDocuments(query);
  }

  render() {
    const documentSearchResult = this.props.search;
    const renderedDocuments = documentSearchResult.length > 0
      ? documentSearchResult : this.props.documents;
    return (
      <div>
        <h1>Documents List</h1>
        <div className="row">
          <div className="col s7 push-s4">
            <Search onChange={this.handleSearch} />
          </div>
          <div className="col s5 pull-s7" id="createdocument">
            <Link className="btn create-list-link hero-btn" to="/app/document">
              Add Document
            </Link>
          </div>
        </div>

        <DocumentsList
          documents={renderedDocuments}
          deleteDocument={this.props.deleteDocument}
        />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  documents: React.PropTypes.array.isRequired,
  search: React.PropTypes.array.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  searchDocuments: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
    search: state.search,
  };
}

export default connect(mapStateToProps,
{ fetchDocuments, deleteDocument, searchDocuments })(DocumentsPage);
