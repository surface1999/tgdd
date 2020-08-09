let express = require('express');
let controller = require('../controller/phone.controller');
let router = express.Router();

router.get('/', controller.phone);
router.get('/samsung', controller.samsung);
router.get('/iphone', controller.iphone);
router.get('/oppo', controller.oppo);
router.get('/vivo', controller.vivo);
router.get('/huawei', controller.huawei);
router.get('/realme', controller.realme);
router.get('/search', controller.search);

module.exports = router;

