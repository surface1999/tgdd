let express = require('express');
let controller = require('../controller/home.controller');
let router = express.Router();

router.get('', controller.home);

module.exports = router