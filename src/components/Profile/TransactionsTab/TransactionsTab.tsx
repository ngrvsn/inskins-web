'use client'

import { useState, useMemo } from 'react'
import { SearchInput } from '@/components/ui'
import { TransactionRow } from '../TransactionRow/TransactionRow'
import { IUserTransaction, EPaymentMethod } from '@/api/users/types'
import styles from './TransactionsTab.module.scss'

interface ITransactionsTabProps {
  // Пока без пропсов, добавим позже при интеграции с данными
}

// Простые фильтры для поиска
interface ISimpleTransactionFilters {
  transactionId: string
  description: string
}

// Моковые данные транзакций в формате API
const mockTransactions: IUserTransaction[] = [
  {
    id: 'TXN001234',
    userId: 'user1',
    steamId: '76561198000000001',
    type: 'order_payout',
    status: 'completed',
    method: EPaymentMethod.SBP,
    currency: 'RUB',
    amount: 1250.75,
    relatedOrderId: 'ORD001',
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-15T14:35:00Z',
    description: 'Выплата за продажу предметов'
  },
  {
    id: 'TXN001235',
    userId: 'user1',
    steamId: '76561198000000001',
    type: 'purchase',
    status: 'completed',
    method: EPaymentMethod.CARD,
    currency: 'RUB',
    amount: 750.0,
    createdAt: '2024-01-14T10:15:00Z',
    updatedAt: '2024-01-14T10:20:00Z',
    description: 'Покупка предметов'
  },
  {
    id: 'TXN001236',
    userId: 'user1',
    steamId: '76561198000000001',
    type: 'deposit',
    status: 'completed',
    method: EPaymentMethod.INSKINS,
    currency: 'RUB',
    amount: 2000.0,
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:50:00Z',
    description: 'Пополнение баланса'
  },
  {
    id: 'TXN001237',
    userId: 'user1',
    steamId: '76561198000000001',
    type: 'order_payout',
    status: 'cancelled',
    method: EPaymentMethod.SBP,
    currency: 'RUB',
    amount: 500.0,
    relatedOrderId: 'ORD002',
    createdAt: '2024-01-12T09:20:00Z',
    updatedAt: '2024-01-12T09:25:00Z',
    description: 'Отмененная выплата за продажу'
  },
  {
    id: 'TXN001238',
    userId: 'user1',
    steamId: '76561198000000001',
    type: 'withdrawal',
    status: 'pending',
    method: EPaymentMethod.CARD,
    currency: 'RUB',
    amount: 1500.0,
    createdAt: '2024-01-11T13:10:00Z',
    updatedAt: '2024-01-11T13:10:00Z',
    description: 'Вывод средств на карту'
  }
]

export const TransactionsTab = ({}: ITransactionsTabProps) => {
  const [filters, setFilters] = useState<ISimpleTransactionFilters>({
    transactionId: '',
    description: ''
  })

  const handleTransactionIdChange = (value: string) => {
    setFilters((prev) => ({ ...prev, transactionId: value }))
  }

  const handleDescriptionChange = (value: string) => {
    setFilters((prev) => ({ ...prev, description: value }))
  }

  // Фильтрация транзакций
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesId = filters.transactionId
        ? transaction.id
            .toLowerCase()
            .includes(filters.transactionId.toLowerCase())
        : true

      const matchesDescription = filters.description
        ? transaction.description
            ?.toLowerCase()
            .includes(filters.description.toLowerCase()) || false
        : true

      return matchesId && matchesDescription
    })
  }, [filters])

  return (
    <div className={styles.transactionsTab}>
      {/* Поля поиска */}
      <div className={styles.searchFilters}>
        <SearchInput
          value={filters.transactionId}
          onChange={handleTransactionIdChange}
          placeholder='ID транзакции'
          className={styles.searchField}
        />
        <SearchInput
          value={filters.description}
          onChange={handleDescriptionChange}
          placeholder='Название скина'
          className={styles.searchField}
        />
      </div>

      {/* Таблица транзакций */}
      <div className={styles.transactionsTable}>
        {/* Заголовки таблицы */}
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>ТИП/ДАТА</div>
          <div className={styles.headerCell}>ID</div>
          <div className={styles.headerCell}>СТАТУС</div>
          <div className={styles.headerCell}>СУММА</div>
          <div className={styles.headerCell}>ПЛАТЕЖ.СИСТЕМА</div>
          <div className={styles.headerCell}>КУДА</div>
          <div className={styles.headerCell}>БАЛАНС</div>
        </div>

        {/* Тело таблицы */}
        <div className={styles.tableBody}>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className={styles.emptyState}>
              {filters.transactionId || filters.description
                ? 'Транзакции по заданным фильтрам не найдены'
                : 'Транзакции не найдены'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
