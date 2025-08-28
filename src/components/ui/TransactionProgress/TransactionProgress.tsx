import styles from './TransactionProgress.module.scss'
import Image from 'next/image'
import greenRoundDot from '@/assets/icons/green-round-dot.svg'
import cancelPaymentRound from '@/assets/icons/cancel-payment-round.svg'
import successPaymentRound from '@/assets/icons/sucess-payment-round.svg'

interface ITransactionProgressProps {
  currentStep: 'confirmation' | 'payout' | 'completion'
  status: 'pending' | 'cancelled' | 'completed'
  className?: string
}

const steps = [
  { key: 'confirmation', label: 'Подтверждение оплаты' },
  { key: 'payout', label: 'Выплата' },
  { key: 'completion', label: 'Завершение сделки' }
]

export const TransactionProgress = ({
  currentStep,
  status,
  className
}: ITransactionProgressProps) => {
  const getStepStatus = (stepKey: string, index: number) => {
    if (status === 'cancelled') return 'cancelled'
    if (status === 'completed') return 'completed'

    const currentIndex = steps.findIndex((step) => step.key === currentStep)

    if (index < currentIndex) return 'completed'
    if (index === currentIndex) return 'current'
    return 'inactive'
  }

  const renderStepIcon = (stepStatus: string) => {
    if (status === 'completed') {
      return (
        <Image
          src={successPaymentRound}
          alt='Завершено'
          width={42}
          height={42}
        />
      )
    }

    if (status === 'cancelled') {
      return (
        <Image
          src={cancelPaymentRound}
          alt='Отменено'
          width={42}
          height={42}
        />
      )
    }

    // Для pending статуса
    if (stepStatus === 'current') {
      return (
        <Image src={greenRoundDot} alt='Текущий шаг' width={42} height={42} />
      )
    }

    // Неактивный серый кружок
    return null
  }

  return (
    <div className={`${styles.progress} ${className || ''}`}>
      {steps.map((step, index) => {
        const stepStatus = getStepStatus(step.key, index)
        const isLast = index === steps.length - 1

        return (
          <div key={step.key} className={styles.step}>
            <div className={`${styles.circle} ${styles[stepStatus]}`}>
              {renderStepIcon(stepStatus)}
            </div>
            <div className={styles.label}>{step.label}</div>
            {!isLast && (
              <div
                className={`${styles.line} ${
                  (status === 'completed') ||
                  (status === 'pending' && (stepStatus === 'completed' || (stepStatus === 'current' && step.key === 'confirmation')))
                    ? styles.active
                    : ''
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
