/api/users/{steamId}/transactions транзакции, админа у нас нет на вебе, кидаем айди свой
Retrieve user transaction history. Users can view their own transactions, admins can view any.

steamId \*
string
(path)
Steam ID of the user

76561198123456789
userId
string
(query)
Filter by user ID

76561198123456789
type
string
(query)
Filter by transaction type

--
status
string
(query)
Filter by transaction status

--
method
string
(query)
Filter by payment method

--
currency
string
(query)
Filter by currency

RUB
relatedOrderId
string
(query)
Filter by related order ID

order_123456
fromDate
string
(query)
Filter transactions from date

2024-01-01T00:00:00Z
toDate
string
(query)
Filter transactions to date

2024-12-31T23:59:59Z
sortBy
string
(query)
Sort by created date

desc

/api/users/inventory/by-trade-url инвентарь без цен по урлу
Retrieve user inventory items by their Steam trade URL. Available for users with USERS permission. Fast method without pricing.
{
"tradeUrl": "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=AbCdEfGh",
"gameId": 730
}

респонс
{
"steamId": "76561198123456789",
"tradeUrl": "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=AbCdEfGh",
"gameId": 730,
"contextId": 2,
"items": [
{
"assetid": "12345678901234567",
"classid": "310776877",
"instanceid": "188530139",
"market_name": "AK-47 | Redline (Field-Tested)",
"name": "AK-47 | Redline",
"type": "Rifle",
"rarity": "Classified",
"exterior": "Field-Tested",
"image": "https://steamcommunity-a.akamaihd.net/economy/image/...",
"tradable": true,
"marketable": true
}
],
"count": 42,
"lastUpdated": "2024-01-15T10:30:00Z"
}

/api/users/{steamId}/inventory
Retrieve user inventory items by Steam ID. Users can view their own inventory, admins can view any. Fast method without pricing.
steamId \*
string
(path)
Steam ID of the user

76561198123456789
gameId
number
(query)
Game ID (730 - CS2, 570 - Dota 2, 753 - Steam, 252490 - Rust)

730

{
"steamId": "76561198123456789",
"tradeUrl": "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=AbCdEfGh",
"gameId": 730,
"contextId": 2,
"items": [
{
"assetid": "12345678901234567",
"classid": "310776877",
"instanceid": "188530139",
"market_name": "AK-47 | Redline (Field-Tested)",
"name": "AK-47 | Redline",
"type": "Rifle",
"rarity": "Classified",
"exterior": "Field-Tested",
"image": "https://steamcommunity-a.akamaihd.net/economy/image/...",
"tradable": true,
"marketable": true
}
],
"count": 42,
"lastUpdated": "2024-01-15T10:30:00Z"
}

/api/users/inventory/by-trade-url/with-prices
Retrieve user inventory items by their Steam trade URL with prices from parser service. Available for users with USERS permission. Slower but includes pricing and total value.
{
"tradeUrl": "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=AbCdEfGh",
"gameId": 730
}

{
"steamId": "76561198123456789",
"tradeUrl": "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=AbCdEfGh",
"gameId": 730,
"contextId": 2,
"items": [
{
"assetid": "12345678901234567",
"classid": "310776877",
"instanceid": "188530139",
"market_name": "AK-47 | Redline (Field-Tested)",
"market_hash_name": "AK-47 | Redline (Field-Tested)",
"name": "AK-47 | Redline",
"type": "Rifle",
"rarity": "Classified",
"exterior": "Field-Tested",
"image": "https://steamcommunity-a.akamaihd.net/economy/image/...",
"tradable": true,
"marketable": true,
"prices": {
"avgPrice": 25.5,
"steamPrice": 30,
"providers": {
"steam": {
"price": 30
},
"buff": {
"price": 25.5
},
"csgofloat": {
"price": 24
}
},
"lastUpdated": "2024-01-15T10:30:00Z",
"available": true
},
"amount": 1
}
],
"count": 42,
"lastUpdated": "2024-01-15T10:30:00Z",
"totalValue": 1250.5,
"priceStats": {
"itemsWithPrices": 35,
"itemsWithoutPrices": 7,
"priceAccuracy": 83.3
}
}

/api/users/{steamId}/inventory/with-prices
Retrieve user inventory items by Steam ID with prices from parser service. Users can view their own inventory, admins can view any. Slower but includes pricing and total value.

Name Description
steamId \*
string
(path)
Steam ID of the user

76561198123456789
gameId
number
(query)
Game ID (730 - CS2, 570 - Dota 2, 753 - Steam, 252490 - Rust)

730

{
"steamId": "76561198123456789",
"tradeUrl": "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=AbCdEfGh",
"gameId": 730,
"contextId": 2,
"items": [
{
"assetid": "12345678901234567",
"classid": "310776877",
"instanceid": "188530139",
"market_name": "AK-47 | Redline (Field-Tested)",
"market_hash_name": "AK-47 | Redline (Field-Tested)",
"name": "AK-47 | Redline",
"type": "Rifle",
"rarity": "Classified",
"exterior": "Field-Tested",
"image": "https://steamcommunity-a.akamaihd.net/economy/image/...",
"tradable": true,
"marketable": true,
"prices": {
"avgPrice": 25.5,
"steamPrice": 30,
"providers": {
"steam": {
"price": 30
},
"buff": {
"price": 25.5
},
"csgofloat": {
"price": 24
}
},
"lastUpdated": "2024-01-15T10:30:00Z",
"available": true
},
"amount": 1
}
],
"count": 42,
"lastUpdated": "2024-01-15T10:30:00Z",
"totalValue": 1250.5,
"priceStats": {
"itemsWithPrices": 35,
"itemsWithoutPrices": 7,
"priceAccuracy": 83.3
}
}
