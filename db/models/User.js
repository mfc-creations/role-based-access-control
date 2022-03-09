'use strict';
const {
  Model
} = require('sequelize');
const USER_TYPE = require('../../userRoles');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Project, { as: 'projects' });
      models.Project.belongsTo(models.User);
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {type:DataTypes.STRING,defaultValue:USER_TYPE.USER}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};