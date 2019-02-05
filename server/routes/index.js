const locationController = require('../controllers/location.controller');

module.exports = (app) => {
  app.post('/api/location', locationController.create);
  app.get('/api/location/:locationId', locationController.fetchOneLocation);
}