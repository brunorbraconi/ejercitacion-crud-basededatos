module.exports = (sequelize, DataTypes) => {

    let alias = 'Genres';

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ranking: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    };

    let config = {
        tableName: 'genres',        
        timestamps: false
    };

    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.hasMany(models.Movies, {
            as: "movies",
            foreignKey:"genre_id"
        })        
    }

    return Genre;
}