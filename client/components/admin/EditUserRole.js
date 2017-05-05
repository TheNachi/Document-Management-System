import React from 'react';
import { Input } from 'react-materialize';

const EditUserRole = ({ value, onChange }) => {
  return (
    <Input
      s={12}
      validate
      type="select"
      onChange={onChange}
      value={value}
      name="RoleId"
    >
      <option value="1">Admin</option>
      <option value="2">Regular</option>
    </Input>
  );
};

EditUserRole.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default EditUserRole;
