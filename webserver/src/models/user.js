module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
	});
	
  return User;
};