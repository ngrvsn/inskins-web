import { TransactionProgress } from '@/components/ui/TransactionProgress/TransactionProgress'
import { TransactionNumber } from '@/components/ui/TransactionNumber/TransactionNumber'
import { Spinner } from '@/components/ui/Spinner/Spinner'
import styles from './PendingPayout.module.scss'

interface IPendingPayoutProps {
  transactionId: string
}

export function PendingPayout({ transactionId }: IPendingPayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Прогресс-бар */}
        <TransactionProgress currentStep='payout' status='pending' />

        {/* Заголовок */}
        <h1 className={styles.title}>Ожидание выплаты</h1>

        {/* Номер транзакции */}
        <TransactionNumber
          transactionId={transactionId}
          className={styles.transactionNumber}
        />

        {/* Спиннер загрузки */}
        <div className={styles.spinnerContainer}>
          <Spinner size='large' color='green' />
        </div>

        {/* Описание */}
        <p className={styles.description}>
          Обрабатываем вашу выплату. Это может занять несколько минут.
        </p>
      </div>
    </div>
  )
}
