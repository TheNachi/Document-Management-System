import React from 'react';
import { connect } from 'react-redux';
import validateInput from '../../../server/shared/validations/loginValidation';
import { login } from '../../actions/authActions';
import LoginForm from './LoginForm.components.jsx';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.login(this.state).then(
        () => {
          this.context.router.push('/app/');
        },
        (data) => {
          const errors = {};
          errors.form = data.response.data.message;
          this.setState({ errors });
        }
      );
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <LoginForm
          errors={errors}
          onChange={this.onChange}
          loginProps={this.state}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: React.PropTypes.func.isRequired,
};

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginPage);
