import React, { Component } from 'react';
import { Button, Row, Input, Pagination } from 'react-materialize';

class ProfileForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getUser(this.props.user).then((res) => {
      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        username: res.data.username,
        email: res.data.email,
        password: res.data.password
      });
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state, this.props.user)
      .then(
        () => {
          this.context.router.push('/app/');
        }
      );
  }

  render() {
    return (
        <div className="backgrd">
          <form className="col s12" method="post" onSubmit={this.onSubmit}>
            <Row>
              <Input
                label="First Name"
                s={6}
                name="firstName"
                value={this.state.firstName}
                onChange={event => this.onChange(event)}
                required
              />
              <Input
                label="Last Name"
                s={6}
                name="lastName"
                value={this.state.lastName}
                onChange={event => this.onChange(event)}
                required
              />
              <Input
                label="Username"
                s={6}
                name="username"
                value={this.state.username}
                onChange={event => this.onChange(event)}
                required
              />
              <Input
                label="Email"
                s={6}
                name="email"
                value={this.state.email}
                onChange={event => this.onChange(event)}
                required
              />
              <Input
                label="Password"
                s={6}
                name="password"
                type="password"
                value={this.state.password}
                onChange={event => this.onChange(event)}
                required
              />
            </Row>
            <Button className="" waves="light" type="submit">
              UPDATE
            </Button>
          </form>
        </div>
    );
  }
}

ProfileForm.propTypes = {
  user: React.PropTypes.number.isRequired,
  getUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired
};

ProfileForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ProfileForm;
