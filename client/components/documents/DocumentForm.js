import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import TinyMCE from 'react-tinymce';

const DocumentForm = ({ document, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h5>Create/Update a Document</h5>
      <Row>
        <Input
          label="Title"
          placeholder="Title"
          s={12}
          validate
          name="title"
          onChange={onChange}
          value={document.title}
          error={errors.title}
          id="title"
        />
        <div className="input-field col s12">
          <TinyMCE
            id="content"
            content={document.content}
            config={{
              plugins: 'autolink link image lists print preview',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
            }}
            onChange={onChange}
          />
        </div>
        <div className="input-field col s6">
          <select
            style={{ display: 'block' }}
            id="access"
            value={document.access}
            onChange={onChange}
            name="access"
          >
            <option value="public" defaultValue>Public</option>
            <option value="private" >Private</option>
            <option value="role" >Role</option>
          </select>
        </div>

        <Input
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn waves-effect waves-light blue"
          onClick={onSave}
        />
      </Row>
    </form>
  );
};

DocumentForm.propTypes = {
  document: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool.isRequired,
  errors: React.PropTypes.object.isRequired,
};

export default DocumentForm;
