
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

let title = "Hãng sản xuất:   ";
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
module.exports.samsung = (req, res) =>{
    let urls = [
        phone,
        {
            name: 'Samsung',
            link: '/phone/samsung'
        }
    ];
    let products = db.get('products').value().filter((product)=>{
        return product.name.toLowerCase().indexOf('samsung') !== -1;
    });
    let q = req.query.q;
    if(q){
        products = filterPrice(q, products);
    }

    res.render('brand-filter', {    
                                    isActive: 'samsung',
                                    urls: urls,
                                    brand: title + 'Samsung',
                                    products: products,
                                    priceActive: q !== undefined? q: ''
                                }
                );
}

module.exports.iphone = (req, res) =>{
    let urls = [
        phone,
        {
            name: 'Iphone',
            link: '/phone/iphone'
        }

    ];
    let products = db.get('products').value().filter((product)=>{
        return product.name.toLowerCase().indexOf('iphone') !== -1;
    });
    let q = req.query.q;
    if(q){
        products = filterPrice(q, products);
    }
    res.render('brand-filter', { 
                                    isActive: 'iphone',
                                    urls: urls,
                                    brand: title + 'Iphone',
                                    products: products,
                                    priceActive: q !== undefined? q: ''
                                });
}

module.exports.oppo = (req, res) =>{
    let urls = [
        phone,
        {
            name: 'Oppo',
            link: '/phone/oppo'
        }
    ];
    let products = db.get('products').value().filter((product)=>{
        return product.name.toLowerCase().indexOf('oppo') !== -1;
    });
    let q = req.query.q;
    if(q){
        products = filterPrice(q, products);
    }
    res.render('brand-filter', {
                                    isActive: 'oppo', 
                                    urls: urls,
                                    brand: title + 'Oppo',
                                    products: products,
                                    priceActive: q !== undefined? q: ''
                                });
}

module.exports.vivo = (req, res) =>{
    let urls = [
        phone,
        {
            name: 'Vivo',
            link: '/phone/vivo'
        }
    ];
    let products = db.get('products').value().filter((product)=>{
        return product.name.toLowerCase().indexOf('vivo') !== -1;
    });
    let q = req.query.q;
    if(q){
        products = filterPrice(q, products);
    }
    res.render('brand-filter', { 
                                    isActive: 'vivo',
                                    urls: urls,
                                    brand: title + 'Vivo',
                                    products: products,
                                    priceActive: q !== undefined? q: ''
                                });
}

module.exports.huawei = (req, res) =>{
    let urls = [
        phone,
        {
            name: 'Huawei',
            link: '/phone/huawei'
        }
    ];
    let products = db.get('products').value().filter((product)=>{
        return product.name.toLowerCase().indexOf('huawei') !== -1;
    });
    let q = req.query.q;
    if(q){
        products = filterPrice(q, products);
    }
    res.render('brand-filter', { 
                                    isActive: 'huawei',
                                    urls: urls,
                                    brand: title + 'Huawei',
                                    products: products,
                                    priceActive: q !== undefined? q: ''
                                });
}

module.exports.realme = (req, res) =>{
    let urls = [
        phone,
        {
            name: 'Realme',
            link: '/phone/realme'
        }
    ];
    let products = db.get('products').value().filter((product)=>{
        return product.name.toLowerCase().indexOf('realme') !== -1;
    });
    let q = req.query.q;
    if(q){
        products = filterPrice(q, products);
    }

    res.render('brand-filter', { 
                                    isActive: 'realme',
                                    urls: urls,
                                    brand: title + 'Realme',
                                    products: products,
                                    priceActive: q !== undefined? q: ''
                                });
}

module.exports.search = (req, res) =>{
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
                                    priceActive: q !== undefined? q: ''
                                });
}

module.exports.phone = (req, res) =>{
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
                                    priceActive: q !== undefined? q: ''
                                });
}