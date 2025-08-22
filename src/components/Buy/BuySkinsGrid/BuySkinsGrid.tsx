'use client'

import { BuyableSkinCard } from '../BuyableSkinCard/BuyableSkinCard'
import styles from './BuySkinsGrid.module.scss'

interface ISkin {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  badge?: string
  game: string
  rarity: string
  collection: string
  phase?: string
}

interface ICartItem {
  skinId: string
  quantity: number
}

interface IBuySkinsGridProps {
  skins: ISkin[]
  cartItems: ICartItem[]
  onCartAction: (action: 'add' | 'remove', skinId: string) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
}

export const BuySkinsGrid = ({
  skins,
  cartItems,
  onCartAction,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 20
}: IBuySkinsGridProps) => {
  const getCartItem = (skinId: string) => {
    return cartItems.find((item) => item.skinId === skinId)
  }

  const handleAddToCart = (skinId: string) => {
    onCartAction('add', skinId)
  }

  const handleRemoveFromCart = (skinId: string) => {
    onCartAction('remove', skinId)
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Кнопка "Предыдущая"
    if (currentPage > 1) {
      pages.push(
        <button
          key='prev'
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ←
        </button>
      )
    }

    // Первая страница
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={styles.paginationButton}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(
          <span key='dots1' className={styles.paginationDots}>
            ...
          </span>
        )
      }
    }

    // Видимые страницы
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.paginationButton} ${
            i === currentPage ? styles.active : ''
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      )
    }

    // Последняя страница
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key='dots2' className={styles.paginationDots}>
            ...
          </span>
        )
      }
      pages.push(
        <button
          key={totalPages}
          className={styles.paginationButton}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )
    }

    // Кнопка "Следующая"
    if (currentPage < totalPages) {
      pages.push(
        <button
          key='next'
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage + 1)}
        >
          →
        </button>
      )
    }

    return pages
  }

  if (skins.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Скины не найдены</p>
        <span>Попробуйте изменить фильтры или поисковый запрос</span>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {skins.map((skin) => {
          const cartItem = getCartItem(skin.id)
          return (
            <BuyableSkinCard
              key={skin.id}
              id={skin.id}
              title={skin.title}
              price={skin.price}
              originalPrice={skin.originalPrice}
              discount={skin.discount}
              image={skin.image}
              badge={skin.badge}
              isInCart={!!cartItem}
              cartQuantity={cartItem?.quantity || 0}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>{renderPagination()}</div>
      )}
    </div>
  )
}
