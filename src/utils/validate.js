export const validateForm = (schema, validationMessages, formInputs, formErrors = {}) => {

  const { error } = schema.validate(formInputs, { abortEarly: false });

  if (error) {
    error.details.forEach((detail) => {
      formErrors[detail.path[0]] = validationMessages[detail.path[0]];
    });

    return formErrors

  } else {
    // Submit form data to server
    console.log('no errors');
  }
};