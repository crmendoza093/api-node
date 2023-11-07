const express = require('express');
const routerApi = require('./routes/');
const { logErrors, errorHandler } = require('./middlewares/error.handler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');

const app = express();
const port = 3000;

routerApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => { console.log(port) });
