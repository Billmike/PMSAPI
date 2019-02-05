const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('*', (request, response) => response.json({
  message: 'Welcome to the population API'
}));

module.exports = app;
