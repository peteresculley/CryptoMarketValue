// Node packages
const request = require('request');

const CryptoInfo = {
    getInfo: (currency, cb) => { // cb(error, info)
        let currencyCleaned = currency.replace(/ /g, '-').toLowerCase();
        let url = process.env.COINMARKETCAP_API + currencyCleaned;
        request(url, { json: true }, (err, res, body) => {
            if(err) {
                cb(err, null);
            } else {
                if(body && body.length > 0) {
                    let info = {value: body[0].price_usd,
                                marketValue: body[0].market_cap_usd};
                    
                    cb(null, info);
                } else {
                    cb("No results returned from CoinMarketCap API", null);
                }
            }
        });
    }
};

module.exports = CryptoInfo;
