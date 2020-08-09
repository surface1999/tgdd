const express = require('express');
const low = require('lowdb')
const phoneRouter = require('./routers/phone.router');
const app = express();
const FileSync = require('lowdb/adapters/FileSync');
const { url } = require('inspector');
const { homedir } = require('os');
const adapter = new FileSync('db.json')
const db = low(adapter)



app.use(express.static('public'));
// Set some defaults (required if your JSON file is empty)
db.defaults({ products: []})
  .write();
let products = db.get('products').value();

// Add a post
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res)=>{
  const urls = [
    {
      name: 'Home',
      link: '/'
    }
  ]
    res.render('index', {   urls: urls,
                            isActive: 'home',
                            products: products});
} )

app.get('/sold-out', (req, res)=>{
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
    res.render('sold-out', {    urls: urls,
                                isActive: 'soldout',
                                products: products});
} )

app.use('/phone', phoneRouter);

app.get('seach')
app.listen('3000', ()=>{
    console.log("App is running on port 3000");
})