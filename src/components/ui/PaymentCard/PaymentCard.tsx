'use client'

import Image from 'next/image'
import { type TPaymentMethod } from '@/api/users/types'
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

// Конфигурация платежных методов с использованием API типов
const paymentMethodsConfig: Record<
  TPaymentMethod,
  {
    icon: any
    title: string
    showTitle: boolean
    width: number
    height: number
  }
> = {
  card_ru: {
    icon: cardIcon,
    title: 'Карты РФ',
    showTitle: true,
    width: 28,
    height: 20
  },
  card_visa: {
    icon: cardIcon,
    title: 'Visa',
    showTitle: true,
    width: 28,
    height: 20
  },
  card_mastercard: {
    icon: cardIcon,
    title: 'Mastercard',
    showTitle: true,
    width: 28,
    height: 20
  },
  sbp: {
    icon: sbpIcon,
    title: 'СБП',
    showTitle: false,
    width: 75,
    height: 36
  },
  usdt_trc20: {
    icon: usdtTrcIcon,
    title: 'USDT TRC-20',
    showTitle: false,
    width: 75,
    height: 36
  },
  usdt_erc20: {
    icon: usdtErcIcon,
    title: 'USDT ERC-20',
    showTitle: false,
    width: 75,
    height: 36
  },
  usdt_bsc: {
    icon: usdcIcon,
    title: 'USDT BSC',
    showTitle: false,
    width: 75,
    height: 36
  },
  btc: {
    icon: bitcoinIcon,
    title: 'Bitcoin',
    showTitle: false,
    width: 77,
    height: 18
  },
  eth: {
    icon: ethereumIcon,
    title: 'Ethereum',
    showTitle: false,
    width: 77,
    height: 21
  },
  sol: {
    icon: solanaIcon,
    title: 'Solana',
    showTitle: false,
    width: 77,
    height: 21
  },
  ton: {
    icon: tonIcon,
    title: 'TON',
    showTitle: false,
    width: 70,
    height: 30
  },
  bnb: {
    icon: binanceIcon,
    title: 'BNB',
    showTitle: false,
    width: 77,
    height: 16
  },
  sepa: {
    icon: cardIcon,
    title: 'SEPA',
    showTitle: true,
    width: 28,
    height: 20
  },
  paypal: {
    icon: cardIcon,
    title: 'PayPal',
    showTitle: true,
    width: 28,
    height: 20
  },
  qiwi: {
    icon: cardIcon,
    title: 'QIWI',
    showTitle: true,
    width: 28,
    height: 20
  },
  yandex_money: {
    icon: inskinsIcon,
    title: 'ЮMoney',
    showTitle: false,
    width: 77,
    height: 32
  }
}

export type PaymentMethodId = TPaymentMethod

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
  'card_ru',
  'sbp',
  'usdt_trc20',
  'usdt_erc20',
  'btc',
  'eth',
  'sol',
  'ton',
  'bnb'
] as const
