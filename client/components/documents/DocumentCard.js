import React from 'react';
import { Link } from 'react-router';

export default function DocumentCard({ document, deleteDocument }) {
  return (
    <div className="col m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{document.title}</span>
          <p>{document.content}</p><br />
          <p>Access Type: &nbsp; <span>{(document.access).toUpperCase()}</span></p><br />
        </div>
        <div className="card-action">
          <Link to={`/app/document/${document.id}`}>Edit</Link>
          <a href="" onClick={() => deleteDocument(document.id)}>Delete</a>
        </div>
      </div>
    </div>
  );
}

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
};
