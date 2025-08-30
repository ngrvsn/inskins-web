'use client'

import { FC } from 'react'
import Image from 'next/image'
import redCrossLarge from '@/assets/icons/cancel-deal-cross.svg'
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
            <Image
              src={redCrossLarge}
              alt='Сделка отменена'
              width={42}
              height={42}
            />
            <div className={styles.titleContainer}>
        <h1 className={styles.title}>Сделка была отменена</h1>

        <TransactionNumber
          transactionId={transactionId}
        />
          </div>
        <div className={styles.reasonSection}>
          <p className={styles.reasonText}>{cancelReason}</p>
          <p className={styles.reasonText}>
            Если вы этого не делали, свяжитесь с поддержкой через Telegram.
          </p>
        </div>
      </div>
              <div className={styles.buttonSection}>
          <Button
            variant='dark'
            onClick={onRetry}
            size='medium'
          >
            ПОПРОБОВАТЬ ЕЩЁ РАЗ
          </Button>
        </div>
    </div>
  )
}
