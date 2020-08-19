let express = require('express');
let controller = require('../controller/phone.controller');
let router = express.Router();

router.get('/', controller.phone);
router.get('/samsung', controller.brand);
router.get('/iphone', controller.brand);
router.get('/oppo', controller.brand);
router.get('/vivo', controller.brand);
router.get('/huawei', controller.brand);
router.get('/realme', controller.brand);
router.get('/search', controller.search);

module.exports = router;

