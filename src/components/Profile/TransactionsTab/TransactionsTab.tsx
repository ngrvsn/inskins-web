'use client'

import { useState, useMemo } from 'react'
import { SearchInput } from '@/components/ui'
import { TransactionRow } from '../TransactionRow/TransactionRow'
import { ITransactionFilters, IProfileTransaction } from '@/types/transaction'
import styles from './TransactionsTab.module.scss'

interface ITransactionsTabProps {
  // Пока без пропсов, добавим позже при интеграции с данными
}

// Моковые данные транзакций
const mockTransactions: IProfileTransaction[] = [
  {
    id: 'TXN001234',
    type: 'sale',
    date: new Date('2024-01-15T14:30:00'),
    status: 'completed',
    amount: 1250.75,
    currency: 'RUB',
    paymentSystem: 'Steam Wallet',
    destination: 'Баланс Steam',
    balanceChange: 1250.75,
    skins: [
      {
        id: 'skin1',
        name: 'AK-47 | Redline',
        game: 'CS:GO',
        price: 850.5,
        image: '/placeholder-skin.png'
      },
      {
        id: 'skin2',
        name: 'AWP | Dragon Lore',
        game: 'CS:GO',
        price: 400.25,
        image: '/placeholder-skin.png'
      }
    ]
  },
  {
    id: 'TXN001235',
    type: 'purchase',
    date: new Date('2024-01-14T10:15:00'),
    status: 'completed',
    amount: 750.0,
    currency: 'RUB',
    paymentSystem: 'Банковская карта',
    destination: 'Инвентарь Steam',
    balanceChange: -750.0,
    skins: [
      {
        id: 'skin3',
        name: 'M4A4 | Howl',
        game: 'CS:GO',
        price: 750.0,
        image: '/placeholder-skin.png'
      }
    ]
  },
  {
    id: 'TXN001236',
    type: 'deposit',
    date: new Date('2024-01-13T16:45:00'),
    status: 'completed',
    amount: 2000.0,
    currency: 'RUB',
    paymentSystem: 'Qiwi',
    destination: 'Баланс INSKINS',
    balanceChange: 2000.0
  },
  {
    id: 'TXN001237',
    type: 'sale',
    date: new Date('2024-01-12T09:20:00'),
    status: 'cancelled',
    amount: 500.0,
    currency: 'RUB',
    paymentSystem: 'Steam Wallet',
    destination: 'Баланс Steam',
    balanceChange: 0,
    skins: [
      {
        id: 'skin4',
        name: 'Glock-18 | Fade',
        game: 'CS:GO',
        price: 500.0,
        image: '/placeholder-skin.png'
      }
    ]
  },
  {
    id: 'TXN001238',
    type: 'withdrawal',
    date: new Date('2024-01-11T13:10:00'),
    status: 'pending',
    amount: 1500.0,
    currency: 'RUB',
    paymentSystem: 'Банковская карта',
    destination: 'Банковский счет',
    balanceChange: -1500.0
  }
]

export const TransactionsTab = ({}: ITransactionsTabProps) => {
  const [filters, setFilters] = useState<ITransactionFilters>({
    transactionId: '',
    skinName: ''
  })

  const handleTransactionIdChange = (value: string) => {
    setFilters((prev) => ({ ...prev, transactionId: value }))
  }

  const handleSkinNameChange = (value: string) => {
    setFilters((prev) => ({ ...prev, skinName: value }))
  }

  // Фильтрация транзакций
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((transaction) => {
      const matchesId = filters.transactionId
        ? transaction.id
            .toLowerCase()
            .includes(filters.transactionId.toLowerCase())
        : true

      const matchesSkin = filters.skinName
        ? transaction.skins?.some((skin) =>
            skin.name.toLowerCase().includes(filters.skinName.toLowerCase())
          ) || false
        : true

      return matchesId && matchesSkin
    })
  }, [filters])

  return (
    <div className={styles.transactionsTab}>
      {/* Заголовок раздела */}
      <h3 className={styles.sectionTitle}>История транзакций</h3>

      {/* Поля поиска */}
      <div className={styles.searchFilters}>
        <SearchInput
          value={filters.transactionId}
          onChange={handleTransactionIdChange}
          placeholder='Поиск по ID транзакции'
          className={styles.searchField}
        />
        <SearchInput
          value={filters.skinName}
          onChange={handleSkinNameChange}
          placeholder='Поиск по названию скина'
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
          <div className={styles.headerCell}></div>
        </div>

        {/* Тело таблицы */}
        <div className={styles.tableBody}>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className={styles.emptyState}>
              {filters.transactionId || filters.skinName
                ? 'Транзакции по заданным фильтрам не найдены'
                : 'Транзакции не найдены'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
