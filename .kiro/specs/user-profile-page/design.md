# Дизайн страницы профиля пользователя

## Обзор

Страница профиля пользователя представляет собой персональный кабинет с информацией об аккаунте, настройками и историей транзакций. Дизайн следует общей стилистике приложения с темной цветовой схемой и зелеными акцентами.

## Архитектура

### Структура страницы

```
/profile
├── Breadcrumbs (Главная / Личный кабинет)
├── PageTitle ("Личный кабинет")
├── ProfileInfoBlock
│   ├── UserAvatar (слева)
│   ├── UserInfo (центр)
│   │   ├── Username
│   │   ├── Email
│   │   └── SteamLinkInput
│   └── Settings (справа)
│       ├── LanguageSelector
│       └── CurrencySelector
└── ProfileTabs
    ├── TransactionsTab
    │   ├── SearchFilters
    │   └── TransactionsTable
    └── ReferralTab (заглушка)
```

### Маршрутизация

- **URL**: `/profile`
- **Защита**: Требует авторизации
- **Редирект**: Неавторизованные пользователи перенаправляются на главную

## Компоненты и интерфейсы

### ProfilePage (src/app/profile/page.tsx)

Основная страница профиля с проверкой авторизации.

```typescript
interface IProfilePageProps {}

const ProfilePage: React.FC<IProfilePageProps>
```

### ProfileInfoBlock (src/components/Profile/ProfileInfoBlock/)

Информационный блок с данными пользователя и настройками.

```typescript
interface IProfileInfoBlockProps {
  user: IUser
  onSteamLinkChange: (link: string) => void
  onLanguageChange: (language: string) => void
  onCurrencyChange: (currency: string) => void
}

const ProfileInfoBlock: React.FC<IProfileInfoBlockProps>
```

**Стили:**

- Фон: черно-зеленый градиент
- Layout: Flex с justify-content: space-between
- Левая часть: аватар пользователя
- Центральная часть: информация пользователя в колонку (username, email, Steam trade URL)
- Правая часть: селекторы языка и валюты в колонку
- Отступы: 24px внутренние
- Радиус: 12px

### UserAvatar (src/components/Profile/UserAvatar/)

Компонент аватара пользователя.

```typescript
interface IUserAvatarProps {
  src: string
  alt: string
  size?: number
}

const UserAvatar: React.FC<IUserAvatarProps>
```

**Стили:**

- Размер: 80x80px
- Радиус: 50% (круглый)
- Рамка: 2px solid rgba(255, 255, 255, 0.1)

### UserInfo (src/components/Profile/UserInfo/)

Блок с информацией пользователя, расположенный правее аватара в колонку.

```typescript
interface IUserInfoProps {
  username: string
  email: string
  steamTradeUrl: string
  onSteamLinkChange: (link: string) => void
}

const UserInfo: React.FC<IUserInfoProps>
```

**Стили:**

- Layout: Flex column
- Gap: 16px между элементами
- Цвет текста: #FFF
- Порядок элементов сверху вниз: Username, Email, SteamLinkInput

### LanguageSelector (src/components/ui/LanguageSelector/)

Селектор языка (выносим из Footer в отдельный UI компонент для переиспользования).

```typescript
interface ILanguage {
  code: string
  name: string
  flag: string
}

interface ILanguageSelectorProps {
  selectedLanguage?: string
  onLanguageChange?: (language: string) => void
}

const LanguageSelector: React.FC<ILanguageSelectorProps>
```

**Стили:**

- Аналогично CurrencySelector
- Кнопка с флагом и названием языка
- Выпадающий список с доступными языками

### ProfileTabs (src/components/Profile/ProfileTabs/)

Компонент табов профиля.

```typescript
interface IProfileTabsProps {
  activeTab: 'transactions' | 'referral'
  onTabChange: (tab: 'transactions' | 'referral') => void
}

const ProfileTabs: React.FC<IProfileTabsProps>
```

**Стили:**

- Фон активного таба: #49AA19
- Фон неактивного: transparent
- Подчеркивание: 2px solid #49AA19

### TransactionsTab (src/components/Profile/TransactionsTab/)

Таб с транзакциями пользователя.

```typescript
interface ITransactionsTabProps {
  transactions: ITransaction[]
  onSearch: (filters: ITransactionFilters) => void
}

const TransactionsTab: React.FC<ITransactionsTabProps>
```

### TransactionFilters (src/components/Profile/TransactionFilters/)

Фильтры для поиска транзакций.

```typescript
interface ITransactionFilters {
  transactionId: string
  skinName: string
}

interface ITransactionFiltersProps {
  filters: ITransactionFilters
  onFiltersChange: (filters: ITransactionFilters) => void
}

const TransactionFilters: React.FC<ITransactionFiltersProps>
```

### TransactionsTable (src/components/Profile/TransactionsTable/)

Таблица с транзакциями.

```typescript
interface ITransactionsTableProps {
  transactions: ITransaction[]
  expandedRows: string[]
  onRowToggle: (transactionId: string) => void
}

const TransactionsTable: React.FC<ITransactionsTableProps>
```

**Стили заголовков:**

- Фон: rgba(36, 36, 41, 0.60)
- Высота: 48px
- Цвет текста: rgba(255, 255, 255, 0.7)
- Размер шрифта: 12px
- Вес: 500

### TransactionRow (src/components/Profile/TransactionRow/)

Строка транзакции с возможностью раскрытия.

```typescript
interface ITransactionRowProps {
  transaction: ITransaction
  isExpanded: boolean
  onToggle: () => void
}

const TransactionRow: React.FC<ITransactionRowProps>
```

### TransactionDetails (src/components/Profile/TransactionDetails/)

Развернутые детали транзакции.

```typescript
interface ITransactionDetailsProps {
  transaction: ITransaction
}

const TransactionDetails: React.FC<ITransactionDetailsProps>
```

**Стили блоков деталей:**

- Фон: rgba(36, 36, 41, 0.60)
- Отступы: 16px
- Радиус: 8px
- Gap: 12px между блоками

### ReferralTab (src/components/Profile/ReferralTab/)

Заглушка для реферальной программы.

```typescript
interface IReferralTabProps {}

const ReferralTab: React.FC<IReferralTabProps>
```

## Модели данных

### IUser

```typescript
interface IUser {
  id: string
  username: string
  email: string
  avatar: string
  steamTradeUrl?: string
  balance: number
  currency: string
  language: string
}
```

### ITransaction

```typescript
interface ITransaction {
  id: string
  type: 'sale' | 'purchase' | 'deposit' | 'withdrawal'
  date: Date
  status: 'completed' | 'cancelled' | 'pending'
  amount: number
  currency: string
  paymentSystem: string
  destination: string
  balanceChange: number
  skins?: ISkinTransaction[]
}
```

### ISkinTransaction

```typescript
interface ISkinTransaction {
  id: string
  name: string
  game: string
  price: number
  image: string
}
```

### ITransactionFilters

```typescript
interface ITransactionFilters {
  transactionId: string
  skinName: string
}
```

## Обработка ошибок

### Авторизация

- Просто мок по клику на Личный кабинет считай авторизован

### Загрузка данных

- Скелетоны для таблицы транзакций
- Обработка ошибок загрузки
- Повторные попытки загрузки

## Стратегия тестирования

- Не писать автоматические тесты, пользователь тестирует функционал самостоятельно
- Фокус на написании рабочего кода
