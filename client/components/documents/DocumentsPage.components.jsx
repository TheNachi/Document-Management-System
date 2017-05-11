import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import { Pagination, Button } from 'react-materialize';
import DocumentsList from './DocumentList.components.jsx';
import { fetchDocuments, deleteDocument } from '../../actions/documentActions';
import { searchDocuments } from '../../actions/searchActions';
import Search from '../common/Search.components.jsx';

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
    const renderedDocuments = this.state.query
      ? documentSearchResult : this.props.documents;
    const { totalCount, pageSize, currentPage, pageCount } = this.props.metadata;
    return (
      <div>
        <h1>Documents</h1>
        <div className="row">
          <div className="col s7 push-s4 backgrd">
            <Search onChange={this.handleSearch} />
          </div>

          <div className="col s5 pull-s7" id="createdocument">
            
            <Link className=" create-list-link" to="/app/document">
              <Button floating large className='blue-grey darken-1' waves='light' icon='add' />
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
