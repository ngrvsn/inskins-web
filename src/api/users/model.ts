import type {
  ITransactionFilters,
  IInventoryItem,
  IInventoryItemWithPrice
} from './types'

// Построение query параметров для фильтрации транзакций
export const buildTransactionFilters = (filters?: ITransactionFilters): URLSearchParams => {
  const params = new URLSearchParams()

  if (!filters) return params

  // Добавляем параметры только если они определены
  if (filters.userId) params.append('userId', filters.userId)
  if (filters.type) params.append('type', filters.type)
  if (filters.status) params.append('status', filters.status)
  if (filters.method) params.append('method', filters.method)
  if (filters.currency) params.append('currency', filters.currency)
  if (filters.relatedOrderId) params.append('relatedOrderId', filters.relatedOrderId)
  if (filters.fromDate) params.append('fromDate', filters.fromDate)
  if (filters.toDate) params.append('toDate', filters.toDate)
  if (filters.sortBy) params.append('sortBy', filters.sortBy)
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)

  return params
}

// Форматирование предметов инвентаря для отображения
export const formatInventoryItems = (items: IInventoryItem[]): IInventoryItem[] => {
  return items.map(item => ({
    ...item,
    // Обрезаем длинные названия для UI
    name: item.name.length > 50 ? `${item.name.substring(0, 47)}...` : item.name,
    market_name: item.market_name.length > 50
      ? `${item.market_name.substring(0, 47)}...`
      : item.market_name,
    // Нормализуем URL изображения
    image: item.image.startsWith('http') ? item.image : `https://steamcommunity-a.akamaihd.net/economy/image/${item.image}`
  }))
}

// Подсчет общей стоимости предметов с ценами
export const calculateTotalValue = (items: IInventoryItemWithPrice[]): number => {
  return items.reduce((total, item) => {
    // Используем среднюю цену если доступна, иначе цену Steam
    const price = item.prices.available
      ? (item.prices.avgPrice || item.prices.steamPrice || 0)
      : 0

    return total + (price * (item.amount || 1))
  }, 0)
}

// Фильтрация предметов по торгуемости
export const filterTradableItems = (items: IInventoryItem[]): IInventoryItem[] => {
  return items.filter(item => item.tradable && item.marketable)
}

// Группировка предметов по редкости
export const groupItemsByRarity = (items: IInventoryItem[]): Record<string, IInventoryItem[]> => {
  return items.reduce((groups, item) => {
    const rarity = item.rarity || 'Unknown'
    if (!groups[rarity]) {
      groups[rarity] = []
    }
    groups[rarity].push(item)
    return groups
  }, {} as Record<string, IInventoryItem[]>)
}

// Сортировка предметов по цене (для предметов с ценами)
export const sortItemsByPrice = (
  items: IInventoryItemWithPrice[],
  order: 'asc' | 'desc' = 'desc'
): IInventoryItemWithPrice[] => {
  return [...items].sort((a, b) => {
    const priceA = a.prices.available ? (a.prices.avgPrice || a.prices.steamPrice || 0) : 0
    const priceB = b.prices.available ? (b.prices.avgPrice || b.prices.steamPrice || 0) : 0

    return order === 'desc' ? priceB - priceA : priceA - priceB
  })
}