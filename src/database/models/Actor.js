module.exports = (sequelize, DataTypes) => {

    let alias = "Actors";

    let cols = {
        id: {
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL(3,1),
            allowNull: false            
        },
        favorite_movie_id: {
            type: DataTypes.BIGINT(10).UNSIGNED
        }
    };

    let config = {
        tablename: "actors",
        timestamps: false
    }

    const Actor = sequelize.define(alias, cols, config);

    Actor.associate = (models) => {

        Actor.belongsToMany(models.Movies, {
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })

    }

    return Actor;
}