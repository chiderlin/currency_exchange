const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.json({ status: 'ok' });
});
router.get('/api/exchange', require('../controller'));

module.exports = router;
