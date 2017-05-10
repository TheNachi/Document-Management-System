import React from 'react';
import { connect } from 'react-redux';
import validateInput from '../../../server/shared/validations/signupValidation';
import SignupForm from './SignupForm.components.jsx';
import userSignupRequest from '../../actions/signupActions';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    console.log(validateInput(this.state));
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.context.router.push('/app/');
        },
        // ({ data }) => {
        //   console.log(data, 'I Data');
        //   const errors = {};
        //   errors.form = data.response.data.message;
        //   this.setState({ errors });
        // }
        err => this.setState({ errors: err.response.data.errors })
      );
    }
  }

  render() {
    const { errors } = this.state;
    console.log('err', this.state.errors)
    return (
      <SignupForm
        onChange={this.onChange}
        userProps={this.state}
        onSubmit={this.onSubmit}
        errors={errors}
      />
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
};

SignupPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(null, { userSignupRequest })(SignupPage);
