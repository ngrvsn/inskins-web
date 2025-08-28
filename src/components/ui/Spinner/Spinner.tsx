import styles from './Spinner.module.scss'

interface ISpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'green' | 'white'
  className?: string
}

export const Spinner = ({
  size = 'medium',
  color = 'green',
  className = ''
}: ISpinnerProps) => {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${styles[color]} ${className}`}
    >
      <div className={styles.circle}></div>
    </div>
  )
}
