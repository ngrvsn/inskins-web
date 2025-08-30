/api/orders
создать заявку

{
"steamId": "string",
"userLogin": "string",
"itemIds": [
"507f1f77bcf86cd799439011",
"507f1f77bcf86cd799439012"
],
"itemNames": [
"AK-47 | Redline (Field-Tested)",
"AWP | Dragon Lore (Factory New)"
],
"botName": "TradeBot_01",
"botSteamId": "76561198123456789",
"paymentMethod": "sbp",
"paymentData": "+79123456789",
"payoutAmount": 950,
"amountBeforeCommission": 1000,
"commissionRate": 5,
"status": "created",
"tradeId": "3245234523",
"telegramUsername": "@username",
"notes": "string",
"tradeUrl": "string"
}

респонс
201
Заявка успешно создана

Media type

application/json
Controls Accept header.
Example Value
Schema
{
"id": "507f1f77bcf86cd799439011",
"orderNumber": 1337,
"orderId": "ORD-1234567890-ABC123DEF",
"steamId": "76561198123456789",
"userLogin": "PlayerName",
"itemIds": [
"507f1f77bcf86cd799439013",
"507f1f77bcf86cd799439014"
],
"itemNames": [
"AK-47 | Redline (Field-Tested)",
"AWP | Dragon Lore (Factory New)"
],
"botName": "TradeBot_01",
"botSteamId": "76561198987654321",
"paymentMethod": "sbp",
"paymentData": "+79123456789",
"payoutAmount": 950,
"amountBeforeCommission": 1000,
"commissionAmount": 50,
"commissionRate": 5,
"status": "created",
"statusChangeReason": "Предметы получены торговым ботом",
"tradeId": 3245234523,
"tradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"steamTradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"telegramUsername": "@username",
"telegramUrl": "https://t.me/username",
"createdAt": "2024-01-01T10:30:00.000Z",
"updatedAt": "2024-01-01T11:45:00.000Z",
"receivedAt": "2024-01-01T10:35:00.000Z",
"paidAt": "2024-01-01T12:00:00.000Z",
"declinedAt": "2024-01-01T11:30:00.000Z",
"withdrawnAt": "2024-01-01T11:15:00.000Z",
"stoppedAt": "2024-01-01T11:20:00.000Z",
"notes": "Выплата проведена вручную",
"isCompleted": false
}

/api/orders/my
получить мои заявки
Name Description
orderNumber
number
(query)
Поиск по номеру заявки (человекочитаемый ID)

1337
orderId
string
(query)
Поиск по системному ID заявки

ORD-1234567890-ABC123DEF
steamId
string
(query)
Поиск по Steam ID пользователя

76561198123456789
userLogin
string
(query)
Поиск по никнейму пользователя

PlayerName
botName
string
(query)
Поиск по имени торгового бота

TradeBot_01
botSteamId
string
(query)
Поиск по Steam ID торгового бота

76561198987654321
itemName
string
(query)
Поиск по названию предметов

AK-47
paymentMethod
array<string>
(query)
Фильтр по методу оплаты

--sbpcard_rucard_visacard_mastercardsepapaypalusdt_trc20usdt_erc20usdt_bscbtcethtonbnbsolqiwiyandex_money
paymentData
string
(query)
Поиск по данным для оплаты (частично скрыто)

+7912
status
array<string>
(query)
Фильтр по статусу заявки

--createdreceiveddeclinedwithdrawnstoppedpaid
minPayoutAmount
number
(query)
Минимальная сумма выплаты

100
maxPayoutAmount
number
(query)
Максимальная сумма выплаты

5000
tradeId
string
(query)
Поиск по ID трейда в Steam

3245234523
telegramUsername
string
(query)
Поиск по Telegram username

@username
dateFrom
string
(query)
Дата создания от (ISO 8601)

2024-01-01T00:00:00.000Z
dateTo
string
(query)
Дата создания до (ISO 8601)

2024-12-31T23:59:59.999Z
updatedFrom
string
(query)
Дата последнего обновления от (ISO 8601)

2024-01-01T00:00:00.000Z
updatedTo
string
(query)
Дата последнего обновления до (ISO 8601)

2024-12-31T23:59:59.999Z
isCompleted
boolean
(query)
Фильтр по завершенности заявки

false
page
number
(query)
Номер страницы

1
limit
number
(query)
Количество элементов на странице

10
sortBy
string
(query)
Поле для сортировки

createdAt
sortOrder
string
(query)
Порядок сортировки

desc

{
"data": [
{
"id": "507f1f77bcf86cd799439011",
"orderNumber": 1337,
"orderId": "ORD-1234567890-ABC123DEF",
"steamId": "76561198123456789",
"userLogin": "PlayerName",
"itemIds": [
"507f1f77bcf86cd799439013",
"507f1f77bcf86cd799439014"
],
"itemNames": [
"AK-47 | Redline (Field-Tested)",
"AWP | Dragon Lore (Factory New)"
],
"botName": "TradeBot_01",
"botSteamId": "76561198987654321",
"paymentMethod": "sbp",
"paymentData": "+79123456789",
"payoutAmount": 950,
"amountBeforeCommission": 1000,
"commissionAmount": 50,
"commissionRate": 5,
"status": "created",
"statusChangeReason": "Предметы получены торговым ботом",
"tradeId": 3245234523,
"tradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"steamTradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"telegramUsername": "@username",
"telegramUrl": "https://t.me/username",
"createdAt": "2024-01-01T10:30:00.000Z",
"updatedAt": "2024-01-01T11:45:00.000Z",
"receivedAt": "2024-01-01T10:35:00.000Z",
"paidAt": "2024-01-01T12:00:00.000Z",
"declinedAt": "2024-01-01T11:30:00.000Z",
"withdrawnAt": "2024-01-01T11:15:00.000Z",
"stoppedAt": "2024-01-01T11:20:00.000Z",
"notes": "Выплата проведена вручную",
"isCompleted": false
}
],
"total": 1250
}

/api/orders/number/{orderNumber}
получить заявку по номеру
Name Description
orderNumber \*
number
(path)
Номер заявки (начиная с 1337)

orderNumber

{
"id": "507f1f77bcf86cd799439011",
"orderNumber": 1337,
"orderId": "ORD-1234567890-ABC123DEF",
"steamId": "76561198123456789",
"userLogin": "PlayerName",
"itemIds": [
"507f1f77bcf86cd799439013",
"507f1f77bcf86cd799439014"
],
"itemNames": [
"AK-47 | Redline (Field-Tested)",
"AWP | Dragon Lore (Factory New)"
],
"botName": "TradeBot_01",
"botSteamId": "76561198987654321",
"paymentMethod": "sbp",
"paymentData": "+79123456789",
"payoutAmount": 950,
"amountBeforeCommission": 1000,
"commissionAmount": 50,
"commissionRate": 5,
"status": "created",
"statusChangeReason": "Предметы получены торговым ботом",
"tradeId": 3245234523,
"tradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"steamTradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"telegramUsername": "@username",
"telegramUrl": "https://t.me/username",
"createdAt": "2024-01-01T10:30:00.000Z",
"updatedAt": "2024-01-01T11:45:00.000Z",
"receivedAt": "2024-01-01T10:35:00.000Z",
"paidAt": "2024-01-01T12:00:00.000Z",
"declinedAt": "2024-01-01T11:30:00.000Z",
"withdrawnAt": "2024-01-01T11:15:00.000Z",
"stoppedAt": "2024-01-01T11:20:00.000Z",
"notes": "Выплата проведена вручную",
"isCompleted": false
}

/api/orders/order-id/{orderId}
получить заявку по айди системному
Name Description
orderId \*
string
(path)
Системный ID заявки

{
"id": "507f1f77bcf86cd799439011",
"orderNumber": 1337,
"orderId": "ORD-1234567890-ABC123DEF",
"steamId": "76561198123456789",
"userLogin": "PlayerName",
"itemIds": [
"507f1f77bcf86cd799439013",
"507f1f77bcf86cd799439014"
],
"itemNames": [
"AK-47 | Redline (Field-Tested)",
"AWP | Dragon Lore (Factory New)"
],
"botName": "TradeBot_01",
"botSteamId": "76561198987654321",
"paymentMethod": "sbp",
"paymentData": "+79123456789",
"payoutAmount": 950,
"amountBeforeCommission": 1000,
"commissionAmount": 50,
"commissionRate": 5,
"status": "created",
"statusChangeReason": "Предметы получены торговым ботом",
"tradeId": 3245234523,
"tradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"steamTradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"telegramUsername": "@username",
"telegramUrl": "https://t.me/username",
"createdAt": "2024-01-01T10:30:00.000Z",
"updatedAt": "2024-01-01T11:45:00.000Z",
"receivedAt": "2024-01-01T10:35:00.000Z",
"paidAt": "2024-01-01T12:00:00.000Z",
"declinedAt": "2024-01-01T11:30:00.000Z",
"withdrawnAt": "2024-01-01T11:15:00.000Z",
"stoppedAt": "2024-01-01T11:20:00.000Z",
"notes": "Выплата проведена вручную",
"isCompleted": false
}

/api/orders/{id}
Name Description
id \*
string
(path)
MongoDB ID заявки

{
"id": "507f1f77bcf86cd799439011",
"orderNumber": 1337,
"orderId": "ORD-1234567890-ABC123DEF",
"steamId": "76561198123456789",
"userLogin": "PlayerName",
"itemIds": [
"507f1f77bcf86cd799439013",
"507f1f77bcf86cd799439014"
],
"itemNames": [
"AK-47 | Redline (Field-Tested)",
"AWP | Dragon Lore (Factory New)"
],
"botName": "TradeBot_01",
"botSteamId": "76561198987654321",
"paymentMethod": "sbp",
"paymentData": "+79123456789",
"payoutAmount": 950,
"amountBeforeCommission": 1000,
"commissionAmount": 50,
"commissionRate": 5,
"status": "created",
"statusChangeReason": "Предметы получены торговым ботом",
"tradeId": 3245234523,
"tradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"steamTradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"telegramUsername": "@username",
"telegramUrl": "https://t.me/username",
"createdAt": "2024-01-01T10:30:00.000Z",
"updatedAt": "2024-01-01T11:45:00.000Z",
"receivedAt": "2024-01-01T10:35:00.000Z",
"paidAt": "2024-01-01T12:00:00.000Z",
"declinedAt": "2024-01-01T11:30:00.000Z",
"withdrawnAt": "2024-01-01T11:15:00.000Z",
"stoppedAt": "2024-01-01T11:20:00.000Z",
"notes": "Выплата проведена вручную",
"isCompleted": false
}

/api/orders/{id}/withdraw
отозвать заявку
Name Description
id \*
string
(path)
MongoDB ID заявки

{
"reason": "Передумал продавать"
}

Заявка отозвана

Media type

application/json
Controls Accept header.
Example Value
Schema
{
"id": "507f1f77bcf86cd799439011",
"orderNumber": 1337,
"orderId": "ORD-1234567890-ABC123DEF",
"steamId": "76561198123456789",
"userLogin": "PlayerName",
"itemIds": [
"507f1f77bcf86cd799439013",
"507f1f77bcf86cd799439014"
],
"itemNames": [
"AK-47 | Redline (Field-Tested)",
"AWP | Dragon Lore (Factory New)"
],
"botName": "TradeBot_01",
"botSteamId": "76561198987654321",
"paymentMethod": "sbp",
"paymentData": "+79123456789",
"payoutAmount": 950,
"amountBeforeCommission": 1000,
"commissionAmount": 50,
"commissionRate": 5,
"status": "created",
"statusChangeReason": "Предметы получены торговым ботом",
"tradeId": 3245234523,
"tradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"steamTradeUrl": "https://steamcommunity.com/tradeoffer/3245234523/",
"telegramUsername": "@username",
"telegramUrl": "https://t.me/username",
"createdAt": "2024-01-01T10:30:00.000Z",
"updatedAt": "2024-01-01T11:45:00.000Z",
"receivedAt": "2024-01-01T10:35:00.000Z",
"paidAt": "2024-01-01T12:00:00.000Z",
"declinedAt": "2024-01-01T11:30:00.000Z",
"withdrawnAt": "2024-01-01T11:15:00.000Z",
"stoppedAt": "2024-01-01T11:20:00.000Z",
"notes": "Выплата проведена вручную",
"isCompleted": false
}
