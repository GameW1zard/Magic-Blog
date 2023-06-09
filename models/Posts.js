const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_content:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Posts',
    }
)

module.exports = Posts;