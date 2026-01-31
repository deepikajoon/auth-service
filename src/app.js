const express = require('express');
const proxyRoutes = require('./routes/proxy.routes');

const app = express();

app.use(express.json());
app.use('/api', proxyRoutes);

module.exports = app;
