// Setup env
let envPath = __dirname + "/test.env";
require('dotenv').config({path:envPath});

// Node packages
const assert = require('assert');

// Controllers
const cryptoInfo = require('./../controllers/cryptoInfo');

describe('cryptoInfo', function() {
    describe('private:', function() {
        describe('#cleanCurrency(currency)', function() {
            it('should return lower case with spaces replaced by dashes', function() {
                assert.equal(cryptoInfo.__test_only__.cleanCurrency("BiTcOiN cAsH"), "bitcoin-cash");
            });
        });
        describe('#getAPIUrl(cleanedCurrency)', function() {
            it('should return COINMARKETCAP_API + cleanedCurrency', function() {
                assert.equal(cryptoInfo.__test_only__.getAPIUrl("bitcoin"), "https://api.coinmarketcap.com/v1/ticker/bitcoin");
            });
        });
        describe('#createInfoObject(cryptoTickerElement)', function() {
            it('should return value and marketValue of ticker element', function() {
                let infoObject = cryptoInfo.__test_only__.createInfoObject({price_usd: 250, market_cap_usd: 5000});
                assert.equal(infoObject.value, 250);
                assert.equal(infoObject.marketValue, 5000);
            });
        });
    });
    describe('public:', function() {
        describe('#getInfo(currency, cb)', function() {
            it('should return value and marketValue for currency', function(done) {
                cryptoInfo.getInfo("Bitcoin", (error, info) => {
                    if(error) {
                        done(error);
                    }
                    else {
                        assert.ok(info.value);
                        assert.ok(info.marketValue);
                        done();
                    }
                });
            });
            it('should return error for non-existant currency', function(done) {
                cryptoInfo.getInfo("abcd", (error, info) => {
                    if(error) {
                        done();
                    }
                    else {
                        done(new Error("Did not return error when given non-existant currency"));
                    }
                });
            });
        });
    });
});