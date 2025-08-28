'use client'

import { FC } from 'react'
import Image from 'next/image'
import telegramFooter from '@/assets/icons/telegram-footer.svg'
import { TransactionProgress } from '../../ui/TransactionProgress/TransactionProgress'
import { TransactionNumber } from '../../ui/TransactionNumber/TransactionNumber'
import { InfoBanner } from '../../ui/InfoBanner/InfoBanner'
import { Button } from '../../ui/Button/Button'
import styles from './TransactionCompleted.module.scss'

interface ITransactionCompletedProps {
  transactionId: string
  onCreateNew: () => void
}

export const TransactionCompleted: FC<ITransactionCompletedProps> = ({
  transactionId,
  onCreateNew
}) => {
  return (
    <div className={styles.container}>
      <TransactionProgress currentStep='completion' status='completed' />

      <div className={styles.content}>
        <h1 className={styles.title}>Деньги переведены</h1>

        <TransactionNumber
          transactionId={transactionId}
          className={styles.transactionNumber}
        />

        <InfoBanner variant='info' className={styles.protectionBanner}>
          Благодаря <span className={styles.link}>Steam Trade Protection</span>{' '}
          ваша сделка была проведена безопасно
        </InfoBanner>

        <div className={styles.supportSection}>
          <div className={styles.supportIcon}>
            <Image
              src={telegramFooter}
              alt='Telegram поддержка'
              width={35}
              height={35}
            />
          </div>
          <div className={styles.supportContent}>
            <h3 className={styles.supportTitle}>Нужна помощь?</h3>
            <p className={styles.supportText}>
              Обратитесь в нашу службу поддержки в Telegram для получения помощи
            </p>
          </div>
        </div>

        <div className={styles.buttonSection}>
          <Button
            variant='dark'
            onClick={onCreateNew}
            className={styles.createButton}
          >
            СОЗДАТЬ ЕЩЁ ОДНУ СДЕЛКУ
          </Button>
        </div>
      </div>
    </div>
  )
}
