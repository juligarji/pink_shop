
var loadCartView = function(req,res,next){
  if(!res.locals.authorized){
    res.status(200).render('home/cartView');
    return;
  }
    res.status(200).render('home/cartView');
}

module.exports = {
  loadCartView
}
