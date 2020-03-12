'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    isbn: DataTypes.STRING,
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    print: DataTypes.STRING,
    publish_time: DataTypes.DATE,
    intro: DataTypes.STRING,
    remark: DataTypes.STRING
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};