'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blog = sequelize.define('Blog', {
    authorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    article: DataTypes.TEXT,
    published: DataTypes.DATE,
    featured: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Blog.associate = function(models) {
    // associations can be defined here
    models.Blog.belongsTo(models.Author, {foreignKey: 'authorId'});
  };
  return Blog;
};