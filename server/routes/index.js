const locationController = require('../controllers/location.controller');

module.exports = (app) => {
  app.post('/api/location', locationController.create);
  app.get('/api/location/:locationId', locationController.fetchOneLocation);
  app.get('/api/locations', locationController.fetchAllLocations)
  app.put('/api/location/:locationId', locationController.updateLocation)
  app.delete('/api/location/:locationId', locationController.deleteLocation)
}