'use client'

import { FC } from 'react'
import Image from 'next/image'
import redCrossLarge from '@/assets/icons/red-cross-large.svg'
import { TransactionProgress } from '../../ui/TransactionProgress/TransactionProgress'
import { TransactionNumber } from '../../ui/TransactionNumber/TransactionNumber'
import { Button } from '../../ui/Button/Button'
import styles from './TransactionCancelled.module.scss'

interface ITransactionCancelledProps {
  transactionId: string
  cancelReason?: string
  onRetry: () => void
}

export const TransactionCancelled: FC<ITransactionCancelledProps> = ({
  transactionId,
  cancelReason = 'Время ожидания подтверждения истекло',
  onRetry
}) => {
  return (
    <div className={styles.container}>
      <TransactionProgress currentStep='confirmation' status='cancelled' />

      <div className={styles.content}>
        <div className={styles.iconSection}>
          <div className={styles.cancelIcon}>
            <Image
              src={redCrossLarge}
              alt='Сделка отменена'
              width={72}
              height={72}
            />
          </div>
        </div>

        <h1 className={styles.title}>Сделка была отменена</h1>

        <TransactionNumber
          transactionId={transactionId}
          className={styles.transactionNumber}
        />

        <div className={styles.reasonSection}>
          <p className={styles.reasonText}>{cancelReason}</p>
          <p className={styles.supportText}>
            Если у вас возникли вопросы, обратитесь в{' '}
            <span className={styles.supportLink}>службу поддержки</span>
          </p>
        </div>

        <div className={styles.buttonSection}>
          <Button
            variant='dark'
            onClick={onRetry}
            className={styles.retryButton}
          >
            ПОПРОБОВАТЬ ЕЩЁ РАЗ
          </Button>
        </div>
      </div>
    </div>
  )
}
