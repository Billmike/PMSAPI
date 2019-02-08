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

exports.fetchAllLocations = (request, response) => {
  return Location.all({
    include: [
      { model: LocationDetails, as: 'locationDetails', nested: 'true' }
    ]
  }).then(locations => {
    return response.status(200).json({
      message: 'Retrieved all locations',
      locations
    })
  }).catch(error => {
    return response.status(500).json({
      message: 'An error occurred'
    })
  })
}

exports.updateLocation = (request, response) => {
  if (isNaN(Number(request.params.locationId))) {
    return response.status(400).json({
      message: 'Invalid locationID'
    })
  }

  if (request.body.parentLocationId) {
    return Location.findById(Number(request.body.parentLocationId)).then(foundLocation => {
      if (!foundLocation) {
        return response.status(404).json({
          message: 'No parent location with that ID found'
        })
      }

      return LocationDetails.find({
        where: {
          locationId: request.params.locationId
        },
        include: [
          { model: Location, as: 'locationDetails' }
        ]
      }).then(locationDetail => {
        if (!locationDetail) {
          return response.status(404).json({
            message: 'No location detail found'
          })
        }
        const location = locationDetail.dataValues.locationDetails
        console.log(location.dataValues.name);
        const name = request.body.name || location.dataValues.name
        const femalePopulation = request.body.femalePopulation || locationDetail.femalePopulation
        const malePopulation = request.body.malePopulation || locationDetail.malePopulation
        const sumPopulation = Number(femalePopulation) + Number(malePopulation)
        const parentLocationId = request.body.parentLocationId || locationDetail.parentLocation

        location.set('name', name)
        location.save()

        locationDetail.set('femalePopulation', femalePopulation)
        locationDetail.set('malePopulation', malePopulation)
        locationDetail.set('sumPopulation', sumPopulation)
        locationDetail.set('parentLocation', parentLocationId)
        locationDetail.save()

        return response.status(200).json({
          status: 'Success',
          message: 'Location status updated successfully',
          locationDetail
        })
      })
    }).catch(error => {
      return response.status(500).json({
        message: 'An error occurred'
      })
    })
  }
}

exports.deleteLocation = (request, response) => {
  if (isNaN(Number(request.params.locationId))) {
    return response.status(400).json({
      message: 'LocationID invalid'
    })
  }

  return Location.findById(Number(request.params.locationId)).then(locationDetail => {
    if (!locationDetail) {
      return response.status(404).json({
        status: '404 Error',
        message: 'No location with that ID found'
      })
    }

    return locationDetail.destroy().then(() => {
      return response.status(200).json({
        status: 'Success',
        message: 'Location deleted successfully'
      })
    })
  }).catch(error => {
    return response.status(500).json({
      status: '500 error',
      message: 'An error occurred'
    })
  })
}
