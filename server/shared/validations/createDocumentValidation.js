import isEmpty from 'lodash/isEmpty';

/**
 *
 *
 * @export
 * @param {any} values
 * @returns
 */
export default function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }
  if (!values.access) {
    errors.access = 'Select Document access';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
