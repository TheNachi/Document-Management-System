import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      show: 'all'
    };
  }

  renderUserSearch(users) {
    return users.success.users.map(user => (
      <div className="col s6 m4 l2">
        <img src="/images/person.png" className="icon-image" />
        <h6 className=" truncate doc-card-info chip tooltipped">
          { user.username }
        </h6>
      </div>
    ));
  }

  handleChange(event, index, value) {
    this.setState({ show: value });
  }

  renderDocSearch(docs) {
    return docs.success.documents.map(doc => (
      <div className="col s6 m4 l2">
        <img src="/images/file.png" className="icon-image" />
        <h6 className=" truncate doc-card-info chip tooltipped">
          { doc.title }
        </h6>
      </div>
    ));
  }

  render() {
    return (
      <div className="content-display">
        <div className="input-field col l6 m6 s6">
          <SelectField
            floatingLabelText="Select Access Level"
            value={this.state.show}
            onChange={ this.handleChange }
          >
            <MenuItem value="all" primaryText="ALL" />
            <MenuItem value="users" primaryText="USERS" />
            <MenuItem value="documents" primaryText="DOCUMENTS" />
          </SelectField>
        </div>
        <hr />
        <div className="row">
        {
          (this.props.data.users
          && (this.state.show === 'all' || this.state.show === 'users')) ?
            this.renderUserSearch(this.props.data.users)
            : ''
        }
        {
          (this.props.data.docs
          && (this.state.show === 'all' || this.state.show === 'documents')) ?
            this.renderDocSearch(this.props.data.docs)
            : ''
        }
        </div>
      </div>
    );
  }
}

export default Search;
