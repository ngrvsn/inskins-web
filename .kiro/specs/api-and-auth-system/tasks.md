# Implementation Plan

- [ ] 1. Создать все типы и интерфейсы API

  - Создать `src/api/auth/types.ts` - скопировать 1 в 1 из `.kiro/specs/exampels/auth/types.md`
  - Создать `src/api/users/types.ts` - на основе структур из `.kiro/specs/exampels/users/swagger.md` (инвентарь, транзакции)
  - Создать `src/api/orders/types.ts` - на основе структур из `.kiro/specs/exampels/orders/swagger.md` (заказы, фильтры)
  - Добавить типы для статусов, методов оплаты и enum GameId из скриншотов
  - Использовать константные экспорты и комментарии на русском
  - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - _Примеры: `.kiro/specs/exampels/auth/types.md`, `.kiro/specs/exampels/users/swagger.md`, `.kiro/specs/exampels/orders/swagger.md`_

- [ ] 2. Настроить Axios с интерцепторами

  - Создать `src/api/config/axios.ts` с базовым экземпляром Axios (baseURL, timeout, заголовки)
  - Создать `src/api/config/interceptors.ts` с request interceptor (Authorization header) и response interceptor (обработка 401, автообновление токенов)
  - Создать `src/api/config/index.ts` с экспортом настроенного Axios и утилитарных функций
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - _Примеры: структура из скриншота `src/api/config/`_

- [ ] 3. Реализовать Auth API с моделями

  - Создать `src/api/auth/model.ts` с функциями saveTokensToStorage, getTokensFromStorage, clearTokensFromStorage, isTokenExpired
  - Создать `src/api/auth/index.ts` с методами getSteamAuthUrl, handleSteamCallback, refreshToken, logout, getMe
  - Подписать каждый запрос комментарием на русском через слеши
  - Использовать константные экспорты
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - _Примеры: структура из скриншота `src/api/auth/`, логика из `.kiro/specs/exampels/auth/auth/callback/page.md`_

- [ ] 4. Реализовать Users API с моделями

  - Создать `src/api/users/model.ts` с функциями buildTransactionFilters, formatInventoryItems, calculateTotalValue
  - Создать `src/api/users/index.ts` с методами getInventory, getInventoryByTradeUrl, getInventoryWithPrices, getInventoryByTradeUrlWithPrices, getTransactions
  - Подписать каждый запрос комментарием на русском через слеши
  - Использовать константные экспорты
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - _Примеры: эндпоинты и структуры из `.kiro/specs/exampels/users/swagger.md`_

- [ ] 5. Реализовать Orders API с моделями

  - Создать `src/api/orders/model.ts` с функциями buildOrderFilters, formatOrderData, validateOrderData
  - Создать `src/api/orders/index.ts` с методами createOrder, getMyOrders, getOrderByNumber, getOrderById, getOrderByMongoId, withdrawOrder
  - Подписать каждый запрос комментарием на русском через слеши
  - Использовать константные экспорты
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  - _Примеры: эндпоинты и структуры из `.kiro/specs/exampels/orders/swagger.md`_

- [x] 6. Создать страницу callback для Steam авторизации

  - Создать `src/app/auth/callback/page.tsx` - скопировать логику из `.kiro/specs/exampels/auth/auth/callback/page.md` и адаптировать
  - Реализовать валидацию openid.mode и openid.signed
  - Добавить индикатор загрузки, сохранение токенов в localStorage
  - Создать перенаправление после успешной авторизации и обработку ошибок
  - Использовать Suspense и 'use client' директиву
  - Создать `src/app/auth/callback/page.module.scss` со стилями для загрузки и сообщений
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  - _Примеры: `.kiro/specs/exampels/auth/auth/callback/page.md` - скопировать 1 в 1 и адаптировать_

- [ ] 7. Интегрировать систему управления токенами

  - Обновить все API методы для автоматического использования токенов
  - Добавить проверку срока действия и автообновление токенов
  - Реализовать полную очистку токенов при выходе
  - Добавить обработку ошибок авторизации с перенаправлением
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - _Примеры: логика токенов из `.kiro/specs/exampels/auth/auth/callback/page.md`_

- [x] 8. Исправить архитектуру API согласно правильной структуре

  401 - не авторизован

403 - недостаточно прав

404 - не найдено

ВОТ БЛЯДЬ КАК НАДО

ЧТО ЗА ГОВНО ТЫ ПОНАПИСАЛ В МОДЕЛЯХ ЗАКАЗОВ

// Получить заказ по человекочитаемому номеру (начиная с 1337)

export const getOrderByNumber = async (orderNumber: number): Promise<IOrder> => {

if (orderNumber < 1337) {

throw new Error('Номер заказа должен быть не менее 1337')

1337 ЭТО ПРИМЕР БЛЯДЬ БЫЛ УЕБАН СУКА

// Валидация данных заказа перед отправкой

export const validateOrderData = (data: ICreateOrderRequest): { isValid: boolean; errors: string[] } => {

const errors: string[] = []

// Проверяем обязательные строковые поля

if (!data.steamId || data.steamId.trim().length === 0) {

errors.push('Steam ID обязателен')

}

if (!data.userLogin || data.userLogin.trim().length === 0) {

errors.push('Логин пользователя обязателен')

ЭТО ТЕБЯ КТО ПРОСИЛ ДЕЛАТЬ ВЫБЛЯДОК

- [ ] 9. Проверить типизацию и исправить ошибки
  - Запустить TypeScript компилятор и ESLint
  - Исправить все ошибки типизации и предупреждения линтера
  - Проверить соответствие code style проекта
  - _Requirements: Все требования_
