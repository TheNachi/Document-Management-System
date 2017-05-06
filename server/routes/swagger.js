
import swaggerJSDoc from 'swagger-jsdoc';

  // swagger definition
const swaggerDefinition = {
  info: {
    title: 'Document Management System API',
    version: '1.0.0',
    description: 'API documentation for to create, manage and edit documents',
  }
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/config/routes/document.js', './server/config/routes/users.js', './server/config/routes/role.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
