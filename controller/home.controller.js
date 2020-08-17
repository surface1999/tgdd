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
    const width = 4;
    const countPages = products.length / width + (products.length % width !== 0? 1: 0);
    let start = 1;
    let p = 1;
    if(req.query.p){
      p = req.query.p;
      start = (p-1) * width;
    }
    let end = (start + width -1) >  products.length? products.length:  (start + width -1) ;
    products = products.slice(start, end+1);
    res.render('index', {   urls: urls,
                            isActive: 'home',
                            products: products,
                            totalCart: totalCart, 
                            countPages: countPages,
                            active: parseInt(p)
                          });
  } 