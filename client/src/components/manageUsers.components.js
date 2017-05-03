import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import Navbar from './common/nav.components';
import CustomDrawer from './customDrawer.components';
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
} from '../actions/users.action';
import { getAllDocs } from '../actions/document.action';
import getUserInfo from '../utilities/getUserInfo';
import paginate from '../utilities/paginate';

@connect(store => ({
  users: store.users,
  form: store.form,
  error: store.error.error,
  auth: store.auth,
  docs: store.documents,
  folder: store.folder,
  views: store.views
}))
/**
*
* Compoent to diplay and manage users
* @class ManageUser
*/
class ManageUser extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'users',
    };
  }

  /**
   * componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/app/login');
    } else {
      this.props.dispatch(getUser());
      this.props.dispatch(getAllUsers());
      this.props.dispatch(getAllDocs());
    }
  }

  /**
   * componentWillReceiveProps
   * @param {object} nextProps - next properties the component will recieve
   * before render
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.users.details) {
      if (nextProps.users.details.roleId
        && nextProps.users.details.roleId !== 1) {
        browserHistory.push('/app/dashboard');
      }
    }
  }

  handlePromoteUser(id) {
    this.props.dispatch(updateUser(id, {
      roleId: 1
    }));
  }

  handleDeleteUser(id) {
    this.props.dispatch(deleteUser(id));
  }

  handleChange(value) {
    this.setState({
      value,
    });
  }

  handleDeleteDoc(id) {

  }

  renderTable(users) {
    const self = this;
    return users.success.users.map((user, index) => (
      <TableRow key={`${index}tablerow-user`}>
        <TableRowColumn key={ index + user.id + user.firstname }>
          {user.id}
        </TableRowColumn>
        <TableRowColumn key={ index + user.id + user.firstname }>
          {user.firstname}</TableRowColumn>
        <TableRowColumn key={ index + user.id + user.firstname }>
          {user.lastname}</TableRowColumn>
        <TableRowColumn key={ index + user.id + user.firstname }>
          {user.username}</TableRowColumn>
        <TableRowColumn key={ index + user.id + user.firstname }>{
          (user.roleId === 1) ?
            'Admin' :
            <FlatButton
              label="Promote"
              primary={true}
              onTouchTap={
                () => {
                  self.handlePromoteUser(user.id);
                }
              }
            />
          }
        </TableRowColumn>
        <TableRowColumn key={ index + user.id + user.firstname }>
          {user.email}</TableRowColumn>
        <TableRowColumn key={ index + user.id + user.firstname }>{
          (user.roleId === 1) ?
            '' :
            <FlatButton
              key={ `${index}flat${user.id}`}
              label="Delete"
              secondary={true}
              onTouchTap={
                () => {
                  self.handleDeleteUser(user.id);
                }
              }
            />
          }
        </TableRowColumn>
      </TableRow>
    ));
  }

  renderDocuments(docs) {
    const self = this;
    const accessLevels = {
      1: 'Public',
      2: 'Private',
      3: 'Role'
    };
    return docs.success.documents.map((doc, index) => (
      <TableRow key={`${index}tablerow-doc`}>
        <TableRowColumn key={ index + doc.id + doc.title }>
          {doc.id}</TableRowColumn>
        <TableRowColumn key={ index + doc.id + doc.title }>
          {doc.title}</TableRowColumn>
        <TableRowColumn key={ index + doc.id + doc.title}>
          <FlatButton
            key={ `${index}flat-view${doc.id}`}
            primary={ true }
            onTouchTap={ () =>
              browserHistory.push(`/app/document/${doc.id}`) }
            label="View"
          />
        </TableRowColumn>
        <TableRowColumn key={ index + doc.id + doc.title}>
          { accessLevels[doc.accessId] }</TableRowColumn>
        <TableRowColumn key={ index + doc.id + doc.title}>{ getUserInfo(
          self.props.users.users.success.users, doc.ownerId).username }
        </TableRowColumn>
        <TableRowColumn key={ index + doc.id + doc.title}>{
          (getUserInfo(
            self.props.users.users.success.users, doc.ownerId).roleId === 1
            && doc.ownerId !== self.props.users.details.id
          ) ?
            '' :
            <FlatButton
              key={ `${index}flat${doc.id}`}
              label="Delete"
              secondary={true}
              onTouchTap={
                () => {
                  self.handleDeleteDoc(doc.id);
                }
              }
            />
          }
        </TableRowColumn>
      </TableRow>
    ));
  }

  /**
   * render
   * @return {object} react elements to render
   */
  render() {
    return (
      <div>
        {
          (this.props.users.details
            && this.props.users.users
            && this.props.docs.documents
          ) ?
          <div>
            <Navbar
             type="dark"
             title="iAmDocuman"
             isAuthenticated={ {
               username: this.props.users.details.username,
               userPage: '/app/dashboard'
             } }
             showSignout={ false }
             showSearch={ true }
            />
            <div className="close-drawer">
            </div>
            <CustomDrawer
              title="iAmDocuman"
              showAll={ this.handleShowAll }
              showOnlyDoc={ this.handleShowOnlyDoc }
              userRole={ this.props.users.details.roleId }
              showOnlyFolder={ this.handleShowOnlyFolder }
              username={ this.props.users.details.username }
              fullname={
                `${this.props.users.details.firstname}
                 ${this.props.users.details.lastname}`}
            />
            <div className="content-display users-table">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
              >
                <Tab label="Manage Users" value="users">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>First Name</TableHeaderColumn>
                        <TableHeaderColumn>Last Name</TableHeaderColumn>
                        <TableHeaderColumn>Username</TableHeaderColumn>
                        <TableHeaderColumn>Role</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Delete</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    { this.renderTable(this.props.users.users) }
                    </TableBody>
                  </Table>
                </Tab>
                <Tab label="Manage Documents" value="docs">
                  <h6>Manage Documents</h6>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Content</TableHeaderColumn>
                        <TableHeaderColumn>Access Level</TableHeaderColumn>
                        <TableHeaderColumn>Author</TableHeaderColumn>
                        <TableHeaderColumn>Delete</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      { this.renderDocuments(
                        this.props.docs.documents
                      )}
                    </TableBody>
                  </Table>
                </Tab>
              </Tabs>
            </div>
          </div>
          :
          ''
        }
      </div>
    );
  }
}

export default ManageUser;
