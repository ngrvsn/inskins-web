'use client'

import styles from './PageTitle.module.scss'

interface IPageTitleProps {
  title?: string
  children?: React.ReactNode
  className?: string
}

export const PageTitle = ({ title, children, className }: IPageTitleProps) => {
  return (
    <h1 className={`${styles.title} ${className || ''}`}>
      {title || children}
    </h1>
  )
}
