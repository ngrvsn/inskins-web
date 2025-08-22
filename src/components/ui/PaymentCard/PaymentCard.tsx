'use client'

import Image from 'next/image'
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

// Конфигурация платежных методов
const paymentMethodsConfig = {
  cards: { icon: cardIcon, title: 'Карты', showTitle: true, width: 28, height: 20 },
  sbp: { icon: sbpIcon, title: 'СБП', showTitle: false, width: 75, height: 36 },
  'usdt-trc': { icon: usdtTrcIcon, title: 'USDT TRC-20', showTitle: false, width: 75, height: 36 },
  binance: { icon: binanceIcon, title: 'BINANCE', showTitle: false, width: 77, height: 16 },
  'usdc': { icon: usdcIcon, title: 'USDC TRC-20', showTitle: false, width: 75, height: 36 },
  bitcoin: { icon: bitcoinIcon, title: 'bitcoin', showTitle: false, width: 77, height: 18 },
  ethereum: { icon: ethereumIcon, title: 'Ethereum', showTitle: false, width: 77, height: 21 },
  solana: { icon: solanaIcon, title: 'SOLANA', showTitle: false, width: 77, height: 21 },
  ton: { icon: tonIcon, title: 'TON', showTitle: false, width: 70, height: 30 },
  'usdt-erc': { icon: usdtErcIcon, title: 'USDT ERC-20', showTitle: false, width: 75, height: 36 },
  inskins: { icon: inskinsIcon, title: 'inskins balance', showTitle: false, width: 77, height: 32 }
}

type PaymentMethodId = keyof typeof paymentMethodsConfig

interface IPaymentCardProps {
  methodId: PaymentMethodId
  isSelected?: boolean
  onClick?: () => void
}

export const PaymentCard = ({
  methodId,
  isSelected = false,
  onClick
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

// Экспорт доступных методов для использования
export const PAYMENT_METHODS: PaymentMethodId[] = [
  'cards', 'sbp', 'usdt-trc', 'binance', 'usdc',
  'bitcoin', 'ethereum', 'solana', 'ton', 'usdt-erc', 'inskins'
]