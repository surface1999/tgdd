const db = require('../db');


let phone = {
    name: 'Phone',
    link: '/phone'
}


uncodePrice = (price)=>{
    while(price.indexOf('.') !== -1){
        price = price.replace('.', '');
    }
    return parseInt(price);
}
filterPrice = (q, products) => {
    switch (q) {
        case 'duoi-2-trieu':
            products = products.filter( (product)=>{
                return uncodePrice(product.price) < 2000000;
            });
            return products;
            break;
            case 'tu-2-4-trieu':
                products = products.filter( (product)=>{
                    return uncodePrice(product.price) >= 2000000 && uncodePrice(product.price) < 4000000;
                });
                return products;
            break;
            case 'tu-4-7-trieu':
                products = products.filter( (product)=>{
                    return uncodePrice(product.price) >= 4000000 && uncodePrice(product.price) < 7000000;
                });
                return products;
            break;
            case 'tu-7-13-trieu':
                products = products.filter( (product)=>{
                    return uncodePrice(product.price) >= 7000000 && uncodePrice(product.price) <= 13000000;
                });
                return products;
            break; 
            default:
                products = products.filter( (product)=>{
                    return uncodePrice(product.price) > 13000000;
                });
                return products;
            break;   
    }
}
module.exports.brand = (req, res) =>{
    let totalCart = db.get('session').find({id: res.locals.sessionId}).get('total').value();
    let brand = req.path.replace('/', '');
    let urls = [
        phone,
        {
            name: brand[0].toUpperCase() + brand.replace(brand[0], ''),
            link: '/phone/' + brand
        }
    ];
    let products = db.get('products').value().filter((product)=>{
        return product.name.toLowerCase().indexOf(brand) !== -1;
    });
    let q = req.query.q;
    if(q){
        products = filterPrice(q, products);
    }

    res.render('brand-filter', {    
                                    isActive: brand,
                                    urls: urls,
                                    brand: 'Hãng sản xuất: ' + brand,
                                    products: products,
                                    priceActive: q !== undefined? q: '',
                                    totalCart: totalCart 
                                }
                );
}

module.exports.phone = (req, res) =>{
    let totalCart = db.get('session').find({id: res.locals.sessionId}).get('total').value();
    let urls = [
        phone,
    ];
    let products = db.get('products').value();
    let q = req.query.q;
    if(q){
        products = filterPrice(q, products);
    }
    res.render('brand-filter', { 
                                    isActive: 'phone',
                                    urls: urls,
                                    brand: 'Smart Phone',
                                    products: products,
                                    priceActive: q !== undefined? q: '',
                                    totalCart: totalCart 
                                });
}

module.exports.search = (req, res) =>{
    let totalCart = db.get('session').find({id: res.locals.sessionId}).get('total').value();
    let urls = [
        phone,
        {
            name: 'Search',
            link: '/phone/search'
        }
    ];
    let key = req.query.key;
    let products = db.get('products').value().filter((product)=>{
        return product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
    });

    
    res.render('brand-filter', { 
                                    isActive: 'phone',
                                    urls: urls,
                                    brand: 'Tìm kiếm từ khóa:  ' + key,
                                    products: products,
                                    priceActive: '',
                                    totalCart: totalCart 
                                });
}

