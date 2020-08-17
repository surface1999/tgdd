let express = require('express');
let controller = require('../controller/session.controller');
let router = express.Router();

router.get('/add:id', controller.cartController);
router.get('/products', controller.listProducts);
router.get('/subtract:id', controller.cartSubtract);
router.get('/delete:id', controller.cartDelete);
router.get('/buy', controller.buy);

module.exports = router;