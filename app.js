const express = require('express');
const phoneRouter = require('./routers/phone.router');
const app = express();
const db = require('./db');
const sessionRouter = require('./routers/session.router');
const sessionMiddleware = require('./middlewares/session.middleware');
var cookieParser = require('cookie-parser');
const { url } = require('inspector');
const { homedir } = require('os');
const random = require('string-random');
const homeRouter = require('./routers/home.router');
const soldOutRouter = require('./routers/soldOut.router');

app.use(cookieParser('MY SECRET'));
app.use(express.static('public'));
// Set some defaults (required if your JSON file is empty)

// Add a post
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(sessionMiddleware);

app.use('/', homeRouter);
app.use('/sold-out', soldOutRouter);
app.use('/phone', phoneRouter);
app.use('/cart', sessionRouter);
app.get('seach');
var port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("App is running on port " + port);
})