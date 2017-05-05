import React from 'react';
import { Row, Input, Button } from 'react-materialize';

const SignupForm = ({ onChange, userProps, onSubmit, errors }) => {
  return (
    <form onSubmit={onSubmit}>
      <h4>Register</h4>
      <Row>
        {errors.form && <div style={{ color: '#F44336' }}>{errors.form}</div>}
        <Input
        label="UserName"
          s={12}
          validate
          placeholder="UserName"
          error={errors.username}
          onChange={onChange}
          value={userProps.username}
          name="username"
        />
        <Input
          label="First Name"
          s={6}
          validate
          placeholder="First Name"
          error={errors.firstName}
          onChange={onChange}
          value={userProps.firstName}
          name="firstName"
        />
        <Input
          label="Last Name"
          s={6}
          validate
          placeholder="Last Name"
          error={errors.lastName}
          onChange={onChange}
          value={userProps.lastName}
          name="lastName"
        />
        <Input
          label="Email"
          s={12}
          validate
          placeholder="Email"
          error={errors.email}
          onChange={onChange}
          value={userProps.email}
          type="email"
          name="email"
        />
        <Input
          label="Password"
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
          label="Password Confirmation"
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
