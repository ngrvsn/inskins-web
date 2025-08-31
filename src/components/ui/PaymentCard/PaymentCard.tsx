'use client'

import Image from 'next/image'
import { EPaymentMethod } from '@/api/users/types'
import styles from './PaymentCard.module.scss'

// Импорт всех иконок
import cardIcon from '@/assets/icons/card-payment.svg'
import sbpIcon from '@/assets/icons/sbp-payment.svg'
import usdtTrcIcon from '@/assets/icons/usdttrc-payment.svg'
import binanceIcon from '@/assets/icons/binance-payment.svg'
import usdcIcon from '@/assets/icons/usdc-payment.svg'
import bitcoinIcon from '@/assets/icons/bitcoin-payment.svg'
import ethereumIcon from '@/assets/icons/ethereum-payment.svg'
import solanaIcon from '@/assets/icons/solana-payment.svg'
import tonIcon from '@/assets/icons/ton-payment.svg'
import usdtErcIcon from '@/assets/icons/usdterc-payment.svg'
import inskinsIcon from '@/assets/icons/inskins-payment.svg'

// Конфигурация платежных методов с использованием нового enum
const paymentMethodsConfig: Record<
  EPaymentMethod,
  {
    icon: any
    title: string
    showTitle: boolean
    width: number
    height: number
  }
> = {
  [EPaymentMethod.CARD]: {
    icon: cardIcon,
    title: 'Карты РФ',
    showTitle: true,
    width: 28,
    height: 20
  },
  [EPaymentMethod.SBP]: {
    icon: sbpIcon,
    title: 'СБП',
    showTitle: false,
    width: 75,
    height: 36
  },
  [EPaymentMethod.USDT_TRC20]: {
    icon: usdtTrcIcon,
    title: 'USDT TRC-20',
    showTitle: false,
    width: 75,
    height: 36
  },
  [EPaymentMethod.BNB]: {
    icon: binanceIcon,
    title: 'BNB',
    showTitle: false,
    width: 77,
    height: 16
  },
  [EPaymentMethod.USDC_TRC20]: {
    icon: usdcIcon,
    title: 'USDC TRC-20',
    showTitle: false,
    width: 75,
    height: 36
  },
  [EPaymentMethod.BTC]: {
    icon: bitcoinIcon,
    title: 'Bitcoin',
    showTitle: false,
    width: 77,
    height: 18
  },
  [EPaymentMethod.ETH]: {
    icon: ethereumIcon,
    title: 'Ethereum',
    showTitle: false,
    width: 77,
    height: 21
  },
  [EPaymentMethod.SOLANA]: {
    icon: solanaIcon,
    title: 'Solana',
    showTitle: false,
    width: 77,
    height: 21
  },
  [EPaymentMethod.TON]: {
    icon: tonIcon,
    title: 'TON',
    showTitle: false,
    width: 70,
    height: 30
  },
  [EPaymentMethod.USDT_ERC20]: {
    icon: usdtErcIcon,
    title: 'USDT ERC-20',
    showTitle: false,
    width: 75,
    height: 36
  },
  [EPaymentMethod.INSKINS]: {
    icon: inskinsIcon,
    title: 'INSKINS',
    showTitle: false,
    width: 77,
    height: 32
  }
}

export type PaymentMethodId = EPaymentMethod

interface IPaymentCardProps {
  methodId: PaymentMethodId
  isSelected?: boolean
  onClick?: () => void
  showCheckmark?: boolean
}

export const PaymentCard = ({
  methodId,
  isSelected = false,
  onClick,
  showCheckmark = false
}: IPaymentCardProps) => {
  const config = paymentMethodsConfig[methodId]

  if (!config) {
    console.warn(`Payment method ${methodId} not found`)
    return null
  }

  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <Image
        src={config.icon}
        alt={config.title}
        width={config.width}
        height={config.height}
        className={styles.icon}
      />
      {config.showTitle && <span className={styles.title}>{config.title}</span>}
    </button>
  )
}

// Экспорт доступных методов для использования (основные методы для UI)
export const PAYMENT_METHODS: PaymentMethodId[] = [
  EPaymentMethod.CARD,
  EPaymentMethod.SBP,
  EPaymentMethod.USDT_TRC20,
  EPaymentMethod.USDT_ERC20,
  EPaymentMethod.BTC,
  EPaymentMethod.ETH,
  EPaymentMethod.SOLANA,
  EPaymentMethod.TON,
  EPaymentMethod.BNB
] as const
