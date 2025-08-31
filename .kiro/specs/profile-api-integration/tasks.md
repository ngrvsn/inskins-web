# План задач интеграции API в компоненты профиля

- [x] 1. Создать хук useProfile для получения данных профиля

  - Создать файл `src/hooks/useProfile.ts` с интеграцией `users/me` API
  - Реализовать загрузку, кеширование и обработку ошибок
  - Использовать `getMe()` из `src/api/users/model.ts`
  - ИГНОРИРОВАТЬ типы из `src/types` - использовать только типы из `src/api/users/types.ts`
  - _Требования: 2.1, 2.2, 2.3, 2.4_

- [x] 2. Обновить хук useOrders для использования в качестве источника транзакций

  - Обновить `src/hooks/useOrders.ts` для использования `getMyOrders()` из `src/api/orders/model.ts`
  - Добавить передачу steamId из useAuth в параметры запроса
  - Реализовать поиск по названию предмета (`itemName`) и номеру заказа (`orderNumber`)
  - Добавить маппинг заказов в формат транзакций для отображения в профиле
  - ИГНОРИРОВАТЬ типы из `src/types` - использовать только типы из `src/api/orders/types.ts`
  - _Требования: 3.1, 3.2, 3.3_

- [ ] 3. Удалить хук useTransactions (больше не используется)

  - Удалить файл `src/hooks/useTransactions.ts` так как теперь используем только orders
  - Обновить все импорты в компонентах для использования useOrders вместо useTransactions
  - Убрать все ссылки на транзакции API из `src/api/users/model.ts`
  - _Требования: 3.1, 3.2, 3.3_

- [ ] 4. Обновить типы компонентов под API данные

  - ПОЛНОСТЬЮ ИГНОРИРОВАТЬ типы из `src/types` и типы в компонентах
  - Заменить ВСЕ типы компонентов на типы из API
  - Использовать `IUserMeData` из `src/api/users/types.ts` для профиля
  - Использовать `IUserTransaction` из `src/api/users/types.ts` для транзакций
  - Использовать `IOrder` из `src/api/orders/types.ts` для заказов
  - Убрать ненужные маппинги и промежуточные типы
  - _Требования: 1.1, 3.1, 4.1_

- [x] 5. Обновить компонент Header для отображения реальных данных

  - Интегрировать useProfile хук в `src/components/Header/Header.tsx`
    Слушай а хули в хидере тогда данные не отображаются

{ "steamId": "76561198123456789", "steamLogin": "steamuser123", "steamNickname": "Pro Gamer", "steamAvatar": "https://avatars.steamstatic.com/abc123.jpg", "steamProfileUrl": "https://steamcommunity.com/id/steamuser123", "steamTradeUrl": "https://steamcommunity.com/tradeoffer/new/?partner=123456789&token=abc123", "email": "user@example.com", "isEmailVerified": false, "telegram": "@username", "language": "en", "lastLoginAt": "2024-01-15T10:30:00Z", "registeredAt": "2024-01-01T00:00:00Z", "status": "active", "role": "user", "countryCode": "US", "timezone": "America/New_York", "preferences": { "theme": "dark", "notifications": true }, "displayName": "Pro Gamer", "createdAt": "2024-01-01T00:00:00Z", "updatedAt": "2024-01-15T12:00:00Z", "balance": 1500.5, "holdBalance": 100, "currency": "RUB", "withdrawMethods": [ "sbp", "usdt_trc20" ], "totalWithdrawn": 5000, "totalDeposited": 6500.5, "promoCodesUsed": [ "FIRST100", "WELCOME" ], "referralCode": "ABC123", "referralRewardPercent": 1.5, "totalEarned": 150.25, "referralBalance": 75.5, "refereesCount": 5, "isBanned": false, "isWithdrawBlocked": false, "orderHistory": [ { "orderId": "ORDER_20240115_103000_R4ND", "items": [ { "marketName": "AK-47 | Redline (Field-Tested)", "price": 1250.5, "iconUrl": "https://community.cloudflare.steamstatic.com/economy/image/example.png", "quantity": 1 } ], "totalAmount": 1275.5, "status": "completed", "createdAt": "2024-01-15T10:00:00Z", "lastUpdatedAt": "2024-01-15T12:00:00Z" } ] }

Вот запрос /api/users/{steamId}

Там и аватар есть

А стимайди у нас есть в

/api/auth/me

{ "id": "76561198225270236", "steamId": "76561198225270236", "role": "user", "status": "active" }

НЕ ТРОГАЙ АВТОРИЗАЦИИ ХУК БЛЯДЬ
/api/auth/me

{ "id": "76561198225270236", "steamId": "76561198225270236", "role": "user", "status": "active" }

ОТСЮДА БЕРЕШЬ АЙДИШНИК И ЮЗАЕШЬ ЗАПРОС ДЛЯ ПОЛУЧЕНИЯ ФУЛЛ ПРОФИЛЯ
СУКА ВОТ ЭТО В ЮЗ ПРОФИЛЬ ПРОКИНЬ
Вот запрос /api/users/{steamId}
РЕСПОНС ВЫШЕ ЕСТЬ

- Заменить моковые данные пользователя на реальные из API
- Обновить отображение баланса, аватара и имени пользователя
- Добавить обработку состояний загрузки и ошибок
- ИГНОРИРОВАТЬ существующие типы в Header - использовать только `IUserMeData` из `src/api/users/types.ts`
- _Требования: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 6. Обновить страницу профиля для использования реальных данных

  - Интегрировать useProfile хук в `src/app/profile/page.tsx`
  - Заменить моковые данные пользователя на реальные
  - Обновить компонент ProfileInfoBlock для работы с реальными данными
  - Добавить обработку ошибок и состояний загрузки
  - ИГНОРИРОВАТЬ типы `IUser` - использовать только `IUserMeData` из `src/api/users/types.ts`
  - _Требования: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 7. Интегрировать заказы как транзакции в TransactionsTab

  - Обновить `src/components/Profile/TransactionsTab/TransactionsTab.tsx`
  - Заменить моковые данные на useOrders хук
  - Добавить поля поиска по названию предмета и номеру заказа над таблицей
  - ИГНОРИРОВАТЬ типы из `src/types/transaction.ts` - использовать только `IOrder` из `src/api/orders/types.ts`
  - Обновить компоненты для работы с реальной структурой данных заказов
  - _Требования: 3.1, 3.2, 3.3, 3.5_

- [ ] 8. Обновить компоненты транзакций для работы с заказами

  - Обновить `src/components/Profile/TransactionRow/TransactionRow.tsx` для отображения данных заказов
  - Обновить `src/components/Profile/TransactionDetails/TransactionDetails.tsx` для деталей заказов
  - Добавить отображение списка предметов из `itemNames`
  - Добавить отображение номера заказа и статуса
  - ИГНОРИРОВАТЬ все существующие типы - использовать только `IOrder` из `src/api/orders/types.ts`
  - _Требования: 4.1, 4.2, 4.3, 4.5_

- [ ] 9. Добавить обработку ошибок и индикаторы загрузки

  - Создать утилиты обработки ошибок в `src/utils/errorHandlers.ts`
  - Добавить единообразные индикаторы загрузки во все компоненты
  - Реализовать показ ошибок пользователю
  - Добавить возможность повторной загрузки данных при ошибках
  - _Требования: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 10. Оптимизировать производительность и кеширование

  - Добавить мемоизацию в хуки для предотвращения лишних рендеров
  - Реализовать кеширование данных профиля и транзакций
  - Добавить дебаунсинг для поиска и фильтрации
  - Оптимизировать запросы к API
  - _Требования: 5.3, 5.4_

- [ ] 11. Протестировать интеграцию и исправить ошибки
  - Протестировать все компоненты с реальными данными API
  - Проверить обработку различных состояний (загрузка, ошибки, пустые данные)
  - Убедиться в корректной работе фильтрации и поиска
  - Проверить производительность при больших объемах данных
  - _Требования: все требования_
