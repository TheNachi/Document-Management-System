import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

/**
 * React component for
 * @class Navbar
 */
class FolderCard extends React.Component {

  /**
   * @return {ReactElement} jf
   */
  render() {
    return (
      <div className="doc-card-root">
        <div className="doc-icon-action-wrapper">
          <div className="doc-card-icon">
            <img src={ this.props.icon } />
          </div>
          <div className="doc-card-action-container">
            <div onClick={ () => {
              browserHistory.push(`/app/folder/${this.props.id}`);
            } } className="doc-card-action-helper">

            </div>
            <div className="doc-card-actions">
              <span
                className="fa fa-trash card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="Delete document"
                onClick={
                  () =>
                    this.props.onDelete({
                      id: this.props.id,
                      title: this.props.title,
                      type: 'folder'
                    })
                  }
              >
              </span>
              <span
                className="fa fa-pencil card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="Edit document"
                onClick={ () =>
                  this.props.onEdit({
                    id: this.props.id,
                    title: this.props.title
                  }) }
              >
              </span>
              <span
                className="fa fa-eye card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="View document"
                onClick={ () => {
                  browserHistory.push(`/app/folder/${this.props.id}`);
                } }
              >
              </span>
            </div>
          </div>
        </div>
        <div className="truncate doc-card-info chip tooltipped"
          data-position="bottom"
          data-delay="20"
          data-tooltip={ this.props.title }
          >
          <span>{ this.props.title }</span>
        </div>
      </div>
    );
  }
}

FolderCard.defaultProps = {
  title: 'Lorem Ipsum Dolor',
  icon: '/images/folder.png',
  id: null,
  onEdit() {
    return null;
  },
  onDelete() {
    return null;
  },
  onView() {
    return null;
  }
};

FolderCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};

export default FolderCard;
