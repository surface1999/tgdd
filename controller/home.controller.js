const db = require('../db');


module.exports.home =  (req, res)=>{
    let products = db.get('products').value();
    const urls = [
      {
        name: 'Home',
        link: '/'
      }
    ]
    let totalCart = db.get('session').find({id: res.locals.sessionId}).get('total').value();

    res.render('index', {   urls: urls,
                            isActive: 'home',
                            products: products,
                            totalCart: totalCart
                          });
  } 