const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require("method-override")

const indexRoutes = require('./routes/index');
const moviesRoutes = require('./routes/moviesRoutes');
const actorsRoutes = require('./routes/actorsRoutes');
const genresRoutes = require('./routes/genresRoutes');

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))

app.use('/', indexRoutes);
app.use("/movies", moviesRoutes);
app.use("/actors", actorsRoutes);
app.use("/genres", genresRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
