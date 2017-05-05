import React from 'react';
import { Pagination } from 'react-materialize';
import DocumentCard from './DocumentCard';

export default function
DocumentsList({ documents, deleteDocument, currentUser }) {
  const emptyMessage = (
    <p>No documents Found</p>
  );
  const documentsList = (
    <div>
      {documents.map(document => <DocumentCard
      document={document} key={document.id}
      deleteDocument={deleteDocument}
      currentUser={currentUser} />)}
    </div>
  );

  return (
    <div className="row">
      {documents.length === 0 ? emptyMessage : documentsList}
    </div>
  );
}

DocumentsList.propTypes = {
  documents: React.PropTypes.array,
  deleteDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired,
};
