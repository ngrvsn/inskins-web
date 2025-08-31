'use client'

import Image from 'next/image'
import styles from './UserAvatar.module.scss'

interface IUserAvatarProps {
  src: string
  alt: string
  size?: number
}

export const UserAvatar = ({ src, alt, size = 130 }: IUserAvatarProps) => {
  return (
    <div
      className={styles.avatarContainer}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={styles.avatar}
      />
    </div>
  )
}
