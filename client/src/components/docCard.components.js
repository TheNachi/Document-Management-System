import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

/**
 * React component for
 * @class DocCard
 */
class DocCard extends React.Component {

  /**
   * @return {object} jf
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
              browserHistory.push(`/app/document/${this.props.id}`);
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
                      type: 'document'
                    })
                }
              >
              </span>
              <span
                className="fa fa-pencil card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="Edit document"
                onClick={
                  () =>
                    this.props.onEdit({
                      id: this.props.id,
                      title: this.props.title,
                      content: this.props.content,
                      accessId: this.props.accessId
                    })
                }
              >
              </span>
              <span
                className="fa fa-eye card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="View document"
                onClick={ () => {
                  browserHistory.push(`/app/document/${this.props.id}`);
                } }
              >
              </span>
              <span
                className="fa fa-download card-actions tooltipped"
                data-position="bottom"
                data-delay="20"
                data-tooltip="Download document"
                onClick={ this.props.onDownload }
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

DocCard.defaultProps = {
  title: 'Lorem Ipsum Dolor',
  icon: '/images/file.png',
  onDownload() {
    return null;
  },
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

DocCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};

export default DocCard;
