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

### Макет страницы
- Основной контейнер с максимальной шириной 1600px
- Двухколоночная структура: основной контент (левая колонка) + блок оплаты (правая колонка)
- Адаптивная сетка для карточек скинов

## Компоненты и интерфейсы

### 1. SteamLinkInput
**Назначение:** Компонент для ввода и валидации ссылки на обмен Steam

**Интерфейс:**
```typescript
interface ISteamLinkInputProps {
  onLinkChange: (link: string) => void
  initialValue?: string
}
```

**Особенности:**
- Использует react-hook-form для валидации
- Автоматически добавляет https:// если отсутствует
- Валидирует формат ссылки Steam Community
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
**Назначение:** Боковая панель с информацией о выбранных скинах и способах оплаты

**Интерфейс:**
```typescript
interface IPaymentSidebarProps {
  selectedSkins: ISkinItem[]
  selectedPaymentMethod: string
  onPaymentMethodChange: (method: string) => void
  onProceed: () => void
  currency: string
}
```

**Особенности:**
- Повторно использует логику из BalanceModal
- Интеграция с PaymentCard компонентами
- Селектор валюты с dropdown
- Информация о Steam Trade Protection

### 4. InfoSection
**Назначение:** Информационный блок о преимуществах сервиса

**Интерфейс:**
```typescript
interface IInfoSectionProps {
  className?: string
}
```

## Модели данных

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