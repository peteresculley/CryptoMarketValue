// Setup env
let envPath = __dirname + "/test.env";
require('dotenv').config({path:envPath});

// Node packages
const assert = require('assert');

// Controllers
const cryptoInfo = require('./../controllers/cryptoInfo');

describe('cryptoInfo', () => {
    describe('#cleanCurrency(currency)', () => {
        it('should return lower case with spaces replaced by dashes', () => {
            assert.equal(cryptoInfo.__test_only__.cleanCurrency("BiTcOiN cAsH"), "bitcoin-cash");
        });
    });
    describe('#getAPIUrl(cleanedCurrency)', () => {
        it('should return COINMARKETCAP_API + cleanedCurrency', () => {
            assert.equal(cryptoInfo.__test_only__.getAPIUrl("bitcoin"), "https://api.coinmarketcap.com/v1/ticker/bitcoin");
        });
    });
    describe('#createInfoObject(cryptoTickerElement)', () => {
        it('should return value and marketValue of ticker element', () => {
            let infoObject = cryptoInfo.__test_only__.createInfoObject({price_usd: 250, market_cap_usd: 5000});
            assert.equal(infoObject.value, 250);
            assert.equal(infoObject.marketValue, 5000);
        });
    });
});