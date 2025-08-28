'use client'

import { useState } from 'react'
import { Overlay } from '../Overlay/Overlay'
import Image from 'next/image'
import { Button } from '../Button/Button'
import warningIcon from '@/assets/icons/information-warn-gray.svg'
import Link from 'next/link'
import styles from './FraudWarningModal.module.scss'

interface IFraudWarningModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const FraudWarningModal = ({
  isOpen,
  onClose,
  onConfirm
}: IFraudWarningModalProps) => {
  const [firstCheckbox, setFirstCheckbox] = useState(false)
  const [secondCheckbox, setSecondCheckbox] = useState(false)

  const canProceed = firstCheckbox && secondCheckbox

  const handleConfirm = () => {
    if (canProceed) {
      onConfirm()
      // Сбрасываем состояние чекбоксов
      setFirstCheckbox(false)
      setSecondCheckbox(false)
    }
  }

  const handleClose = () => {
    onClose()
    // Сбрасываем состояние чекбоксов при закрытии
    setFirstCheckbox(false)
    setSecondCheckbox(false)
  }

  if (!isOpen) return null

  return (
    <Overlay isOpen={isOpen} onClose={handleClose}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Процесс обмена</h2>
        </div>
        <div className={styles.securitySection}>
          <p className={styles.securityText}>
            Перед тем как принять предложение обмена, внимательно ознакомьтесь с
            этой информацией, чтобы избежать мошенничества!
          </p>
        </div>
        <div className={styles.securityContent}>
          <p className={styles.securityContentText}>
            Получили странные уведомления об отмене сделки или создании новой?
          </p>
          <p className={styles.greenSecurityContentText}>
            Не принимайте никаких предложений обмена!
          </p>
        </div>

        <div className={styles.recomendationSection}>
          <p className={styles.recomendationHead}>
            Выполните следующие действия, чтобы защитить свой аккаунт:
          </p>
          <div className={styles.recomendationWrapper}>
            <p className={styles.recomendationText}>
              1. Смените пароль в разделе «Об аккаунте» → «Защита аккаунта» →
              «Сменить пароль» 
            </p>
            <Image
              src={warningIcon}
              alt='Информация'
              width={13}
              height={13}
              className={styles.icon}
            />
          </div>
          <p className={styles.recomendationText}>
            2. Убедитесь, что у вас нет лишних активных сессий и Steam Web API
            Key
          </p>
        </div>

        <div className={styles.checkboxSection}>
          <div className={styles.checkboxItem}>
            <label
              className={`${styles.checkboxLabel} ${styles.checkboxLabelFirst}`}
            >
              <input
                type='checkbox'
                className={styles.checkbox}
                checked={firstCheckbox}
                onChange={(e) => setFirstCheckbox(e.target.checked)}
              />
              <span className={styles.checkboxText}>
                Согласен с тем, что ответственность за безопасность аккаунта
                лежит на мне
              </span>
            </label>
          </div>

          <div className={styles.checkboxItem}>
            <label
              className={`${styles.checkboxLabel} ${styles.checkboxLabelSecond}`}
            >
              <input
                type='checkbox'
                className={styles.checkbox}
                checked={secondCheckbox}
                onChange={(e) => setSecondCheckbox(e.target.checked)}
              />
              <span className={styles.checkboxText}>
                Не показывать мне это окно снова
              </span>
            </label>
          </div>
        </div>

        <Button
          variant={canProceed ? 'primary' : 'disabled'}
          size='large'
          onClick={handleConfirm}
          disabled={!canProceed}
          className={styles.confirmButton}
        >
          ПРОДОЛЖИТЬ
        </Button>
        <div className={styles.supportWrapper}>
          Если у вас возникли сомнения или вопросы, свяжитесь с поддержкой через{' '}
          <Link href='#' className={styles.supportLink}>
            Telegram
          </Link>
        </div>
      </div>
    </Overlay>
  )
}
