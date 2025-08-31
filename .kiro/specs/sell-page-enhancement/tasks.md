# План реализации доработки страницы продажи скинов

- [ ] 1. Создать API для получения инвентаря пользователя

  - Создать типы в src/api/users/types.ts для всех API запросов и ответов инвентаря
  - Добавить интерфейсы IInventoryByTradeUrlRequest, IInventoryBySteamIdRequest
  - Добавить интерфейсы IUserInventoryResponseDto, IUserInventoryWithPricesResponseDto
  - Добавить интерфейсы IUserInventoryItemDto, IUserInventoryItemWithPricesDto
  - Добавить enum EGameId с константами игр (730, 570, 753, 252490)
  - Создать методы в src/api/users/model.ts для всех 4 эндпоинтов инвентаря
  - Добавить методы getInventoryByTradeUrl, getInventoryBySteamId
  - Добавить методы getInventoryByTradeUrlWithPrices, getInventoryBySteamIdWithPrices
  - Экспортировать все новые методы в src/api/users/index.ts
  - _Требования: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

- [x] 2. Интегрировать API в компонент SteamLinkInput

  - Добавить useDebounce хук для задержки API запросов на 500мс
  - Интегрировать API вызов getInventoryByTradeUrlWithPrices при изменении ссылки
  - Добавить обработку состояний загрузки и ошибок API
  - Передавать полученные данные инвентаря в родительский компонент через onLinkChange
  - Обновить интерфейс ISteamLinkInputProps для передачи данных инвентаря
  - _Требования: 2.6, 2.7, 2.8_

- [x] 3. Обновить SkinsGrid для отображения реальных данных

  - Обновить компонент SkinsGrid для приема данных инвентаря из API
  - Добавить маппинг данных IUserInventoryItemWithPricesDto в ISkinItem
  - Заменить мок данные на реальные данные из API
  - Добавить обработку состояний загрузки инвентаря
  - Добавить обработку пустого инвентаря и ошибок загрузки
  - _Требования: 2.8, 4.1, 4.2_

- [ ] 4. Добавить динамический расчет дат выплаты

  - Создать утилитную функцию calculatePayoutDate() с использованием dayjs
  - Интегрировать функцию в PaymentSidebar для отображения актуальной даты
  - Интегрировать функцию в PaymentForm для информации о выплате
  - Обновить все места с информацией о Steam Trade Protection
  - Заменить статичную дату "5.08.2025 14:00" на динамически рассчитанную
  - _Требования: 10.1, 10.2, 10.3, 10.4_

- [x] 5. Рефакторинг компонентов с InfoBanner

  - Заменить верстку информации о Steam Trade Protection в PaymentSidebar на InfoBanner
  - Заменить верстку информации о Steam Trade Protection в PaymentForm на InfoBanner
  - Обновить стили компонентов после интеграции InfoBanner
  - Убрать дублированную верстку информационных блоков
  - _Требования: 5.6, 7.3_

- [-] 6. Убрать мок данные из #Sell

  Заменить данные карточек товаров на идущие с запроса. Если ссылка не вставлена, выводить по центру серого прямоугольника бэка грида текст типа вставьте ссылку

  -
