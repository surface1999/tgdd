let express = require('express');
let controller = require('../controller/soldOut.controller');
let router = express.Router();

router.get('', controller.soldOut);

module.exports = router