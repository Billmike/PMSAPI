const { Location } = require('../models');
const { LocationDetails } = require('../models');

exports.create = (request, response) => {
  if (request.body.parentLocationId) {
    return Location.findById(Number(request.body.parentLocationId))
    .then(foundLocation => {
      if (!foundLocation) {
        return response.status(404).json({
          message: 'Parent location does not exist',
          status: '404 Not Found'
        })
      }

      return LocationDetails.create({
        locationId: foundLocation.dataValues.id,
        parentLocation: request.body.parentLocationId,
        femalePopulation: Number(request.body.femalePopulation),
        malePopulation: Number(request.body.malePopulation),
        sumPopulation: Number(request.body.malePopulation) + Number(request.body.femalePopulation)
      }).then(locationDetail => {
        return response.status(201).json({
          status: 'Created data successfully',
          locationData: locationDetail
        })
      })
    }).catch(error => {
      return response.status(500).json({
        message: 'An error occurred'
      })
    })
  } else {
    return Location.create({
      name: request.body.locationName
    }).then(location => {
      return LocationDetails.create({
        locationId: location.dataValues.id,
        parentLocation: request.body.parentLocationId,
        femalePopulation: Number(request.body.femalePopulation),
        malePopulation: Number(request.body.malePopulation),
        sumPopulation: Number(request.body.malePopulation) + Number(request.body.femalePopulation)
      }).then(createdLocation => {
        return response.status(201).json({
          status: 'Created Location',
          locationDetail: createdLocation
        })
      })
    }).catch(error => {
      return response.status(500).json({
        message: 'An error occurred'
      })
    })
  }
}

exports.fetchOneLocation = (request, response) => {
  return Location.findById(request.params.locationId)
    .then(location => {
      if (!location) {
        return response.status(404).json({
          status: 'Not found'
        })
      }

      return LocationDetails.find({
        where: {
          locationId: location.dataValues.id
        },
        include: [
          { model: Location, as: 'parent' }
        ]
      }).then(locationDetail => {
        if (!locationDetail) {
          return response.status(404).json({
            status: 'Not Found',
            message: 'No location detail for this particular location'
          })
        }

        return response.status(200).json({
          status: 'Success',
          locationData: locationDetail
        })
      })
    }).catch(error => {
      return response.status(500).json({
        message: 'An error occurred'
      })
    })
}
