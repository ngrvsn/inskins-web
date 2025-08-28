'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ITransaction } from '@/types/transaction'
import { PendingConfirmation } from '@/components/Transaction/PendingConfirmation/PendingConfirmation'
import { PendingPayout } from '@/components/Transaction/PendingPayout/PendingPayout'
import { TransactionCancelled } from '@/components/Transaction/TransactionCancelled/TransactionCancelled'
import { TransactionCompleted } from '@/components/Transaction/TransactionCompleted/TransactionCompleted'

// Мок данные для демонстрации различных состояний
const getMockTransaction = (id: string): ITransaction | null => {
  const mockTransactions: Record<string, ITransaction> = {
    '14757586': {
      id: '14757586',
      status: 'pending-confirmation',
      createdAt: new Date().toISOString(),
      timeLeft: 600, // 10 минут в секундах
      botInfo: {
        level: 42,
        name: 'TradeBot_Pro',
        avatar: '/images/bot-avatar.png'
      }
    },
    '14757587': {
      id: '14757587',
      status: 'pending-payout',
      createdAt: new Date().toISOString()
    },
    '14757588': {
      id: '14757588',
      status: 'cancelled',
      createdAt: new Date().toISOString(),
      cancelReason: 'Время ожидания подтверждения истекло'
    },
    '14757589': {
      id: '14757589',
      status: 'completed',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    }
  }

  return mockTransactions[id] || null
}

export default function TransactionPage() {
  const params = useParams()
  const transactionId = params.transactionId as string

  // Сразу загружаем мок данные без задержки
  const [transaction, setTransaction] = useState<ITransaction>(() => {
    return (
      getMockTransaction(transactionId) || {
        id: transactionId,
        status: 'pending-confirmation',
        createdAt: new Date().toISOString(),
        timeLeft: 600, // 10 минут в секундах
        botInfo: {
          level: 42,
          name: 'TradeBot_Pro',
          avatar: '/images/bot-avatar.png'
        }
      }
    )
  })

  const handleTimeout = () => {
    // Обновляем статус транзакции на отмененную при истечении времени
    setTransaction({
      ...transaction,
      status: 'cancelled',
      cancelReason: 'Время ожидания подтверждения истекло'
    })
  }

  const handleRetry = () => {
    // Логика повторной попытки - перенаправление на страницу продажи
    window.location.href = '/sell'
  }

  const handleCreateNew = () => {
    // Логика создания новой сделки - перенаправление на страницу продажи
    window.location.href = '/sell'
  }

  // Условная отрисовка компонентов в зависимости от статуса
  switch (transaction.status) {
    case 'pending-confirmation':
      return (
        <PendingConfirmation
          transactionId={transaction.id}
          timeLeft={transaction.timeLeft || 0}
          botInfo={transaction.botInfo!}
          onTimeout={handleTimeout}
          onConfirmBrowser={() => {
            // Логика подтверждения через браузер
            console.log('Подтверждение через браузер')
          }}
          onConfirmClient={() => {
            // Логика подтверждения через клиент Steam
            console.log('Подтверждение через клиент Steam')
          }}
        />
      )

    case 'pending-payout':
      return <PendingPayout transactionId={transaction.id} />

    case 'cancelled':
      return (
        <TransactionCancelled
          transactionId={transaction.id}
          cancelReason={transaction.cancelReason}
          onRetry={handleRetry}
        />
      )

    case 'completed':
      return (
        <TransactionCompleted
          transactionId={transaction.id}
          onCreateNew={handleCreateNew}
        />
      )

    default:
      return (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#fff'
          }}
        >
          <p>Неизвестное состояние транзакции</p>
        </div>
      )
  }
}
