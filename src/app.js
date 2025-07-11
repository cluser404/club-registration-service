const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
// mongoose instance is created by this import
const mongoose = require('./config/db');
const registraionRoutes = require('./routes/registration.routes');

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/registrations', registraionRoutes);

app.get('/', (req, res) => res.send('The service is running, visit <a href="/docs">docs</a> for api documentation'));
app.get('/api', (req, res) => res.send('Visit <a href="/docs">docs</a> for api documentation'));

module.exports = app;