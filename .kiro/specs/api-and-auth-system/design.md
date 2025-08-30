# Design Document

## Обзор

Система API и Steam авторизации будет построена по модульной архитектуре с четким разделением ответственности. Структура будет следовать паттерну из админки со скриншота: `src/api/` с подпапками для каждого модуля (auth, users, orders), где каждый модуль содержит `index.ts`, `model.ts`, `types.ts` и конфигурацию Axios в отдельной папке `config/`.

## Архитектура

### Структура директорий

```
src/
├── api/
│   ├── auth/
│   │   ├── index.ts          # Экспорт всех методов авторизации
│   │   ├── model.ts          # Бизнес-логика и вспомогательные функции
│   │   └── types.ts          # TypeScript интерфейсы
│   ├── users/
│   │   ├── index.ts          # Экспорт всех методов пользователей
│   │   ├── model.ts          # Бизнес-логика для пользователей
│   │   └── types.ts          # TypeScript интерфейсы
│   ├── orders/
│   │   ├── index.ts          # Экспорт всех методов заказов
│   │   ├── model.ts          # Бизнес-логика для заказов
│   │   └── types.ts          # TypeScript интерфейсы
│   └── config/
│       ├── axios.ts          # Настройка Axios экземпляра
│       ├── index.ts          # Экспорт конфигурации
│       └── interceptors.ts   # Интерцепторы для токенов
└── app/
    └── auth/
        ├── page.tsx          # Страница входа через Steam
        ├── page.module.scss  # Стили страницы входа
        └── callback/
            ├── page.tsx      # Обработка callback от Steam
            └── page.module.scss # Стили callback страницы
```

## Компоненты и интерфейсы

### 1. Конфигурация Axios (`src/api/config/`)

#### `axios.ts`

- Создание базового экземпляра Axios с `baseURL`
- Настройка таймаутов и заголовков по умолчанию
- Подключение интерцепторов

#### `interceptors.ts`

- **Request Interceptor**: Автоматическое добавление `Authorization: Bearer {token}` к каждому запросу
- **Response Interceptor**: Обработка 401 ошибок и автоматическое обновление токенов
- **Error Handling**: Централизованная обработка ошибок API

#### `index.ts`

- Экспорт настроенного экземпляра Axios
- Экспорт утилитарных функций для работы с токенами

### 2. Auth API (`src/api/auth/`)

#### `types.ts`

Все интерфейсы из примера `.kiro/specs/exampels/auth/types.md`:

- `ISteamAuthResponse` - ответ получения Steam auth URL
- `ICallbackResponse` - ответ callback авторизации с токенами
- `IUserMeData` - данные пользователя
- `IUserInfoResponse` - ответ /api/auth/me
- `IRefreshTokenResponse` - ответ обновления токена
- `ILogoutResponse` - ответ выхода из системы

#### `model.ts`

Вспомогательные функции:

- `saveTokensToStorage(tokens)` - сохранение токенов в localStorage
- `getTokensFromStorage()` - получение токенов из localStorage
- `clearTokensFromStorage()` - очистка токенов
- `isTokenExpired(token)` - проверка срока действия токена

#### `index.ts`

API методы с комментариями на русском:

```typescript
// Получить URL для авторизации через Steam
export const getSteamAuthUrl = async (): Promise<ISteamAuthResponse>

// Обработать callback от Steam и получить токены
export const handleSteamCallback = async (params: URLSearchParams): Promise<ICallbackResponse>

// Обновить access token используя refresh token
export const refreshToken = async (): Promise<IRefreshTokenResponse>

// Выйти из системы
export const logout = async (): Promise<ILogoutResponse>

// Получить информацию о текущем пользователе
export const getMe = async (): Promise<IUserInfoResponse>
```

### 3. Users API (`src/api/users/`)

#### `types.ts`

Интерфейсы на основе swagger документации:

- `IInventoryItem` - предмет без цены
- `IInventoryItemWithPrice` - предмет с ценой и провайдерами (steam, buff, csgofloat)
- `IInventoryResponse` - ответ инвентаря без цен
- `IInventoryWithPricesResponse` - ответ инвентаря с ценами и `totalValue`, `priceStats`
- `IInventoryByTradeUrlRequest` - запрос по trade URL
- `IUserTransaction` - транзакция с типами из скриншотов (deposit, withdrawal, referral_reward, promo_bonus, order_payout, purchase, rollback)
- `ITransactionFilters` - фильтры с полями из swagger (type, status, method, currency, fromDate, toDate, etc.)
- `ITransactionsResponse` - ответ списка транзакций с пагинацией

#### `model.ts`

Утилитарные функции:

- `buildTransactionFilters(filters)` - построение query параметров для фильтрации
- `formatInventoryItems(items)` - форматирование предметов инвентаря
- `calculateTotalValue(items)` - подсчет общей стоимости

#### `index.ts`

API методы:

```typescript
// Получить инвентарь пользователя без цен по Steam ID
export const getInventory = async (steamId: string, gameId: number): Promise<IInventoryResponse>

// Получить инвентарь по trade URL без цен
export const getInventoryByTradeUrl = async (data: IInventoryByTradeUrlRequest): Promise<IInventoryResponse>

// Получить инвентарь с ценами по Steam ID
export const getInventoryWithPrices = async (steamId: string, gameId: number): Promise<IInventoryWithPricesResponse>

// Получить инвентарь по trade URL с ценами
export const getInventoryByTradeUrlWithPrices = async (data: IInventoryByTradeUrlRequest): Promise<IInventoryWithPricesResponse>

// Получить транзакции пользователя с фильтрацией
export const getTransactions = async (steamId: string, filters?: ITransactionFilters): Promise<ITransactionsResponse>
```

### 4. Orders API (`src/api/orders/`)

#### `types.ts`

Интерфейсы на основе swagger:

- `ICreateOrderRequest` - данные для создания заказа
- `IOrder` - полная модель заказа со всеми полями из примера
- `IOrdersResponse` - ответ списка заказов с `data[]` и `total`
- `IOrderFilters` - фильтры для поиска заказов (orderNumber, orderId, steamId, paymentMethod, status, etc.)
- `IWithdrawOrderRequest` - запрос отзыва заказа с причиной

Статусы заказов: `created`, `received`, `declined`, `withdrawn`, `stopped`, `paid`
Методы оплаты: `sbp`, `card_ru`, `card_visa`, `card_mastercard`, `sepa`, `paypal`, `usdt_trc20`, `usdt_erc20`, `usdt_bsc`, `btc`, `eth`, `ton`, `bnb`, `sol`, `qiwi`, `yandex_money`

#### `model.ts`

Утилитарные функции:

- `buildOrderFilters(filters)` - построение query параметров
- `formatOrderData(order)` - форматирование данных заказа
- `validateOrderData(data)` - валидация данных перед отправкой

#### `index.ts`

API методы:

```typescript
// Создать новый заказ
export const createOrder = async (data: ICreateOrderRequest): Promise<IOrder>

// Получить мои заказы с фильтрацией
export const getMyOrders = async (filters?: IOrderFilters): Promise<IOrdersResponse>

// Получить заказ по номеру (человекочитаемый ID)
export const getOrderByNumber = async (orderNumber: number): Promise<IOrder>

// Получить заказ по системному ID
export const getOrderById = async (orderId: string): Promise<IOrder>

// Получить заказ по MongoDB ID
export const getOrderByMongoId = async (id: string): Promise<IOrder>

// Отозвать заказ
export const withdrawOrder = async (id: string, reason: string): Promise<IOrder>
```

## Модели данных

### Токены

```typescript
interface ITokens {
  accessToken: string
  refreshToken: string
  expiration: number
  tokenType: string
}
```

### Предмет инвентаря с ценами

```typescript
interface IInventoryItemWithPrice {
  assetid: string
  classid: string
  instanceid: string
  market_name: string
  market_hash_name: string
  name: string
  type: string
  rarity: string
  exterior: string
  image: string
  tradable: boolean
  marketable: boolean
  prices: {
    avgPrice: number
    steamPrice: number
    providers: {
      steam: { price: number }
      buff: { price: number }
      csgofloat: { price: number }
    }
    lastUpdated: string
    available: boolean
  }
  amount: number
}
```

### Заказ

```typescript
interface IOrder {
  id: string
  orderNumber: number
  orderId: string
  steamId: string
  userLogin: string
  itemIds: string[]
  itemNames: string[]
  botName: string
  botSteamId: string
  paymentMethod: string
  paymentData: string
  payoutAmount: number
  amountBeforeCommission: number
  commissionAmount: number
  commissionRate: number
  status: string
  statusChangeReason: string
  tradeId: number
  tradeUrl: string
  steamTradeUrl: string
  telegramUsername: string
  telegramUrl: string
  createdAt: string
  updatedAt: string
  receivedAt?: string
  paidAt?: string
  declinedAt?: string
  withdrawnAt?: string
  stoppedAt?: string
  notes: string
  isCompleted: boolean
}
```

## Обработка ошибок

### Axios Interceptors

1. **401 Unauthorized**: Автоматическая попытка обновления токена
2. **403 Forbidden**: Перенаправление на страницу авторизации
3. **Network Errors**: Показ уведомления о проблемах с сетью
4. **Server Errors (5xx)**: Логирование и показ общего сообщения об ошибке

### Error Types

```typescript
interface IApiError {
  success: false
  message: string
  timestamp: string
  requestId: string
  statusCode: number
}
```

## Стратегия тестирования

Поскольку автоматические тесты не требуются, тестирование будет проводиться:

1. **Линтинг** через ESLint для проверки качества кода

## Страницы авторизации

### `/auth` - Страница входа

- Кнопка "Войти через Steam" с официальным дизайном Steam
- Проверка существующих токенов при загрузке
- Перенаправление авторизованных пользователей
- Обработка ошибок авторизации

### `/auth/callback` - Обработка callback

- Индикатор загрузки во время обработки
- Валидация параметров OpenID от Steam
- Сохранение токенов в localStorage
- Перенаправление после успешной авторизации
- Обработка ошибок и перенаправление на `/auth`

### Компоненты страниц

- Использование `'use client'` для клиентских компонентов
- `Suspense` для обработки асинхронной загрузки
- Интеграция с `useRouter` и `useSearchParams` из Next.js
- Стили в `.module.scss` файлах

## Безопасность

### Управление токенами

- Хранение в `localStorage` (access и refresh токены)
- Автоматическая очистка при выходе
- Проверка срока действия перед каждым запросом
- Безопасная передача через Authorization header

### Валидация

- Проверка всех входящих данных от API
- Валидация параметров Steam OpenID
- Санитизация пользовательского ввода
- Обработка некорректных ответов сервера
