'use client'

import Image, { StaticImageData } from 'next/image'
import styles from './SkinCard.module.scss'

interface ISkinCardProps {
  title: string
  price: string
  currency?: string
  image: string | StaticImageData
  badge?: string
  onClick?: () => void
}

export const SkinCard = ({
  title,
  price,
  currency = '₽',
  image,
  badge,
  onClick
}: ISkinCardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        {badge && <div className={styles.badge}>{badge}</div>}
        <Image
          src={image}
          alt={title}
          width={200}
          height={150}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.price}>
          {price} {currency}
        </div>
      </div>
    </div>
  )
}