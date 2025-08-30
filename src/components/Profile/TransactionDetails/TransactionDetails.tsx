'use client'

import { IProfileTransaction } from '@/types/transaction'
import styles from './TransactionDetails.module.scss'

interface ITransactionDetailsProps {
  transaction: IProfileTransaction
}

export const TransactionDetails = ({
  transaction
}: ITransactionDetailsProps) => {
  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Транзакция успешно завершена'
      case 'cancelled':
        return 'Транзакция была отменена'
      case 'pending':
        return 'Транзакция находится в обработке'
      default:
        return 'Неизвестный статус'
    }
  }

  return (
    <div className={styles.transactionDetails}>
      {/* Блок статуса */}
      <div className={styles.detailBlock}>
        <div className={styles.blockTitle}>Статус</div>
        <div className={styles.blockContent}>
          <span className={styles.statusText}>
            {getStatusDetails(transaction.status)}
          </span>
        </div>
      </div>

      {/* Блок скинов */}
      {transaction.skins && transaction.skins.length > 0 && (
        <div className={styles.detailBlock}>
          <div className={styles.blockTitle}>Предметы в транзакции</div>
          <div className={styles.skinsHeader}>
            <div className={styles.headerCell}>НАЗВАНИЕ СКИНА</div>
            <div className={styles.headerCell}>ИГРА</div>
            <div className={styles.headerCell}>ЦЕНА</div>
          </div>
          <div className={styles.skinsData}>
            {transaction.skins.map((skin) => (
              <div key={skin.id} className={styles.skinRow}>
                <div className={styles.skinInfo}>
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className={styles.skinImage}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/placeholder-skin.png'
                    }}
                  />
                  <span className={styles.skinName}>{skin.name}</span>
                </div>
                <div className={styles.skinGame}>{skin.game}</div>
                <div className={styles.skinPrice}>
                  {skin.price.toFixed(2)} {transaction.currency}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Если нет скинов, показываем информацию о транзакции */}
      {(!transaction.skins || transaction.skins.length === 0) && (
        <div className={styles.detailBlock}>
          <div className={styles.blockTitle}>Детали транзакции</div>
          <div className={styles.transactionInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Тип операции:</span>
              <span className={styles.infoValue}>
                {transaction.type === 'sale'
                  ? 'Продажа'
                  : transaction.type === 'purchase'
                  ? 'Покупка'
                  : transaction.type === 'deposit'
                  ? 'Пополнение'
                  : 'Вывод'}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Платежная система:</span>
              <span className={styles.infoValue}>
                {transaction.paymentSystem}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Направление:</span>
              <span className={styles.infoValue}>
                {transaction.destination}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
