import React from 'react';
import { Row, Input, Button } from 'react-materialize';

const SignupForm = ({ onChange, userProps, onSubmit, errors }) => {
  return (
    <div className="backgrd">
      <form onSubmit={onSubmit}>
      <h4>Sign Up</h4>
      <Row>
        {/* // {errors.form && <div style={{ color: '#F44336' }}>{errors.form}</div>}*/}
        <Input
          placeholder = "UserName"
          s={12}
          validate
          placeholder="UserName"
          error={errors.username}
          onChange={onChange}
          value={userProps.username}
          name="username"
        />
         <p style={{ color: '#F44336' }}>{errors.username}</p>
        <Input
          placeholder="First Name"
          s={6}
          validate
          placeholder="First Name"
          error={errors.firstName}
          onChange={onChange}
          value={userProps.firstName}
          name="firstName"
        />
        <p style={{ color: '#F44336' }}>{errors.firstName}</p>
        <Input
          placeholder="Last Name"
          s={6}
          validate
          placeholder="Last Name"
          error={errors.lastName}
          onChange={onChange}
          value={userProps.lastName}
          name="lastName"
        />
        <p style={{ color: '#F44336' }}>{errors.lastName}</p>
        <Input
          placeholder="Email"
          s={12}
          validate
          placeholder="Email"
          error={errors.email}
          onChange={onChange}
          value={userProps.email}
          type="email"
          name="email"
        />
        <p style={{ color: '#F44336' }}>{errors.email}</p>
        <Input
          placeholder="Password"
          s={6}
          validate
          placeholder="Password"
          error={errors.password}
          onChange={onChange}
          value={userProps.password}
          type="password"
          name="password"
        />
        <p style={{ color: '#F44336' }}>{errors.password}</p>
        <Input
          placeholder="Password Confirmation"
          s={6}
          validate
          placeholder="Password Confirmation"
          error={errors.passwordConfirmation}
          onChange={onChange}
          value={userProps.passwordConfirmation}
          type="password"
          name="passwordConfirmation"
        />
        <p style={{ color: '#F44336' }}>{errors.passwordConfirmation}</p>
        <Input
          value="signup"
          className="btn waves-effect waves-light"
          name="action"
          type="submit"
        />
      </Row>
    </form>
    </div>
  );
};

SignupForm.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  userProps: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object.isRequired,
};

export default SignupForm;
