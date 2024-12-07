const express = require('express');
const router = express.Router();
const { generateReport } = require('../controllers/reportController');

router.post('/generate/:id', generateReport);

module.exports = router;
