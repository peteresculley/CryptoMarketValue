// Node packages
const request = require('request');

// Helper functions
function cleanCurrency(currency) {
    let cleanedCurrency = currency.replace(/ /g, '-').toLowerCase();
    return cleanedCurrency;
}

function getAPIUrl(cleanedCurrency) {
    return process.env.COINMARKETCAP_API + cleanedCurrency;
}

function createInfoObject(cryptoTickerElement) {
    let info = {value: cryptoTickerElement.price_usd,
                marketValue: cryptoTickerElement.market_cap_usd};
    return info;
}

// CryptoInfo Module
const CryptoInfo = {
    getInfo: (currency, cb) => { // cb(error, info)
        let cleanedCurrency = cleanCurrency(currency);
        request(getAPIUrl(cleanedCurrency), { json: true }, (err, res, body) => {
            if(err) {
                cb(err, null);
            } else {
                if(body && body.length > 0) {
                    cb(null, createInfoObject(body[0])); // ignore all but the first returned element
                } else {
                    cb("No results returned from CoinMarketCap API", null);
                }
            }
        });
    },
    /* test-code */
    __test_only__: {cleanCurrency, getAPIUrl, createInfoObject}
    /* end-test-code */
};

module.exports = CryptoInfo;
