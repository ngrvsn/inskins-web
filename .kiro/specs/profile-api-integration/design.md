# Дизайн интеграции API в компоненты профиля

## Обзор

Данный дизайн описывает архитектуру интеграции реальных данных из API в компоненты профиля пользователя. Основная цель - заменить моковые данные на реальные данные из существующих API эндпоинтов, обеспечив при этом хорошую производительность и пользовательский опыт.

## Архитектура

### Общая схема интеграции

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │    │      Hooks       │    │   API Layer     │
│                 │    │                  │    │                 │
│ Header          │◄──►│ useAuth          │◄──►│ auth/model      │
│ ProfilePage     │    │ useProfile       │    │ users/model     │
│ TransactionsTab │    │ useTransactions  │    │ orders/model    │
│ ProfileTabs     │    │ useOrders        │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                ┌───────▼───────┐
                                                │  API Config   │
                                                │               │
                                                │ axios.ts      │
                                                │ interceptors  │
                                                │ auth refresh  │
                                                └───────────────┘
```

### Слои архитектуры

1. **API Config Layer** - конфигурация axios, интерцепторы, обработка токенов

   - `src/api/config/axios.ts` - базовая конфигурация api и privateApi
   - `src/api/config/interceptors.ts` - автоматическое обновление токенов
   - `src/constants/api.ts` - базовый URL API

2. **API Layer** - существующие API методы с готовой структурой

   - `src/api/auth/` - авторизация, получение токенов, auth/me
   - `src/api/users/` - данные пользователя, транзакции, инвентарь
   - `src/api/orders/` - заказы пользователя, создание и управление

3. **Hooks Layer** - кастомные хуки для управления состоянием данных
4. **Components Layer** - React компоненты, использующие данные из хуков

### Существующая API структура

#### Auth API (`src/api/auth/`)

- `getSteamAuthUrl()` - получение URL для авторизации Steam
- `handleSteamCallback()` - обработка callback от Steam
- `getMe()` - получение базовой информации о пользователе
- `refreshToken()` - обновление access токена
- `logout()` - выход из системы
- Автоматическое управление токенами в localStorage

#### Users API (`src/api/users/`)

- `getMe()` - полная информация о пользователе (профиль)
- `getInventory()` - инвентарь пользователя без цен
- `getInventoryWithPrices()` - инвентарь с ценами
- `getTransactions()` - транзакции пользователя с фильтрацией
- Поддержка фильтрации по типу, статусу, датам

#### Orders API (`src/api/orders/`)

- `createOrder()` - создание заказа на продажу
- `getMyOrders()` - получение заказов пользователя
- `getOrderById()` - получение заказа по ID
- `withdrawOrder()` - отзыв заказа
- Поддержка фильтрации и пагинации

#### API Configuration

- **Базовый URL**: `https://back.inskins.in` (настраивается через env)
- **Два экземпляра axios**:
  - `api` - для публичных запросов (авторизация)
  - `privateApi` - для авторизованных запросов (автоматически добавляет Bearer токен)
- **Автоматическое обновление токенов** через interceptors
- **Обработка ошибок 401/403** с автоматическим refresh или logout

## Компоненты и интерфейсы

### 1. Использование существующего useAuth хука

Текущий `useAuth` хук уже работает корректно и НЕ требует изменений. Он обеспечивает:

- Авторизацию через Steam
- Управление токенами
- Базовую информацию о пользователе

Для получения полных данных профиля создаем отдельные хуки, которые будут использовать `users/me` API.

### 2. Новый хук useProfile

Создается новый хук для управления полными данными профиля через `users/me`:

```typescript
interface IUseProfile {
  profileData: IUserMeData | null
  isLoading: boolean
  error: string | null
  refreshProfile: () => Promise<void>
}
```

**Интеграция с API:**

- Использование `getMe()` из `src/api/users/model.ts`
- Возврат данных в формате `IUserMeResponse`
- Кеширование данных профиля
- Автоматическая загрузка при монтировании компонента

### 3. Обновленный хук useOrders (вместо useTransactions)

Хук для управления заказами пользователя через `orders/getMyOrders()` - теперь это основной источник данных для истории операций:

```typescript
interface IUseOrders {
  orders: IOrder[]
  isLoading: boolean
  error: string | null
  filters: IOrderFilters
  setFilters: (filters: IOrderFilters) => void
  refreshOrders: () => Promise<void>
  searchByItemName: (itemName: string) => void
  searchByOrderNumber: (orderNumber: number) => void
}
```

**Интеграция с API:**

- Использование `getMyOrders(filters)` из `src/api/orders/model.ts`
- Передача steamId из useAuth для фильтрации заказов пользователя
- Поддержка поиска по `itemName` и `orderNumber`
- Автоматическая пагинация через `buildOrderFilters()`
- Маппинг `IOrder[]` в формат компонентов профиля

### 4. Новый хук useOrders

Хук для управления заказами пользователя через `orders/getMyOrders()`:

```typescript
interface IUseOrders {
  orders: IOrder[]
  isLoading: boolean
  error: string | null
  filters: IOrderFilters
  setFilters: (filters: IOrderFilters) => void
  refreshOrders: () => Promise<void>
  getOrderById: (id: string) => Promise<IOrder | null>
}
```

**Интеграция с API:**

- Использование `getMyOrders(filters)` из `src/api/orders/model.ts`
- Поддержка всех фильтров из `IOrderFilters`
- Использование `buildOrderFilters()` для построения query параметров
- Интеграция с `getOrderById()`, `getOrderByNumber()` для детальной информации
- Поддержка `withdrawOrder()` для отзыва заказов

## Модели данных

### Маппинг данных пользователя

Утилита для преобразования `IUserMeData` в `IAuthUser`:

```typescript
const mapUserMeToAuthUser = (userData: IUserMeData): IAuthUser => {
  return {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    avatar: userData.avatar,
    steamTradeUrl: userData.steamTradeUrl || '',
    balance: userData.balance,
    currency: userData.currency,
    language: userData.language,
    steamId: userData.steamId,
    role: userData.role,
    status: userData.status,
    currencySecondary: '$' // или из настроек
  }
}
```

### Маппинг данных заказов в транзакции

Создается утилита для преобразования заказов в формат транзакций профиля:

```typescript
const mapOrderToTransaction = (order: IOrder): IProfileTransaction => {
  return {
    id: order.orderId,
    orderNumber: order.orderNumber,
    type: 'sale',
    date: new Date(order.createdAt),
    status: mapOrderStatus(order.status),
    amount: order.payoutAmount,
    currency: 'RUB',
    paymentSystem: mapOrderPaymentMethod(order.paymentMethod),
    destination: order.paymentData,
    balanceChange: order.payoutAmount,
    skins: order.itemNames,
    statusChangeReason: order.statusChangeReason
  }
}

// Маппинг статусов заказов в статусы транзакций
const mapOrderStatus = (
  orderStatus: TOrderStatus
): TTransactionStatusProfile => {
  const mapping = {
    created: 'pending',
    received: 'processing',
    paid: 'completed',
    declined: 'cancelled',
    withdrawn: 'cancelled',
    stopped: 'cancelled'
  }
  return mapping[orderStatus] || 'pending'
}
```

### Маппинг данных заказов

Утилита для преобразования заказов в транзакции профиля:

```typescript
const mapOrderToTransaction = (order: IOrder): IProfileTransaction => {
  return {
    id: order.orderId,
    type: 'sale',
    date: new Date(order.createdAt),
    status: mapOrderStatus(order.status),
    amount: order.payoutAmount,
    currency: 'RUB', // из настроек пользователя
    paymentSystem: mapOrderPaymentMethod(order.paymentMethod),
    destination: getPaymentDestination(order.paymentMethod),
    balanceChange: order.payoutAmount,
    skins: mapOrderItems(order.itemNames)
  }
}

// Маппинг статусов заказов в статусы транзакций
const mapOrderStatus = (
  orderStatus: TOrderStatus
): TTransactionStatusProfile => {
  const mapping = {
    created: 'pending',
    received: 'pending',
    paid: 'completed',
    declined: 'cancelled',
    withdrawn: 'cancelled',
    stopped: 'cancelled'
  }
  return mapping[orderStatus] || 'pending'
}

// Маппинг методов оплаты заказов
const mapOrderPaymentMethod = (method: TOrderPaymentMethod): string => {
  const mapping = {
    sbp: 'СБП',
    card_ru: 'Банковская карта',
    qiwi: 'Qiwi',
    yandex_money: 'ЮMoney',
    usdt_trc20: 'USDT TRC20'
    // ... другие методы
  }
  return mapping[method] || method
}
```

## Обработка ошибок

### Стратегия обработки ошибок

1. **Сетевые ошибки** - показ уведомления с возможностью повтора
2. **Ошибки авторизации (401)** - автоматический refresh токена через interceptors
3. **Ошибки доступа (403)** - показ сообщения о недостаточных правах
4. **Ошибки валидации** - показ конкретных сообщений об ошибках
5. **Таймауты** - показ индикатора загрузки с возможностью отмены

### Интеграция с существующими interceptors

Используется готовая система обработки ошибок из `src/api/config/interceptors.ts`:

- Автоматическое обновление токенов при 401 ошибке
- Очередь запросов во время refresh токена
- Автоматический logout при невозможности обновить токен
- Редирект на `/auth` при критических ошибках авторизации

### Обработка ошибок в компонентах

Используем константные экспорты для обработки ошибок:

```typescript
// Утилиты для обработки ошибок (константные экспорты)
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Ошибка сети'
  }
  return 'Неизвестная ошибка'
}

export const showErrorNotification = (message: string): void => {
  // Показ уведомления об ошибке
}
```

## Стратегия тестирования

### Подходы к тестированию

1. **Ручное тестирование** - основной метод проверки функциональности
2. **Тестирование в браузере** - проверка интеграции с реальными API
3. **Проверка состояний загрузки** - тестирование UX при различных сценариях

### Сценарии тестирования

1. **Успешная загрузка данных** - проверка отображения реальных данных
2. **Ошибки сети** - проверка обработки сетевых проблем
3. **Пустые данные** - проверка отображения при отсутствии данных
4. **Обновление данных** - проверка рефреша и кеширования

## Производительность

### Оптимизации

1. **Кеширование данных** - сохранение данных между рендерами
2. **Ленивая загрузка** - загрузка данных по требованию
3. **Дебаунсинг поиска** - оптимизация фильтрации транзакций
4. **Мемоизация** - кеширование вычислений в компонентах

### Стратегия кеширования

```typescript
interface ICacheStrategy {
  // Время жизни кеша для разных типов данных
  userProfile: 5 * 60 * 1000 // 5 минут
  transactions: 2 * 60 * 1000 // 2 минуты
  orders: 1 * 60 * 1000 // 1 минута
}
```

## Безопасность

### Защита данных

1. **Валидация токенов** - проверка актуальности авторизации
2. **Санитизация данных** - очистка данных от потенциально опасного контента
3. **Ограничение доступа** - проверка прав доступа к данным
4. **Логирование ошибок** - отслеживание проблем безопасности

### Обработка токенов

```typescript
const handleTokenExpiration = async () => {
  try {
    await refreshToken()
    // Повторить запрос
  } catch (error) {
    // Принудительный logout
    forceLogout()
  }
}
```

## Миграция данных

### Этапы миграции

1. **Этап 1** - Создание хуков для профиля, транзакций и заказов (НЕ трогаем useAuth - он уже работает)
2. **Этап 2** - Обновление компонентов профиля для использования реальных данных
3. **Этап 3** - Обновление хедера для отображения данных из users/me
4. **Этап 4** - Интеграция транзакций и заказов в ProfileTabs
5. **Этап 5** - Тестирование и оптимизация

### Обратная совместимость

- Сохранение существующих интерфейсов компонентов
- Постепенная замена моковых данных на реальные
- Возможность отката к моковым данным при ошибках API
