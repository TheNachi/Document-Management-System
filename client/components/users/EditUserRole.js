import React from 'react';
import { Input } from 'react-materialize';

const EditUserRole = ({ value, onChange }) => {
  return (
    <div className="input-field col s4">
      <select
       style={{ display: 'block' }}
        value={value}
        onChange={onChange}
        name="roleId"
        id="access"
      >
        <option value="1">admin</option>
        <option value="2">regular</option>
      </select>
    </div>
  );
};

EditUserRole.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default EditUserRole;
