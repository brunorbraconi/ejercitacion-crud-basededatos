const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const moviesController = {
    
    list: (req, res) => {
        db.Movies.findAll()
            .then(movies => {
                res.render("moviesList", { movies })
            })
            .catch(err => {
                res.send(err)
            })
    },

    new: (req, res) => {
        db.Movies.findAll({
            order: [
                [ "release_date", "DESC"]
            ],
            limit: 5
        })
            .then(movies => {
                res.render("newestMovies", { movies });
            })
            .catch(err => {
                res.send(err)
            })
    },

    recommended: (req, res) => {
        db.Movies.findAll({
            where: {
                rating: {[Op.gte] : 8}
            },
            order: [
                ["rating", "DESC"]
            ]            
        })
            .then(movies => {
                res.render("recommendedMovies", { movies })
            })
            .catch(err => {
                res.send(err)
            })
    },

    detail: (req, res) => {
        let id = req.params.id;

        db.Movies
            .findByPk(id, {
                include: [{association: "genre"},{association: "actors"}]
            })
            .then(movie => {
                res.render("moviesDetail", { movie });
            })
            .catch(err => {
                res.send(err)
            })
    },

    add: (req, res) => {
        db.Genres
            .findAll()
            .then(genres => {
                res.render("moviesAdd", { genres })
            })
            .catch(err => {
                res.send(err)
            })
    },

    create: (req, res) => {
        db.Movies.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
            .then(producto => {
                res.redirect("/movies")
            })
            .catch(err => {
                res.send(err)
            })
        
    },

    edit: (req, res) => {
        let id = req.params.id;

        let promesaPeliculaBuscada = db.Movies.findByPk(id, {
                                        include: [{association: "genre"}]
                                    })
        
        let promesaGeneros = db.Genres.findAll()

        Promise.all([promesaPeliculaBuscada, promesaGeneros])
            .then(([movie, genres]) => {                
                res.render("moviesEdit", {
                    movie,
                    genres
                })
            })
            .catch(err => {
                res.send(err)
            })       
    },

    update: (req, res) => {

        db.Movies
            .update(
                {  
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(resultado => {
                res.redirect("/movies")
            })
            .catch(err => {
                res.send(err)
            })
        
    
    },

    delete: (req, res) => {
        let id = req.params.id;

        db.Movies.findByPk(id)
            .then(movie => {                
                res.render("moviesDelete", {
                    movie
                })
            })
            .catch(err => {
                res.send(err)
            })    
    },

    destroy: (req, res) => {
        db.Movies.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(resultado => {
                res.redirect("/movies")
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = moviesController;

