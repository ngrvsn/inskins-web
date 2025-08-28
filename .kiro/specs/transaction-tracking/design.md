# Дизайн системы отслеживания сделок

## Обзор

Система отслеживания сделок представляет собой набор экранов, которые отображают различные состояния процесса продажи скинов. Система интегрируется в существующую архитектуру Next.js приложения и использует установленные паттерны дизайна.

## Архитектура

### Структура маршрутизации

Система будет использовать динамический маршрут для отслеживания сделок:

- `/sell/transaction/[transactionId]` - основная страница отслеживания
- Параметр `transactionId` будет содержать ID сделки для отображения статуса

### Состояния системы

Система поддерживает следующие состояния:

1. **pending-confirmation** - Ожидание подтверждения (с таймером)
2. **pending-payout** - Ожидание выплаты (с лоадером)
3. **cancelled** - Сделка отменена
4. **completed** - Деньги переведены

## Компоненты и интерфейсы

### 1. Основная страница отслеживания

**Файл:** `src/app/sell/transaction/[transactionId]/page.tsx`

Основная страница, которая:

- Получает ID сделки из параметров маршрута
- Загружает данные о сделке с сервера
- Определяет текущее состояние и отображает соответствующий компонент
- Использует существующий layout с хедером и футером

### 2. Компонент прогресс-бара

**Файл:** `src/components/ui/TransactionProgress/TransactionProgress.tsx`

Переиспользуемый компонент для отображения прогресса сделки:

```typescript
interface ITransactionProgressProps {
  currentStep: 'confirmation' | 'payout' | 'completion'
  status: 'pending' | 'cancelled' | 'completed'
}
```

**Состояния шагов:**

- Неактивен: серый пустой кружок (20-24px), серая линия
- Текущий: зеленый кружок с точкой внутри, зеленая линия слева
- Завершен: зеленый кружок с белой галочкой, зеленая линия слева
- Отменен: красный кружок с крестом, серые линии

### 3. Информационный баннер

**Файл:** `src/components/ui/InfoBanner/InfoBanner.tsx`

Переиспользуемый компонент для Steam Trade Protection уведомлений:

```typescript
interface IInfoBannerProps {
  children: ReactNode
  variant?: 'info' | 'warning'
}
```

**Стили:**

- Зеленая иконка "i" слева (24px)
- Зеленая рамка 1px
- Градиентный фон: от полупрозрачного зеленого к прозрачному
- Скругление 14px
- Текст белый вторичный (12-14px/18-22px)

### 4. Компонент копирования номера сделки

**Файл:** `src/components/ui/TransactionNumber/TransactionNumber.tsx`

```typescript
interface ITransactionNumberProps {
  transactionId: string
  className?: string
}
```

**Функциональность:**

- Отображает номер в формате "#14757586"
- Иконка копирования справа (copy-gray.svg)
- При клике копирует номер в буфер обмена
- Показывает toast уведомление "Номер сделки скопирован"

### 5. Экран ожидания подтверждения

**Файл:** `src/components/Transaction/PendingConfirmation/PendingConfirmation.tsx`

```typescript
interface IPendingConfirmationProps {
  transactionId: string
  timeLeft: number // в секундах
  botInfo: {
    level: number
    name: string
    avatar: string
  }
  onTimeout: () => void
}
```

**Элементы:**

- Заголовок "Ожидаем подтверждения"
- Номер сделки с копированием
- Таймер обратного отсчета (зеленый, жирный)
- Информационный баннер о Steam Trade Protection
- Два блока инструкций по безопасности
- Информация о боте (уровень, имя, аватар)
- Предупреждающий баннер о 15-секундном ожидании
- Две кнопки: "ПОДТВЕРДИТЬ В БРАУЗЕРЕ" и "ПОДТВЕРДИТЬ В КЛИЕНТЕ"

### 6. Экран ожидания выплаты

**Файл:** `src/components/Transaction/PendingPayout/PendingPayout.tsx`

```typescript
interface IPendingPayoutProps {
  transactionId: string
}
```

**Элементы:**

- Заголовок "Ожидание выплаты"
- Номер сделки с копированием
- Зеленый круговой спиннер (32-40px)

### 7. Экран отмены сделки

**Файл:** `src/components/Transaction/TransactionCancelled/TransactionCancelled.tsx`

```typescript
interface ITransactionCancelledProps {
  transactionId: string
  onRetry: () => void
}
```

**Элементы:**

- Большая красная иконка с крестом (56-72px)
- Заголовок "Сделка была отменена"
- Номер сделки с копированием
- Объяснение причины отмены
- Кнопка "ПОПРОБОВАТЬ ЕЩЁ РАЗ" (тёмно-серая)

### 8. Экран завершения сделки

**Файл:** `src/components/Transaction/TransactionCompleted/TransactionCompleted.tsx`

```typescript
interface ITransactionCompletedProps {
  transactionId: string
  onCreateNew: () => void
}
```

**Элементы:**

- Заголовок "Деньги переведены"
- Номер сделки с копированием
- Информационный баннер о Steam Trade Protection
- Информация о поддержке с иконкой Telegram
- Кнопка "СОЗДАТЬ ЕЩЁ ОДНУ СДЕЛКУ" (тёмно-серая)

### 9. Обновление компонента Button

**Файл:** `src/components/ui/Button/Button.tsx`

Добавить новые варианты:

```typescript
interface IButtonProps {
  // ... существующие пропы
  variant?: 'primary' | 'secondary' | 'disabled' | 'white' | 'dark'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}
```

**Новые варианты:**

- `white` - белая заливка, чёрный текст
- `dark` - тёмно-серая заливка, белый текст

### 10. Компонент таймера

**Файл:** `src/components/ui/Timer/Timer.tsx`

```typescript
interface ITimerProps {
  initialTime: number // в секундах
  onTimeout: () => void
  className?: string
}
```

**Функциональность:**

- Обратный отсчет от заданного времени
- Формат отображения MM:SS
- Зеленый цвет (#49AA19)
- Автоматический вызов onTimeout при достижении 00:00

### 11. Компонент спиннера

**Файл:** `src/components/ui/Spinner/Spinner.tsx`

```typescript
interface ISpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'green' | 'white'
  className?: string
}
```

## Модели данных

### Интерфейс сделки

```typescript
interface ITransaction {
  id: string
  status: 'pending-confirmation' | 'pending-payout' | 'cancelled' | 'completed'
  createdAt: string
  timeLeft?: number // для состояния pending-confirmation
  botInfo?: {
    level: number
    name: string
    avatar: string
  }
  cancelReason?: string
  completedAt?: string
}
```

### Интерфейс ответа API

```typescript
interface ITransactionResponse {
  transaction: ITransaction
  success: boolean
  error?: string
}
```

## Обработка ошибок

### Состояния ошибок

1. **Сделка не найдена** - показать 404 страницу
2. **Ошибка сети** - показать уведомление с возможностью повтора
3. **Истечение сессии** - перенаправить на авторизацию

### Компонент обработки ошибок

**Файл:** `src/components/Transaction/TransactionError/TransactionError.tsx`

```typescript
interface ITransactionErrorProps {
  error: string
  onRetry: () => void
}
```

## Стратегия тестирования

### Модульные тесты

Поскольку согласно правилам проекта автоматические тесты не пишутся, тестирование будет проводиться пользователем вручную.

### Сценарии для ручного тестирования

1. **Переход между состояниями** - проверка корректного отображения каждого экрана
2. **Функциональность таймера** - проверка обратного отсчета и автоматического перехода
3. **Копирование номера сделки** - проверка работы функции копирования
4. **Адаптивность** - проверка отображения на мобильных устройствах
5. **Обработка ошибок** - проверка поведения при различных ошибках

## Интеграция с существующей системой

### Точки интеграции

1. **PaymentSidebar** - после успешной отправки формы перенаправление на страницу отслеживания
2. **API endpoints** - создание новых эндпоинтов для получения статуса сделки
3. **Навигация** - добавление ссылок на отслеживание в историю сделок

### Изменения в существующих компонентах

1. **PaymentForm** - добавить логику создания сделки и перенаправления
2. **Header** - возможно добавить ссылку на историю сделок
3. **Breadcrumbs** - поддержка навигации для страниц отслеживания

## Стилизация

### Цветовая схема

- Основной фон: #0a0b0f
- Панели: rgba(19, 20, 25, 0.60) --var-inskins-bg
- Зеленый акцент: #49AA19
- Красный для ошибок: #DC2626
- Текст: #FFF
- Вторичный текст: rgba(255, 255, 255, 0.7)

### Размеры и отступы

- Кружки прогресса: 20-24px
- Иконки: 16-24px (в зависимости от контекста)
- Скругления: 14-16px для баннеров, 8-12px для кнопок
- Отступы: 16-20px на мобильных, 20-24px на десктопе

### Адаптивность

- Не делать никаких адаптивов
