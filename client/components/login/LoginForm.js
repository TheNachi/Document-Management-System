import React from 'react';
import { Row, Input, Button } from 'react-materialize';

const LoginForm = ({ errors, onChange, loginProps, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>
      <Row>
        {errors.form && <div style={{ color: '#F44336' }}>{errors.form}</div>}
        <Input
            label="Username or Email"
            s={12}
            placeholder="Username or Email"
            onChange={onChange}
            value={loginProps.identifier}
            name="identifier"
            id="identifier"
            />
        <Input
            label="Password"
            s={12}
            placeholder="Password"
            onChange={onChange}
            value={loginProps.password}
            type="password"
            name="password"
            id="password"
            />
        <Input
            id="loginButton" value="Login"
            className="btn waves-effect waves-light" name="action" type="submit" />
      </Row>
    </form>
  );
};

LoginForm.propTypes = {
  errors: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loginProps: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default LoginForm;
