import React from 'react';
import { Row, Input, Button } from 'react-materialize';

const SignupForm = ({ onChange, userProps, onSubmit, errors }) => {
  return (
    <form onSubmit={onSubmit}>
      <h4>Register</h4>
      <Row>
        <Input
          s={6}
          validate
          placeholder="UserName"
          error={errors.username}
          onChange={onChange}
          value={userProps.username}
          name="username"
        />
        <Input
          s={6}
          validate
          placeholder="First Name"
          error={errors.firstName}
          onChange={onChange}
          value={userProps.firstName}
          name="firstName"
        />
        <Input
          s={6}
          validate
          placeholder="Last Name"
          error={errors.lastName}
          onChange={onChange}
          value={userProps.lastName}
          name="lastName"
        />
        <Input
          s={6}
          validate
          placeholder="Email"
          error={errors.email}
          onChange={onChange}
          value={userProps.email}
          type="email"
          name="email"
        />
        <Input
          s={6}
          validate
          placeholder="Password"
          error={errors.password}
          onChange={onChange}
          value={userProps.password}
          type="password"
          name="password"
        />
        <Input
          s={6}
          validate
          placeholder="Password Confirmation"
          error={errors.passwordConfirmation}
          onChange={onChange}
          value={userProps.passwordConfirmation}
          type="password"
          name="passwordConfirmation"
        />
        <Input
          value="signup"
          className="btn waves-effect waves-light"
          name="action"
          type="submit"
        />
      </Row>
    </form>
  );
};

SignupForm.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  userProps: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
};

export default SignupForm;
