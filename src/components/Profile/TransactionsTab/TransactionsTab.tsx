'use client'

import { useState, useMemo, useEffect } from 'react'
import { SearchInput } from '@/components/ui'
import { TransactionRow } from '../TransactionRow/TransactionRow'
import { useOrders } from '@/hooks/useOrders'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './TransactionsTab.module.scss'

interface ITransactionsTabProps {
  // Пока без пропсов, добавим позже при интеграции с данными
}

// Простые фильтры для поиска заказов
interface ISimpleOrderFilters {
  orderNumber: string
  itemName: string
}

export const TransactionsTab = ({}: ITransactionsTabProps) => {
  // Используем хук useOrders для получения данных заказов
  const { orders, isLoading, error, searchByOrderNumber, searchByItemName } =
    useOrders()

  const [filters, setFilters] = useState<ISimpleOrderFilters>({
    orderNumber: '',
    itemName: ''
  })

  // Применяем дебаунс к значениям поиска
  const debouncedOrderNumber = useDebounce(filters.orderNumber, 500)
  const debouncedItemName = useDebounce(filters.itemName, 300)

  // Выполняем поиск только после дебаунса
  useEffect(() => {
    if (debouncedOrderNumber.trim()) {
      const orderNum = parseInt(debouncedOrderNumber.trim())
      if (!isNaN(orderNum)) {
        searchByOrderNumber(orderNum)
      }
    }
  }, [debouncedOrderNumber, searchByOrderNumber])

  useEffect(() => {
    if (debouncedItemName.trim()) {
      searchByItemName(debouncedItemName.trim())
    }
  }, [debouncedItemName, searchByItemName])

  const handleOrderNumberChange = (value: string) => {
    setFilters((prev) => ({ ...prev, orderNumber: value }))
  }

  const handleItemNameChange = (value: string) => {
    setFilters((prev) => ({ ...prev, itemName: value }))
  }

  // Локальная фильтрация заказов для отображения
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesOrderNumber = filters.orderNumber
        ? order.orderNumber.toString().includes(filters.orderNumber)
        : true

      const matchesItemName = filters.itemName
        ? order.itemNames.some((itemName) =>
            itemName.toLowerCase().includes(filters.itemName.toLowerCase())
          )
        : true

      return matchesOrderNumber && matchesItemName
    })
  }, [orders, filters])

  // Показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className={styles.transactionsTab}>
        <div className={styles.loadingState}>Загрузка заказов...</div>
      </div>
    )
  }

  // Показываем ошибку
  if (error) {
    return (
      <div className={styles.transactionsTab}>
        <div className={styles.errorState}>
          Ошибка загрузки заказов: {error}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.transactionsTab}>
      {/* Поля поиска */}
      <div className={styles.searchFilters}>
        <SearchInput
          value={filters.orderNumber}
          onChange={handleOrderNumberChange}
          placeholder='Номер заказа'
          className={styles.searchField}
        />
        <SearchInput
          value={filters.itemName}
          onChange={handleItemNameChange}
          placeholder='Название предмета'
          className={styles.searchField}
        />
      </div>

      {/* Таблица заказов */}
      <div className={styles.transactionsTable}>
        {/* Заголовки таблицы */}
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>ТИП/ДАТА</div>
          <div className={styles.headerCell}>НОМЕР ЗАКАЗА</div>
          <div className={styles.headerCell}>СТАТУС</div>
          <div className={styles.headerCell}>СУММА</div>
          <div className={styles.headerCell}>ПЛАТЕЖ.СИСТЕМА</div>
          <div className={styles.headerCell}>КУДА</div>
          <div className={styles.headerCell}>БАЛАНС</div>
        </div>

        {/* Тело таблицы */}
        <div className={styles.tableBody}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TransactionRow key={order.id} order={order} />
            ))
          ) : (
            <div className={styles.emptyState}>
              {filters.orderNumber || filters.itemName
                ? 'Заказы по заданным фильтрам не найдены'
                : 'Заказы не найдены'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
