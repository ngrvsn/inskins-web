# Дизайн страницы покупки скинов

## Обзор

Страница покупки скинов представляет собой каталог игровых предметов с расширенными возможностями фильтрации и поиска. Страница использует существующую архитектуру компонентов проекта и следует установленным дизайн-паттернам.

## Архитектура

### Структура страницы

```
src/app/buy/
├── page.tsx                    # Основная страница покупки
├── page.module.scss           # Стили страницы
└── components/                # Локальные компоненты страницы
    ├── FiltersPanel/          # Панель фильтров
    ├── ControlsPanel/         # Панель управления (игра, сортировка, поиск)
    ├── SkinsGrid/            # Сетка скинов с пагинацией
    └── BuyableSkinCard/      # Модифицированная карточка скина для покупки
```

### Компоненты и интерфейсы

#### 1. Основная страница (src/app/buy/page.tsx)

Главный компонент страницы, который объединяет все элементы:

```typescript
interface IBuyPageState {
  selectedGame: string
  sortOrder: 'asc' | 'desc'
  searchQuery: string
  filters: IFilters
  currentPage: number
  cartItems: ICartItem[]
}

interface IFilters {
  priceRange: { min: number; max: number }
  rarity: string[]
  collection: string[]
  phase: string[]
}

interface ICartItem {
  skinId: string
  quantity: number
}
```

#### 2. Панель управления (ControlsPanel)

Содержит селектор игры, сортировку и поиск:

```typescript
interface IControlsPanelProps {
  selectedGame: string
  onGameChange: (game: string) => void
  sortOrder: 'asc' | 'desc'
  onSortChange: (order: 'asc' | 'desc') => void
  searchQuery: string
  onSearchChange: (query: string) => void
}
```

#### 3. Панель фильтров (FiltersPanel)

Боковая панель с различными фильтрами:

```typescript
interface IFiltersPanelProps {
  filters: IFilters
  onFiltersChange: (filters: IFilters) => void
  onResetFilters: () => void
}

interface IPriceRangeProps {
  min: number
  max: number
  value: { min: number; max: number }
  onChange: (range: { min: number; max: number }) => void
}

interface ICheckboxGroupProps {
  title: string
  options: { value: string; label: string; color?: string }[]
  selected: string[]
  onChange: (selected: string[]) => void
}
```

#### 4. Модифицированная карточка скина (BuyableSkinCard)

Расширенная версия SkinCard с функционалом корзины:

```typescript
interface IBuyableSkinCardProps extends ISkinCardProps {
  skinId: string
  originalPrice?: string
  discount?: number
  isInCart: boolean
  cartQuantity: number
  onAddToCart: (skinId: string) => void
  onRemoveFromCart: (skinId: string) => void
  onQuantityChange: (skinId: string, quantity: number) => void
}
```

#### 5. Сетка скинов (SkinsGrid)

Компонент для отображения сетки скинов с пагинацией:

```typescript
interface ISkinsGridProps {
  skins: ISkin[]
  cartItems: ICartItem[]
  onCartAction: (action: 'add' | 'remove', skinId: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

interface ISkin {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  badge?: string
  game: string
  rarity: string
  collection: string
  phase?: string
}
```

## Модели данных

### Скин (ISkin)

```typescript
interface ISkin {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  badge?: string
  game: 'cs2' | 'dota2' | 'rust'
  rarity:
    | 'consumer'
    | 'industrial'
    | 'milspec'
    | 'restricted'
    | 'classified'
    | 'covert'
  collection: string
  phase?: 'phase1' | 'phase2' | 'phase3' | 'phase4'
  wear?: string
}
```

### Элемент корзины (ICartItem)

```typescript
interface ICartItem {
  skinId: string
  quantity: number
  addedAt: Date
}
```

### Фильтры (IFilters)

```typescript
interface IFilters {
  priceRange: {
    min: number
    max: number
  }
  rarity: string[]
  collection: string[]
  phase: string[]
}
```

## Детальный дизайн компонентов

### 1. Панель управления (ControlsPanel)

**Стили:**

- `border-radius: 14px`
- `background: var(--inskins-bg-panel)`
- `padding: 14px 29px`
- `gap: 34px`
- Горизонтальное расположение элементов

**Компоненты:**

- GameSelector для выбора игры
- SortDropdown для сортировки по цене
- SearchInput для поиска по названию

### 2. Панель фильтров (FiltersPanel)

**Структура:**

- Заголовок "Фильтры" (цвет: #FFF, размер: 20px, вес: 700)
- Секция "По цене" с полями ввода и слайдером
- Секция "По редкости" с цветными чекбоксами
- Секция "По коллекции" с чекбоксами
- Секция "По фазе" с чекбоксами
- Кнопка "Сбросить все фильтры"

**Цвета редкости:**

- Ширпотреб: #B0C3D9
- Промышленное: #5E98D9
- Армейское качество: #4B69FF
- Запрещенное: #8847FF
- Засекреченное: #D32CE6
- Тайное: #EB4B4B

### 3. Модифицированная карточка скина (BuyableSkinCard)

**Дополнительные элементы:**

- Отображение скидки (процент и зачеркнутая цена)
- Кнопка "В корзину" с иконкой cart
- Состояния кнопки:
  - По умолчанию: зеленая рамка, иконка корзины, текст "В корзину"
  - При наведении: полностью зеленый фон
  - В корзине: счетчик количества (x1, x2, x3...)
  - Удаление: красный крестик, текст "Убрать из корзины"

### 4. Сетка скинов (SkinsGrid)

**Параметры:**

- Отступы между карточками: 7px
- Адаптивная сетка (количество колонок зависит от ширины экрана)
- Пагинация внизу сетки

## Обработка ошибок

### Ошибки загрузки данных

- Показ заглушки при отсутствии скинов
- Индикатор загрузки при фильтрации
- Сообщение об ошибке при проблемах с сетью

### Ошибки фильтрации

- Валидация диапазона цен
- Сброс некорректных значений фильтров
- Уведомления о пустых результатах поиска

### Ошибки корзины

- Проверка доступности товара перед добавлением
- Ограничение максимального количества товара
- Уведомления об изменениях в корзине

## Стратегия тестирования

### Модульное тестирование

- Тестирование логики фильтрации
- Тестирование функций корзины
- Тестирование компонентов форм

### Интеграционное тестирование

- Тестирование взаимодействия фильтров с сеткой
- Тестирование пагинации
- Тестирование поиска и сортировки

### Пользовательское тестирование

- Тестирование удобства использования фильтров
- Тестирование процесса добавления в корзину
- Тестирование производительности при большом количестве товаров

## Производительность

### Оптимизации

- Виртуализация списка для больших каталогов
- Дебаунс для поиска и фильтрации
- Мемоизация компонентов карточек
- Ленивая загрузка изображений

### Кэширование

- Кэширование результатов поиска
- Сохранение состояния фильтров в localStorage
- Кэширование изображений скинов

## Доступность

### Клавиатурная навигация

- Поддержка Tab-навигации по всем элементам
- Горячие клавиши для основных действий
- Фокус-индикаторы для интерактивных элементов

### Семантическая разметка

- Правильные ARIA-атрибуты для фильтров
- Семантические заголовки для секций
- Альтернативный текст для изображений

### Контрастность

- Соответствие стандартам WCAG для цветовых контрастов
- Четкие визуальные индикаторы состояний
- Поддержка высококонтрастных тем
