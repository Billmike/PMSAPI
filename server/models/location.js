module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Location.associate = (models) => {
    Location.hasMany(models.LocationDetails, {
      as: 'locationDetails',
      foreignKey: 'locationId'
    });

    Location.hasMany(models.LocationDetails, {
      as: 'parent',
      foreignKey: 'parentLocation'
    })
  }

  return Location;
};