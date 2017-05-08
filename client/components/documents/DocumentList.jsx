import React from 'react';
import { Pagination } from 'react-materialize';
import DocumentCard from './DocumentCard';

export default function 
DocumentsList({ documents, deleteDocument, currentUser }) {
  const emptyMessage = (
    <p>No documents Found</p>
  );

  const documentsList = (
    <div className="row">
      {documents.map(document => <DocumentCard
      document={document} key={document.id}
      deleteDocument={deleteDocument}
      currentUser={currentUser} />)}
    </div>
  );

  return (
    <div>
      {documents.length === 0 ? emptyMessage : documentsList}
    </div>
  );
}

DocumentsList.propTypes = {
  documents: React.PropTypes.array.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired
};
