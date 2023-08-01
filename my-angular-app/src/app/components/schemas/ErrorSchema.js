import Ajv from 'ajv';
import { ErrorSchema } from './ErrorSchema';

const ajv = new Ajv();
ajv.addSchema(ErrorSchema, 'errorSchema');
let cachedValidate = (() => {
  const validate = ajv.getSchema('errorSchema');

  return (...params) => validate(...params);
})();

// Example error response object
const errorResponse = {
  error: 'Not Found',
  message: 'The requested resource was not found',
  status: 404,
};

const isValid = cachedValidate(errorResponse);

if (isValid) {
  console.log('Error response is valid');
} else {
  console.log('Error response is invalid');
  console.log(cachedValidate.errors);
}

