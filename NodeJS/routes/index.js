// Node packages
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('input.html');
});

module.exports = router;
