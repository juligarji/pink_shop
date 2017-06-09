var express = require('express');
var router = express.Router();

var homePageRouter = function(req,res,next){// Pagina principal
    res.render('home/index');
}

/* Puntos de acceso */
router.get('/',homePageRouter);
module.exports = router;
