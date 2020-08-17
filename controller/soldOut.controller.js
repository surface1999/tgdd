const db = require('../db');


module.exports.soldOut = (req, res)=>{
    let products = db.get('products').value();
    const urls = [
      {
        name: 'Home',
        link: '/'
      },
      {
        name: 'Sold out',
        link: '/sold-out'
      },
    ]

    let totalCart = db.get('session').find({id: res.locals.sessionId}).get('total').value();
    res.render('sold-out', {    urls: urls,
                                isActive: 'soldout',
                                products: products,
                                totalCart: totalCart 
                              });
    }