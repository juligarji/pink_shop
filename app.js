var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Importar conneccion a base de datos
var db = require('./models/db/connection');
/*Hello world*/

// Puntos de acceso remotos a la aplicacio
// desde aqui se indexa todo en contenido de la plataforma

// Agregamos nuestros puntos de conexion
//var home = require('./controllers/home/home.js');
/* Nuevas rutas XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
var test = require('./controllers/test/test.js');
var home = require('./newControllers/routes/home.js');
var admin = require('./newControllers/routes/admin.js');
var sign = require('./newControllers/routes/sign.js');
var sales = require('./newControllers/routes/sales.js');

Date.prototype.addDays= function(h){

    this.setDate(this.getDate()+h);

    return this;
}

//var admin = require('./controllers/admin/admin.js');

var app = express();

app.use(express.static(__dirname +'/public'));
//app.use('/public', express.static(__dirname + '/public'));

app.disable('x-powered-by');// desactivar la tecnologia por seguridad

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(express.methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));

// Databas econection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected mongo");
});

// llamada a los Routes
app.use('/', home);
app.use('/test', test);
app.use('/sign', sign);
app.use('/admin', admin);
app.use('/ventas',sales);



// Manejo de errores - Pendiente de implementar
// catch 404 and forward to error handler
/*

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

// error handler
/*
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});*/

module.exports = app;
