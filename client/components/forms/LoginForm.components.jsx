import React from 'react';
import { Row, Input, Button } from 'react-materialize';

const LoginForm = ({ errors, onChange, loginProps, onSubmit }) => (
    <div className="backgrd">
      <form onSubmit={onSubmit}>
      <h1>Login</h1>
      <Row>
        <Input
          s={12}
          validate
          placeholder="Username or Email"
          onChange={onChange}
          value={loginProps.identifier}
          name="identifier"
          id="identifier"
          />
          <p style={{ color: '#F44336' }}>{errors.identifier}</p>
        <Input
          s={12}
          validate
          placeholder="Password"
          onChange={onChange}
          value={loginProps.password}
          type="password"
          name="password"
          id="password"
          />
        <p style={{ color: '#F44336' }}>{errors.password}</p>
        <Input
          id="loginButton" value="Login"
          className="btn waves-effect waves-light" name="action" type="submit" />
      </Row>
       {errors.form && <div className="card-panel red darken-1">{errors.form}
        </div>}
    </form>
    </div>
  );

LoginForm.propTypes = {
  errors: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loginProps: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default LoginForm;
