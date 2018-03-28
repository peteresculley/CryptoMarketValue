import requests
import sys

COINMARKETCAP_API = "https://api.coinmarketcap.com/v1/ticker/"

def convert_name_to_id(cryptoCurrencyName):
	cryptoCurrencyId = cryptoCurrencyName.lower().replace(" ", "-")
	return cryptoCurrencyId

def find_value_and_market_cap(cryptoCurrencyId):
	r = requests.get(COINMARKETCAP_API + cryptoCurrencyId)

	value = None
	marketCap = None
	errorMessage = None
	if not r is None: # sanity check
		if r.status_code == 200: # good response
			body = r.json()
			if body and len(body) > 0:
				value = body[0].get("price_usd")
				marketCap = body[0].get("market_cap_usd")
			else:
				errorMessage = "CoinMarketCap API response in unexpected form"
		elif r.status_code == 404: # crypto currency ID not found by CoinMarketCap API
			errorMessage = "Crypto currency not found by CoinMarketCap"
		else:
			errorMessage = "CoinMarketCap API call failed"
	else:
		errorMessage = "CoinMarketCap API call failed"
	return value, marketCap, errorMessage

def run():
	if len(sys.argv) > 1: # requires at least one argument
		cryptoCurrencyName = sys.argv[1]
		for i in range(2, len(sys.argv)):
			cryptoCurrencyName += " " + sys.argv[i]
		
		cryptoCurrencyId = convert_name_to_id(cryptoCurrencyName)
		value, marketCap, errorMessage = find_value_and_market_cap(cryptoCurrencyId)
		
		if value and marketCap:
			print(cryptoCurrencyName + " value is $" + value + " USD with market cap $" + marketCap + " USD")
		else:
			print("Error: " + errorMessage)
	else:
		print("You must specify a Crypto Currency like this \"docker run cryptomarketvalue Bitcoin\" or \"docker run cryptomarketvalue Bitcoin Cash\"")

if __name__ == "__main__":
	run()
