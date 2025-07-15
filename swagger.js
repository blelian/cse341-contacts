const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts',
  },
  host: process.env.NODE_ENV === 'production'
    ? 'cse341-contacts-3-j7ui.onrender.com'
    : 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
  tags: [
    {
      name: 'Contacts',
      description: 'API endpoints for managing contacts',
    },
  ],
  definitions: {
    Contact: {
      firstName: 'Emily',
      lastName: 'Clark',
      email: 'emilyclark@gmail.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contact.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
