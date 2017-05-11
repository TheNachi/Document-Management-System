import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-materialize';
import swal from 'sweetalert';

const confirmDeletion = (callback, documentId) => {
  swal({
    title: 'Are you sure?',
    text: 'Would you like to delete this document?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: true,
    closeOnCancel: true
  },
  (deletionConfirmed) => {
    if (deletionConfirmed) {
      callback(documentId);
      swal('Deleted!', 'Your document has been deleted.', 'success');
    } else {
      swal('Cancelled!', 'Your document  was not deleted.', 'error');
    }
  });
};

export default function DocumentCard({ document, deleteDocument, currentUser }) {
  return (
    <div className="col m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{document.title}</span>
          <p dangerouslySetInnerHTML={{ __html: document.content }} className="document-content" /><br />
          <p className="access-type">Access Type: &nbsp; <span>{(document.access).toUpperCase()}</span></p><br />
          <div>
              Published Date :
            <p>{(document.createdAt) ? document.createdAt.split('T')[0] : ''}</p>
            <p> Author:
                { document.owner.firstName } { document.owner.lastName }</p>
          </div>
        </div>
        <div className="card-action">
          <Link to={`/app/document-details/${document.id}`}>
              View
          </Link>
          {currentUser.userId === document.ownerId &&
            <div className="right">
              <Link className="edit" to={`/app/document/${document.id}`}>Edit</Link>
              <Link to="/app/" onClick={() => confirmDeletion(deleteDocument, document.id)}>
                Delete
              </Link>
            </div>}
        </div>
      </div>
    </div>
  );
}

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired,
};
