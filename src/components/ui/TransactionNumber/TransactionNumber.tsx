'use client'

import { useState } from 'react'
import Image from 'next/image'
import CopyIcon from '@/assets/icons/copy-gray.svg'
import styles from './TransactionNumber.module.scss'

interface ITransactionNumberProps {
  transactionId: string
  className?: string
}

export const TransactionNumber = ({
  transactionId,
  className = ''
}: ITransactionNumberProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`#${transactionId}`)
      setCopied(true)

      // Показываем уведомление на 2 секунды
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Ошибка копирования:', err)
    }
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <span className={styles.number}>Номер сделки: #{transactionId}</span>
      <button
        className={styles.copyButton}
        onClick={handleCopy}
        title='Копировать номер сделки'
      >
        <Image
          src={CopyIcon}
          alt='Копировать'
          width={18}
          height={18}
        />
      </button>

      {copied && <div className={styles.toast}>Номер сделки скопирован</div>}
    </div>
  )
}
