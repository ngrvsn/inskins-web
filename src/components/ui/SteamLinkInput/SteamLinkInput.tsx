'use client'

import { useForm } from 'react-hook-form'
import styles from './SteamLinkInput.module.scss'

interface ISteamLinkInputProps {
  onLinkChange: (link: string) => void
  initialValue?: string
  withTitle?: boolean
}

interface IFormData {
  steamLink: string
}

export const SteamLinkInput = ({
  onLinkChange,
  initialValue = '',
  withTitle
}: ISteamLinkInputProps) => {
  const {
    register,
    formState: { errors }
  } = useForm<IFormData>({
    defaultValues: {
      steamLink: initialValue
    }
  })

  // Обработка изменения ввода без автоподстановки
  const handleInputChange = (value: string) => {
    onLinkChange(value)
  }

  // Валидация формата Steam Community
  const validateSteamLink = (value: string) => {
    if (!value) return true // Пустое поле допустимо

    const steamCommunityRegex = /^https?:\/\/steamcommunity\.com\//
    return (
      steamCommunityRegex.test(value) ||
      'Ссылка должна быть с сайта steamcommunity.com'
    )
  }

  return (
    <div className={styles.container}>
      {withTitle && (
        <label className={styles.label}>
          Вставьте свою <span className={styles.highlight}>ссылку</span> на обмен:
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          {...register('steamLink', {
            validate: validateSteamLink,
            onChange: (e) => handleInputChange(e.target.value)
          })}
          type='text'
          className={`${styles.input} ${errors.steamLink ? styles.error : ''}`}
          placeholder='https://steamcommunity.com/tradeoffer/new/?partner=...'
        />
      </div>

      {errors.steamLink && (
        <span className={styles.errorMessage}>{errors.steamLink.message}</span>
      )}
    </div>
  )
}
