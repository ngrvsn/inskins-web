'use client'

import Image, { StaticImageData } from 'next/image'
import styles from './BuyableSkinCard.module.scss'
import cartIcon from '@/assets/icons/cart.svg'
import redCrossIcon from '@/assets/icons/red-cross.svg'
import mockCard from '@/assets/images/mockCard.png'

interface IBuyableSkinCardProps {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  currency?: string
  image: string | StaticImageData
  badge?: string
  isInCart: boolean
  cartQuantity: number
  onAddToCart: (skinId: string) => void
  onRemoveFromCart: (skinId: string) => void
  onClick?: () => void
}

export const BuyableSkinCard = ({
  id,
  title,
  price,
  originalPrice,
  discount,
  currency = '₽',
  image,
  badge,
  isInCart,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onClick
}: IBuyableSkinCardProps) => {
  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInCart) {
      onRemoveFromCart(id)
    } else {
      onAddToCart(id)
    }
  }

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        {badge && <div className={styles.badge}>{badge}</div>}
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={mockCard}
          alt={title}
          width={200}
          height={150}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.priceContainer}>
          <div className={styles.price}>
            {price.toLocaleString()} {currency}
          </div>
          {discount && <div className={styles.discount}>-{discount}%</div>}
        </div>

        <button
          className={`${styles.cartButton} ${isInCart ? styles.inCart : ''}`}
          onClick={handleCartAction}
        >
          {isInCart ? (
            <>
              <Image src={redCrossIcon} alt='Убрать' width={12} height={12} />
              <span>Убрать из корзины</span>
            </>
          ) : (
            <>
              <Image src={cartIcon} alt='В корзину' width={16} height={16} />
              <span>В корзину</span>
            </>
          )}
          {isInCart && cartQuantity > 1 && (
            <span className={styles.quantity}>x{cartQuantity}</span>
          )}
        </button>
      </div>
    </div>
  )
}
