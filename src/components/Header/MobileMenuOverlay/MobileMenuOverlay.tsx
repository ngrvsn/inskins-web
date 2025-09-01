import { FC } from 'react'
import styles from './MobileMenuOverlay.module.scss'

interface IMobileMenuOverlayProps {
  isVisible: boolean
  onClick: () => void
}

const MobileMenuOverlay: FC<IMobileMenuOverlayProps> = ({
  isVisible,
  onClick
}) => {
  if (!isVisible) return null

  return (
    <div
      className={styles.overlay}
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      }}
      aria-label='Закрыть мобильное меню'
    />
  )
}

export default MobileMenuOverlay
