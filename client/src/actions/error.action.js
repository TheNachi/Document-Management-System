export const validationError = error => ({
  type: 'VALIDATION_ERROR',
  payload: error || { error: 'Oops! an error occured :(' }
});

export const clearError = () => ({
  type: 'CLEAR_ERROR'
});
