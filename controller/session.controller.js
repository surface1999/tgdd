var db = require('../db');

uncodePrice = (price)=>{
    while(price.indexOf('.') !== -1){
        price = price.replace('.', '');
    }
    return parseInt(price);
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
module.exports.cartController = (req, res) => {
    const productId = (req.params.id).replace(':', '');
    const sessionId = req.signedCookies.sessionId;
    const DB = db.get('session').find({id: sessionId});
    var count = DB.get('cart.' + productId, 0).value();
    var total = DB.get('total', 0).value();
    DB.set('total', total + 1).write();
    DB.set('cart.' + productId, count + 1).write();
    // popup.alert({ content: 'Bạn vừa thêm'+ DB.get(products).find({ id: productId }).value().name + 'vào giỏ' });
    res.redirect(res.locals.oldUrl);
}

module.exports.listProducts = (req, res) => {
    const DB = db.get('session').find({id: res.locals.sessionId});
    let totalCart = DB.get('total');
    let listProducts = [];
    if(DB.get('cart').value() !== undefined){
        let cart = DB.get('cart').value(); 
        let ids = Object.keys(cart);
        let products = db.get('products').value().filter( (product) => {
            return ids.indexOf(product.id) !== -1;
        });
        products.forEach((product)=>{
            let id = product.id;
            product.amount =  cart[id];
            product.total = numberWithCommas( uncodePrice(product.price) * cart[id] );
        })
        let totalPrice = products.reduce((total, product)=>{
            return uncodePrice(product.price) * product.amount + total;
        }, 0);

        products.forEach((product)=>{
            listProducts.push({
                product: product,
                count: DB.get('cart.' + product.id).value()
            })
        })
        res.render('listCarts', {listProducts: listProducts, totalCart: totalCart, totalPrice: numberWithCommas(totalPrice) });
        return;
    }
    res.render('listCarts', {listProducts: listProducts, totalCart: totalCart});



}

module.exports.cartDelete = (req, res) => {
    const productId = (req.params.id).replace(':', '');
    const sessionId = req.signedCookies.sessionId;
    const DB = db.get('session').find({id: sessionId});
    const cart = DB.get('cart').value();
    var count = DB.get('cart.' + productId, 0).value();
    var total = DB.get('total', 0).value();
    delete cart[productId];
    if(count > 1){
        DB.set('total', total - count).write();
    }
    else    
        DB.set('total', total - 1).write();
        res.redirect(res.locals.oldUrl);
}
module.exports.cartSubtract = (req, res) => {
    const productId = (req.params.id).replace(':', '');
    const sessionId = req.signedCookies.sessionId;
    const DB = db.get('session').find({id: sessionId});
    var count = DB.get('cart.' + productId, 0).value();
    var total = DB.get('total', 0).value();
    const cart = DB.get('cart').value();
    if(count - 1 === 0){
        delete cart[productId];
    }
    else{
        DB.set('cart.' + productId, count - 1).write();
    }
    DB.set('total', total - 1).write();
    res.redirect(res.locals.oldUrl);

}

module.exports.buy = (req, res) => {
    const DB = db.get('session').find({id: res.locals.sessionId});
    let totalCart = DB.get('total');
    let listProducts = [];
    if(DB.get('cart').value() !== undefined){
        let cart = DB.get('cart').value(); 
        let ids = Object.keys(cart);
        let products = db.get('products').value().filter( (product) => {
            return ids.indexOf(product.id) !== -1;
        });
        products.forEach((product)=>{
            let id = product.id;
            product.amount =  cart[id];
            product.total = numberWithCommas( uncodePrice(product.price) * cart[id] );
        })
        let totalPrice = products.reduce((total, product)=>{
            return uncodePrice(product.price) * product.amount + total;
        }, 0);

        products.forEach((product)=>{
            listProducts.push({
                product: product,
                count: DB.get('cart.' + product.id).value()
            })
        })
        res.render('buy', {listProducts: listProducts, totalCart: totalCart, totalPrice: numberWithCommas(totalPrice) });
        return;
    }
    res.render('buy', {listProducts: listProducts, totalCart: totalCart});
}