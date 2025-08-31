# Дизайн доработки страницы продажи скинов

## Обзор

Дизайн страницы продажи скинов включает в себя несколько ключевых компонентов: навигационные элементы, форму ввода ссылки Steam, панель фильтров и поиска, сетку скинов и блок оплаты. Все компоненты следуют единому стилю проекта с использованием темной цветовой схемы и зеленых акцентов.

## Архитектура

### Структура страницы

```
/sell
├── Breadcrumbs (существующий компонент)
├── PageTitle (существующий компонент)
├── SteamLinkInput (новый компонент)
├── SkinsManager (новый компонент - объединяет фильтры и сетку)
├── PaymentSidebar (новый компонент)
└── InfoSection (новый компонент)
```

### API архитектура

```
src/api/users/
├── index.ts (экспорт всех методов)
├── model.ts (API методы)
├── types.ts (типизация)
└── inventory/
    ├── by-trade-url (без цен)
    ├── by-trade-url/with-prices (с ценами)
    ├── {steamId}/inventory (без цен)
    └── {steamId}/inventory/with-prices (с ценами)
```

### Макет страницы

- Основной контейнер с максимальной шириной 1600px
- Двухколоночная структура: основной контент (левая колонка) + блок оплаты (правая колонка)
- Адаптивная сетка для карточек скинов

## Компоненты и интерфейсы

### 1. SteamLinkInput

**Назначение:** Компонент для ввода и валидации ссылки на обмен Steam с интеграцией API

**Интерфейс:**

```typescript
interface ISteamLinkInputProps {
  onLinkChange: (link: string) => void
  initialValue?: string
  withTitle?: boolean
}
```

**Особенности:**

- Использует react-hook-form для валидации
- Автоматически добавляет https:// если отсутствует
- Валидирует формат ссылки Steam Community
- Использует useDebounce хук с задержкой 500мс для API запросов
- Интегрируется с API для получения инвентаря по trade URL
- Текст "Вставьте свою ссылку на обмен:" - цвет #FFF, размер 14px, вес 400, высота строки 22px
- Слово "ссылку" выделено зеленым цветом #49AA19
- Инпут: padding 9px, gap 6px, border-radius 16px, background rgba(19, 20, 25, 0.60)
- Шрифт инпута: SF Pro Text, 14px, вес 400, высота строки 22px

### 2. SkinsManager

**Назначение:** Объединенный компонент с фильтрами, поиском и сеткой скинов

**Интерфейс:**

```typescript
interface ISkinsManagerProps {
  onSelectionChange: (selectedSkins: ISkinItem[]) => void
  steamLink?: string
}

interface ISkinItem {
  id: string
  title: string
  price: number
  image: string
  badge?: string
  status: 'available' | 'unavailable'
  game: 'csgo' | 'rust' | 'dota2'
}
```

**Внутренние подкомпоненты:**

- GameSelector - выпадающий список игр (CS:GO, Rust, Dota 2)
- SearchInput - поле поиска с иконкой поиска
- SortDropdown - сортировка по цене (дешевле/дороже)
- SelectAllCheckbox - чекбокс "Выбрать все"
- RefreshButton - кнопка обновления
- SkinsGrid - сетка карточек скинов

**Особенности:**

- Внутреннее управление состоянием фильтров и выбора
- Использует существующий компонент SkinCard
- Адаптивная сетка с gap 7px по горизонтали, 9px по вертикали
- Стили панели фильтров: padding 20px, border-radius 14px, background rgba(19, 20, 25, 0.60)
- Стили сетки: padding 12px, border-radius 16px, background rgba(19, 20, 25, 0.60)

### 3. PaymentSidebar

**Назначение:** Боковая панель с информацией о выбранных скинах и способах оплаты, включающая два состояния: выбор способа оплаты и ввод данных для выплаты

**Интерфейс:**

```typescript
interface IPaymentSidebarProps {
  selectedSkins: ISkinItem[]
  selectedPaymentMethod: string
  onPaymentMethodChange: (method: string) => void
  onProceed: () => void
  currency: string
}

interface IPaymentFormData {
  country: string
  bank: string
  cardNumber: string
  telegram: string
  email?: string
}
```

**Состояния компонента:**

1. **Выбор способа оплаты** - отображение всех доступных способов оплаты
2. **Ввод данных для выплаты** - форма с полями для ввода реквизитов

**Особенности:**

- Двухрежимный интерфейс с переключением состояний
- Повторно использует логику из BalanceModal
- Интеграция с PaymentCard компонентами
- Селектор валюты с dropdown
- Информация о Steam Trade Protection
- Валидация обязательных полей формы
- Интеграция с модальным окном предупреждения о мошенничестве

### 4. PaymentForm (подкомпонент PaymentSidebar)

**Назначение:** Форма ввода данных для выплаты

**Интерфейс:**

```typescript
interface IPaymentFormProps {
  selectedPaymentMethod: string
  onBack: () => void
  onSubmit: (data: IPaymentFormData) => void
  totalAmount: number
  currency: string
}
```

**Особенности:**

- Объединенный селектор страны и банка
- Валидация номера карты
- Валидация Telegram username
- Необязательное поле Email
- Динамическая активация кнопки отправки

### 5. FraudWarningModal

**Назначение:** Модальное окно с предупреждением о мошенничестве

**Интерфейс:**

```typescript
interface IFraudWarningModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}
```

**Особенности:**

- Информация о безопасности
- Два обязательных чекбокса
- Динамическая активация кнопки подтверждения
- Использует существующий Overlay компонент

### 6. Button (универсальный UI компонент)

**Назначение:** Универсальная кнопка для использования во всех частях приложения

**Интерфейс:**

```typescript
interface IButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'disabled'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
  className?: string
}
```

**Варианты:**

- **primary** - зеленая кнопка (#49AA19)
- **secondary** - серая кнопка
- **disabled** - неактивная кнопка (#1E1F21 с opacity 0.7)

### 4. InfoSection

**Назначение:** Информационный блок о преимуществах сервиса

**Интерфейс:**

```typescript
interface IInfoSectionProps {
  className?: string
}
```

## Модели данных

### API Models

```typescript
// Запрос инвентаря по trade URL
interface IInventoryByTradeUrlRequest {
  tradeUrl: string
}

// Запрос инвентаря по Steam ID
interface IInventoryBySteamIdRequest {
  steamId: string
  gameId: number // 730 - CS2, 570 - Dota 2, 753 - Steam, 252490 - Rust
}

// Ответ с инвентарем без цен
interface IUserInventoryResponseDto {
  steamId: string
  tradeUrl?: string
  gameId: number
  contextId: number
  items: IUserInventoryItemDto[]
  count: number
  lastUpdated: string
}

// Ответ с инвентарем с ценами
interface IUserInventoryWithPricesResponseDto
  extends IUserInventoryResponseDto {
  totalValue: number
  priceStats?: IPriceStats
}

// Предмет инвентаря
interface IUserInventoryItemDto {
  assetId: string
  classId: string
  instanceId: string
  market_name: string
  market_hash_name: string
  name: string
  type: string
  rarity: string
  exterior?: string
  image: string
  tradable: boolean
  marketable: boolean
  amount: number
}

// Предмет инвентаря с ценами
interface IUserInventoryItemWithPricesDto extends IUserInventoryItemDto {
  prices?: IPriceInfo
}

// Информация о ценах
interface IPriceInfo {
  steam?: number
  buff?: number
  market?: number
  suggested?: number
}

// Статистика цен
interface IPriceStats {
  minPrice: number
  maxPrice: number
  avgPrice: number
  totalItems: number
}

// Game IDs константы
enum EGameId {
  CS2 = 730,
  DOTA2 = 570,
  STEAM = 753,
  RUST = 252490
}
```

### Skin Model

```typescript
interface ISkinItem {
  id: string
  title: string
  price: number
  currency: string
  image: string
  badge?: string
  status: 'available' | 'unavailable'
  game: 'csgo' | 'rust' | 'dota2'
}
```

### Filter State

```typescript
interface IFilterState {
  game: string
  search: string
  sort: 'asc' | 'desc'
  selectedSkins: string[]
}
```

### Payment State

```typescript
interface IPaymentState {
  selectedMethod: string
  currency: string
  totalAmount: number
  selectedCount: number
}
```

## Обработка ошибок

### Валидация ссылки Steam

- Проверка формата URL
- Проверка домена steamcommunity.com
- Автокоррекция протокола
- Отображение ошибок под полем ввода

### Обработка состояний загрузки

- Скелетоны для карточек скинов
- Индикаторы загрузки для фильтров
- Обработка ошибок API

### Валидация выбора скинов

- Проверка доступности скинов
- Ограничения по количеству
- Валидация минимальной суммы

## Стили и CSS

### Цветовая схема

- Основной фон: #0a0b0f
- Панели: rgba(19, 20, 25, 0.60)
- Зеленый акцент: #49AA19
- Текст: #FFF
- Ошибки: стандартные цвета ошибок

### Типографика

- Шрифт: SF Pro Text
- Размеры: 14px (основной), 16px (заголовки)
- Высота строки: 22px (157.143%)

### Компоненты стилей

- Border-radius: 14px-16px для панелей
- Padding: 20px для боковых отступов
- Gap: 7px/9px для сетки скинов
- Transition: 0.2s для hover эффектов

### Адаптивность

- Мобильная версия: одноколоночный макет
- Планшет: адаптация сетки скинов
- Десктоп: полный двухколоночный макет

## Де

тальные стили компонентов

### SteamLinkInput

- Контейнер: padding 9px, gap 6px, border-radius 16px, background rgba(19, 20, 25, 0.60)
- Лейбл: color #FFF, font-size 14px, font-weight 400, line-height 22px
- Выделение "ссылку": color #49AA19
- Инпут: font-family SF Pro Text, font-size 14px, font-weight 400, line-height 22px

### SkinsManager - FilterPanel

- Контейнер: padding 20px (боковые), border-radius 14px, background rgba(19, 20, 25, 0.60)
- Элементы в ряд: выпадающий список игр, поиск, сортировка, чекбокс, кнопка обновления
- Иконки: dropdown (с поворотом), search, sort-icon, refresh

### SkinsManager - Grid

- Контейнер: padding 12px, gap 9px 7px, flex-wrap wrap, border-radius 16px, background rgba(19, 20, 25, 0.60)
- Использует существующий SkinCard компонент

### InfoSection

- Текст: color #FFF, font-family SF Pro Text, font-size 14px, font-weight 400, line-height 22px
- Содержание: "Хочешь продать скины CS2. CS:GO и Dota 2? Тогда тебе на INSKINS. Здесь ты можешь, совершенно не напрягаясь сдать свои скины в любом количестве, моментально получив реальные средства на любую платежную систему или банковскую карту. Никаких аукционов, поисков покупателя и сложных схем. Все просто: зайди через аккаунт Steam, выбери вещи КС ГО, КС2 или Дота 2 из инвентаря, которые тебе мешают и получи деньги в течение нескольких секунд. INSKINS — это самый легкий и надежный способ вывести скины в деньги."

## Стратегия тестирования

Согласно правилам проекта - НЕ пишем автоматические тесты. Пользователь тестирует функционал самостоятельно.

## Дополнительные модели данных для PaymentSidebar

### Payment State

```typescript
interface IPaymentState {
  selectedMethod: string
  currency: string
  totalAmount: number
  selectedCount: number
  mode: 'selection' | 'form'
}

interface IPaymentFormData {
  country: string
  bank: string
  cardNumber: string
  telegram: string
  email?: string
}

interface ICountryOption {
  code: string
  name: string
  flag: string
}

interface IBankOption {
  id: string
  name: string
  country: string
}
```

## Детальные стили для новых компонентов

### PaymentForm (второе состояние PaymentSidebar)

- Кнопка "Вернуться": color #FFF, font-size 14px, с иконкой стрелки влево
- Выбранный способ оплаты: крупная карточка с зеленой галочкой
- Селекторы страны/банка: объединенные в один ряд, стили как у обычных инпутов
- Инпуты: width 332px, height 50px, padding 0 20px, border-radius 14px, border 1px solid #2B2B2B, background var(--inskins-bg-panel)
- Поле Email: помечено как "(Необязательно)"
- Кнопка "ПОЛУЧИТЬ ДЕНЬГИ": неактивная - background #1E1F21, opacity 0.7

### FraudWarningModal

- Оверлей: использует существующий Overlay компонент
- Модальное окно: стандартные стили модальных окон проекта
- Заголовок "Процесс обмена": крупный шрифт
- Информационный текст: стандартный размер
- Чекбоксы: стандартные стили с зелеными галочками
- Кнопка: использует универсальный Button компонент

### Button (универсальный компонент)

- Primary: background #49AA19, color #FFF, border-radius 14px
- Disabled: background #1E1F21, opacity 0.7, color #FFF
- Hover эффекты: transition 0.2s
- Размеры: small (32px), medium (40px), large (50px) по высоте

## Утилиты для работы с датами

### Расчет сроков выплаты

```typescript
import dayjs from 'dayjs'

// Функция для расчета даты выплаты (текущая дата + 8 дней)
const calculatePayoutDate = (): string => {
  return dayjs().add(8, 'day').format('DD.MM.YYYY HH:mm')
}

// Использование в компонентах
const payoutDate = calculatePayoutDate()
const protectionText = `выплата за скины будет произведена через 8 дней (после ${payoutDate})`
```

### Интеграция в компоненты

- PaymentSidebar: использует calculatePayoutDate() для отображения актуальной даты
- PaymentForm: также использует calculatePayoutDate() для информации о выплате
- InfoBanner: может использовать для других временных уведомлений
