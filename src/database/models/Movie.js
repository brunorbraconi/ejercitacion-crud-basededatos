module.exports = (sequelize, DataTypes) => {

    let alias = 'Movies';

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: true
        },
        awards: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        length: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        genre_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }        
       
    };

    let config = {
        tableName: 'movies',        
        timestamps: false
    };

    const Movie = sequelize.define(alias, cols, config)

    Movie.associate = (models) => {

        Movie.belongsTo(models.Genres, {
            as: "genre",
            foreignKey: "genre_id"
        });

        Movie.belongsToMany(models.Actors, {
            as:"actors",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        })

    }

    return Movie
}