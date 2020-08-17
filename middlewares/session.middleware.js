const random = require('string-random');
const db = require('../db');
module.exports = (req, res, next) => {
    if(!req.signedCookies.sessionId){
        let sessionId = random(10);
        res.cookie('sessionId', sessionId, { signed: true } );
        db.get('session').push({ id: sessionId, total: 0 }).write();
    }
    res.locals.sessionId = req.signedCookies.sessionId;
    res.locals.oldUrl = !req.signedCookies.url? '': req.signedCookies.url;
    res.cookie('url', req.originalUrl, { signed: true } );
    console.log('hello');
    next();
}