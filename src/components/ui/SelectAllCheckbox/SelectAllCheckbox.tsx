'use client'

import styles from './SelectAllCheckbox.module.scss'

interface ISelectAllCheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
  className?: string
}

export const SelectAllCheckbox = ({
  checked,
  onChange,
  label = 'Выбрать все',
  className
}: ISelectAllCheckboxProps) => {
  return (
    <div className={styles.container}>
    <label className={`${styles.selectAllLabel} ${className || ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.selectAllCheckbox}
      />
      <span className={styles.selectAllText}>{label}</span>
    </label>
    </div>
  )
}