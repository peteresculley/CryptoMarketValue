// Node packages
const express = require('express');
const router = express.Router();

// Controllers
const CryptoInfo = require('./../controllers/cryptoInfo');

router.get('/getCryptoValue', (req, res) => {
    if(req && req.query && req.query.currency) {
        let currency = req.query.currency;
        console.log(`Getting Crypto Value request for ${currency}`);
        
        CryptoInfo.getInfo(currency, (error, info) => {
            if(error) {
                res.json({ success: false, error });
            } else {
                res.json({ success: true, value: info.value });
            }
        });
    } else {
        console.log("Getting Crypto Value request but no currency given");
        res.send("Error: No currency specified");
    }
});

router.get('/getCryptoMarketValue', (req, res) => {
    if(req && req.query && req.query.currency) {
        let currency = req.query.currency;
        console.log(`Getting Crypto Market Value request for ${currency}`);
        
        CryptoInfo.getInfo(currency, (error, info) => {
            if(error) {
                res.json({ success: false, error });
            } else {
                res.json({ success: true, marketValue: info.marketValue });
            }
        });
    } else {
        console.log("Getting Crypto Market Value request but no currency given");
        res.send("Error: No currency specified");
    }
});

module.exports = router;
