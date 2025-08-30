# Requirements Document

## Введение

Данная фича включает в себя создание системы API для взаимодействия с бэкендом, настройку Axios с интерцепторами для автоматической обработки токенов, а также реализацию страниц Steam авторизации. Система должна обеспечить полноценную работу с API авторизации, пользователей и заказов, включая автоматическое обновление токенов и обработку ошибок.

## Requirements

### Requirement 1

**User Story:** Как разработчик, я хочу иметь типизированные интерфейсы для всех API ответов, чтобы обеспечить типобезопасность при работе с данными

#### Acceptance Criteria

1. WHEN создаются типы для API THEN система SHALL содержать интерфейсы для всех ответов авторизации (ISteamAuthResponse, ICallbackResponse, IUserInfoResponse, IRefreshTokenResponse, ILogoutResponse)
2. WHEN создаются типы для пользователей THEN система SHALL содержать интерфейсы для инвентаря (IInventoryItem, IInventoryItemWithPrice, IInventoryResponse, IInventoryWithPricesResponse)
3. WHEN создаются типы для заказов THEN система SHALL содержать интерфейсы для всех операций с заказами (IOrder, ICreateOrderRequest, IOrdersResponse, IWithdrawOrderRequest)
4. WHEN создаются типы для транзакций THEN система SHALL содержать интерфейсы для фильтрации и отображения транзакций (IUserTransaction, ITransactionFilters, ITransactionsResponse)

### Requirement 2

**User Story:** Как разработчик, я хочу иметь настроенный Axios с автоматической обработкой токенов, чтобы не дублировать логику авторизации в каждом запросе

#### Acceptance Criteria

1. WHEN настраивается Axios THEN система SHALL автоматически добавлять Authorization header с Bearer token к каждому запросу
2. WHEN получается 401 ошибка THEN система SHALL автоматически попытаться обновить токен через refresh token
3. WHEN токен успешно обновляется THEN система SHALL повторить оригинальный запрос с новым токеном
4. WHEN обновление токена не удается THEN система SHALL перенаправить пользователя на страницу авторизации
5. WHEN происходит ошибка API THEN система SHALL логировать ошибку и возвращать понятное сообщение

### Requirement 3

**User Story:** Как разработчик, я хочу иметь методы для работы с API авторизации, чтобы легко интегрировать Steam авторизацию в приложение

#### Acceptance Criteria

1. WHEN вызывается getSteamAuthUrl THEN система SHALL возвращать URL для перенаправления на Steam OpenID
2. WHEN обрабатывается callback от Steam THEN система SHALL валидировать параметры OpenID и получать токены
3. WHEN вызывается refreshToken THEN система SHALL обновлять access token используя refresh token
4. WHEN вызывается logout THEN система SHALL очищать токены из localStorage и отправлять запрос на сервер
5. WHEN вызывается getMe THEN система SHALL возвращать информацию о текущем авторизованном пользователе

### Requirement 4

**User Story:** Как разработчик, я хочу иметь методы для работы с API пользователей, чтобы получать данные инвентаря и транзакций

#### Acceptance Criteria

1. WHEN вызывается getInventory THEN система SHALL возвращать инвентарь пользователя без цен по steamId и gameId
2. WHEN вызывается getInventoryByTradeUrl THEN система SHALL возвращать инвентарь по trade URL без цен
3. WHEN вызывается getInventoryWithPrices THEN система SHALL возвращать инвентарь с ценами и статистикой
4. WHEN вызывается getInventoryByTradeUrlWithPrices THEN система SHALL возвращать инвентарь по trade URL с ценами
5. WHEN вызывается getTransactions THEN система SHALL возвращать отфильтрованный список транзакций пользователя

### Requirement 5

**User Story:** Как разработчик, я хочу иметь методы для работы с API заказов, чтобы создавать и управлять заказами на продажу скинов

#### Acceptance Criteria

1. WHEN вызывается createOrder THEN система SHALL создавать новый заказ с переданными данными
2. WHEN вызывается getMyOrders THEN система SHALL возвращать список заказов текущего пользователя с возможностью фильтрации
3. WHEN вызывается getOrderByNumber THEN система SHALL возвращать заказ по человекочитаемому номеру
4. WHEN вызывается getOrderById THEN система SHALL возвращать заказ по системному ID
5. WHEN вызывается withdrawOrder THEN система SHALL отзывать заказ с указанием причины

### Requirement 6

**User Story:** Как пользователь, я хочу иметь страницу авторизации через Steam, чтобы войти в систему используя свой Steam аккаунт

#### Acceptance Criteria

1. WHEN пользователь заходит на /auth THEN система SHALL отображать страницу с кнопкой "Войти через Steam"
2. WHEN пользователь нажимает кнопку авторизации THEN система SHALL перенаправлять на Steam OpenID
3. WHEN страница загружается THEN система SHALL проверять наличие токенов и перенаправлять авторизованных пользователей
4. WHEN происходит ошибка THEN система SHALL отображать понятное сообщение об ошибке
5. WHEN авторизация успешна THEN система SHALL перенаправлять пользователя на главную страницу

### Requirement 7

**User Story:** Как пользователь, я хочу чтобы система автоматически обрабатывала ответ от Steam, чтобы завершить процесс авторизации без дополнительных действий

#### Acceptance Criteria

1. WHEN Steam перенаправляет на /auth/callback THEN система SHALL отображать индикатор загрузки
2. WHEN получены параметры от Steam THEN система SHALL валидировать openid.mode и openid.signed
3. WHEN параметры валидны THEN система SHALL отправлять запрос на бэкенд для получения токенов
4. WHEN токены получены THEN система SHALL сохранять их в localStorage
5. WHEN процесс завершен успешно THEN система SHALL показывать сообщение об успехе и перенаправлять пользователя
6. WHEN происходит ошибка THEN система SHALL показывать сообщение об ошибке и перенаправлять на страницу авторизации

### Requirement 8

**User Story:** Как разработчик, я хочу иметь централизованную систему управления токенами, чтобы обеспечить безопасность и удобство работы с авторизацией

#### Acceptance Criteria

1. WHEN токены сохраняются THEN система SHALL использовать localStorage для хранения access и refresh токенов
2. WHEN проверяется авторизация THEN система SHALL валидировать наличие и срок действия токенов
3. WHEN токен истекает THEN система SHALL автоматически обновлять его через refresh token
4. WHEN пользователь выходит THEN система SHALL полностью очищать все токены из localStorage
5. WHEN происходит ошибка авторизации THEN система SHALL очищать некорректные токены и перенаправлять на авторизацию
