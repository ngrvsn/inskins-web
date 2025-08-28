'use client'

import { FC } from 'react'
import Image from 'next/image'
import { TransactionProgress } from '../../ui/TransactionProgress/TransactionProgress'
import { TransactionNumber } from '../../ui/TransactionNumber/TransactionNumber'
import { Timer } from '../../ui/Timer/Timer'
import { InfoBanner } from '../../ui/InfoBanner/InfoBanner'
import { Button } from '../../ui/Button/Button'
import steamIcon from '@/assets/icons/steam-outlined-black.svg'
import styles from './PendingConfirmation.module.scss'

interface IBotInfo {
  level: number
  name: string
  avatar: string
}

interface IPendingConfirmationProps {
  transactionId: string
  timeLeft: number // в секундах
  botInfo: IBotInfo
  onTimeout: () => void
  onConfirmBrowser: () => void
  onConfirmClient: () => void
}

export const PendingConfirmation: FC<IPendingConfirmationProps> = ({
  transactionId,
  timeLeft,
  botInfo,
  onTimeout,
  onConfirmBrowser,
  onConfirmClient
}) => {
  return (
    <div className={styles.container}>
      <TransactionProgress currentStep='confirmation' status='pending' />

      <div className={styles.mainCard}>
        <h1 className={styles.title}>Ожидаем подтверждения</h1>

        <TransactionNumber
          transactionId={transactionId}
        />

          <Timer
            initialTime={timeLeft}
            onTimeout={onTimeout}
            className={styles.timer}
          />
          <p className={styles.timerDescription}>
            У тебя есть 10 мин до подтверждения сделки через Steam.
            <br />
            По истечении этого времени сделка в Steam будет отменена.
          </p>

        <InfoBanner variant='warning' >
          Из-за новых правил{' '}
          <span className={styles.link}>Steam Trade Protection</span>, выплата
          за скины будет произведена через 8 дней (после 5.08.2025 14:00)
        </InfoBanner>
      </div>


        <div className={styles.instructionBlock}>
          <h3 className={styles.instructionTitle}>
            1. Получили странные уведомления об отмене сделки или создании
            новой?
          </h3>
          <div className={styles.instructionContent}>
            <p>Выполните следующие действия чтобы защитить аккаунт:</p>
            <ul>
              <li>
                Смените пароль в разделе{' '}
                <span className={styles.link}>«Об аккаунте»</span> →{' '}
                <span>«Защита аккаунта»</span> →{' '}
                <span>«Сменить пароль»</span>
              </li>
              <li>
                Убедитесь, что у вас нет лишних{' '}
                <span className={styles.link}>активных сессий</span> и{' '}
                <span className={styles.link}>Steam Web API Key</span>.
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.instructionBlock}>
          <h3 className={styles.instructionTitle}>
            2. Подтвердите обмен в Steam, сверив данные сделки
          </h3>
          <div className={styles.botInfoCard}>
            <div className={styles.botInfoRow}>
              <span className={styles.botInfoLabel}>УРОВЕНЬ БОТА:</span>
              <span className={styles.botInfoValue}>{botInfo.level}</span>
            </div>
            <div className={styles.botInfoRow}>
              <span className={styles.botInfoLabel}>БОТ ДЛЯ СДЕЛКИ:</span>
              <span className={`${styles.botInfoValue} ${styles.link}`}>
                {botInfo.name}
              </span>
            </div>
            <div className={styles.botInfoRow}>
              <span className={styles.botInfoLabel}>АВАТАР:</span>
              <div className={styles.botAvatar}>
                <img src={botInfo.avatar} alt={`Бот ${botInfo.name}`} />
              </div>
            </div>
          </div>
        </div>

      <InfoBanner variant='warning' greenBorder>
        Перед подтверждением обмена на телефоне - ОБЯЗАТЕЛЬНО{' '}
        подождите 15 сек на странице нашего сайта. Это нужно чтобы уберечь вас
        от STEAM API SCAM.
      </InfoBanner>

      <div className={styles.buttonsSection}>
        <Button
          variant='primary'
          size='large'
          onClick={onConfirmBrowser}
        >
          ПОДТВЕРДИТЬ В БРАУЗЕРЕ
        </Button>
        <Button
          variant='white'
          size='large'
          onClick={onConfirmClient}
          icon={<Image src={steamIcon} alt="Steam" width={20} height={20} />}
        >
          ПОДТВЕРДИТЬ В КЛИЕНТЕ
        </Button>
      </div>
    </div>
  )
}
