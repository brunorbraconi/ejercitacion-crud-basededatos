const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const genresController = {
    
    list: (req, res) => {
        db.Genres.findAll()
            .then(genres => {
                res.render("genresList", { genres })
            })
            .catch(err => {
                res.send(err)
            })
    },

    detail: (req, res) => {
        let id = req.params.id;

        db.Genres.findByPk(id, {
            include: [{association: "movies"}]
        })
            .then(genre => {
                res.render("genresDetail", { genre });
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = genresController;