import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import { Pagination } from 'react-materialize';
import DocumentsList from './DocumentList';
import { fetchDocuments, deleteDocument } from '../../actions/documentActions';
import { searchDocuments } from '../../actions/searchActions';
import Search from '../common/Search';

class DocumentsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      query: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
    this.displayDocuments = this.displayDocuments.bind(this);
  }

  componentDidMount() {
    this.props.fetchDocuments();
  }

  deleteDoc(id) {
  this.props.deleteDocument(id)
      .then(res => toastr.success('Document deleted successfully!'));
}

  handleSearch(e) {
    e.preventDefault();
    const query = e.target.value;
    this.setState({ query });
    this.props.searchDocuments(query);
  }

  displayDocuments(pageNumber) {
    const offset = (pageNumber - 1) * this.props.metadata.pageSize;
    this.props.fetchDocuments(offset);
  }


  render() {
    const documentSearchResult = this.props.search;
    const renderedDocuments = documentSearchResult.length > 0
      ? documentSearchResult : this.props.documents;
    const { totalCount, pageSize, currentPage, pageCount } = this.props.metadata;
    return (
      <div>
        <h1>Document</h1>
        <div className="row">
          <div className="col s7 push-s4 backgrd">
            <Search onChange={this.handleSearch} />
          </div>
          <div className="col s5 pull-s7" id="createdocument">
            <Link className="btn create-list-link blue-grey darken-1 hero-btn" to="/app/document">
              Add Document
            </Link>
          </div>
        </div>

        <DocumentsList
          documents={renderedDocuments}
          deleteDocument={this.deleteDoc}
          currentUser={this.props.auth.user}
        />
        <Pagination
          items={pageCount}
          activePage={currentPage}
          maxButtons={Math.ceil(totalCount / pageSize)}
          onSelect={this.displayDocuments}
        />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  search: React.PropTypes.array.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  searchDocuments: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  documents: React.PropTypes.array.isRequired,
  metadata: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    documents: state.documents,
    search: state.search,
    auth: state.auth,
    metadata: state.paginate
  
  };
}

export default connect(mapStateToProps,
{ fetchDocuments, deleteDocument, searchDocuments })(DocumentsPage);
