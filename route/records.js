var router = require('express').Router();
var controller = require('../controller/InvoiceRecordController');

router.post('/filterByDateAndCount', controller.filterByDateAndCount);

module.exports = router;