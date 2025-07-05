const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Registration API',
            version: '2.0.0',
            description: 'API documentation for registration endpoint',
        },
        servers: [
            {
                url: `http://localhost:${process.env.SERVE_PORT || 6969}/api`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
