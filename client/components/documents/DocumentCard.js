import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-materialize';

export default function DocumentCard({ document, deleteDocument, currentUser }) {
  return (
    <div className="col m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{document.title}</span>
          <p dangerouslySetInnerHTML={{ __html: document.content }} /><br />
          <p>Access Type: &nbsp; <span>{(document.access).toUpperCase()}</span></p><br />
          <div>
              Published Date :
            <p>{(document.createdAt) ? document.createdAt.split('T')[0] : ''}</p>
            <p> Author:
                {document.owner.firstName} {document.owner.lastName}</p>
          </div>
        </div>
        <div className="card-action">
          {currentUser.userId === document.ownerId &&
            <div className="right">
              <Link to={`/app/document/${document.id}`}>Edit</Link>
              <Link to="/app/" onClick={() => deleteDocument(document.id)}>
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
