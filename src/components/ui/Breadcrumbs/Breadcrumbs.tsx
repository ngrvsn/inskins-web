'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './Breadcrumbs.module.scss'
import houseIcon from '@/assets/icons/breadcrumbs-house.svg'

interface IBreadcrumbItem {
  label: string
  href?: string
}

interface IBreadcrumbsProps {
  items: IBreadcrumbItem[]
}

export const Breadcrumbs = ({ items }: IBreadcrumbsProps) => {
  return (
    <nav className={styles.breadcrumbs}>
      <Link href="/" className={styles.homeLink}>
        <Image
          src={houseIcon}
          alt="Главная"
          width={16}
          height={16}
          className={styles.homeIcon}
        />
      </Link>

      {items.map((item, index) => (
        <div key={index} className={styles.breadcrumbItem}>
          <span className={styles.separator}>/</span>
          {item.href ? (
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}