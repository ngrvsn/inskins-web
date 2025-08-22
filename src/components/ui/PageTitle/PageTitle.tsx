'use client'

import styles from './PageTitle.module.scss'

interface IPageTitleProps {
  children: React.ReactNode
  className?: string
}

export const PageTitle = ({ children, className }: IPageTitleProps) => {
  return (
    <h1 className={`${styles.title} ${className || ''}`}>
      {children}
    </h1>
  )
}