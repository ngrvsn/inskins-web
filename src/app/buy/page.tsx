'use client'

import { useState, useMemo } from 'react'
import { StaticImageData } from 'next/image'
import { PageTitle } from '@/components/ui'
import { ControlsPanel } from '@/components/Buy/ControlsPanel/ControlsPanel'
import { FiltersPanel } from '@/components/Buy/FiltersPanel/FiltersPanel'
import { BuySkinsGrid } from '@/components/Buy/BuySkinsGrid/BuySkinsGrid'
import mockCard from '@/assets/images/mockCard.png'
import styles from './page.module.scss'

// Интерфейсы
interface ISkin {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string | StaticImageData
  badge?: string
  game: 'cs2' | 'dota2' | 'rust'
  rarity:
    | 'consumer'
    | 'industrial'
    | 'milspec'
    | 'restricted'
    | 'classified'
    | 'covert'
  collection: string
  phase?: 'phase1' | 'phase2' | 'phase3' | 'phase4'
  wear?: string
}

interface IFilters {
  priceRange: { min: number; max: number }
  rarity: string[]
  collection: string[]
  phase: string[]
}

interface ICartItem {
  skinId: string
  quantity: number
}

// Моковые данные скинов
const mockSkins: ISkin[] = [
  {
    id: '1',
    title: 'AK-47 | Redline',
    price: 2500,
    originalPrice: 3000,
    discount: 17,
    image: mockCard,
    badge: 'Популярное',
    game: 'cs2',
    rarity: 'classified',
    collection: 'mirage',
    wear: 'Field-Tested'
  },
  {
    id: '2',
    title: 'AWP | Dragon Lore',
    price: 45000,
    originalPrice: 50000,
    discount: 10,
    image: mockCard,
    badge: 'Редкое',
    game: 'cs2',
    rarity: 'covert',
    collection: 'dust2',
    wear: 'Factory New'
  },
  {
    id: '3',
    title: 'M4A4 | Howl',
    price: 35000,
    image: mockCard,
    badge: 'Контрабанда',
    game: 'cs2',
    rarity: 'covert',
    collection: 'inferno',
    wear: 'Minimal Wear'
  },
  {
    id: '4',
    title: 'Karambit | Fade',
    price: 18000,
    originalPrice: 20000,
    discount: 10,
    image: mockCard,
    game: 'cs2',
    rarity: 'covert',
    collection: 'cache',
    phase: 'phase1',
    wear: 'Factory New'
  },
  {
    id: '5',
    title: 'Glock-18 | Water Elemental',
    price: 450,
    originalPrice: 500,
    discount: 10,
    image: mockCard,
    game: 'cs2',
    rarity: 'restricted',
    collection: 'mirage',
    wear: 'Minimal Wear'
  },
  {
    id: '6',
    title: 'USP-S | Kill Confirmed',
    price: 1200,
    image: mockCard,
    game: 'cs2',
    rarity: 'classified',
    collection: 'overpass',
    wear: 'Field-Tested'
  },
  {
    id: '7',
    title: 'P250 | Sand Dune',
    price: 50,
    image: mockCard,
    game: 'cs2',
    rarity: 'consumer',
    collection: 'dust2',
    wear: 'Battle-Scarred'
  },
  {
    id: '8',
    title: 'AK-47 | Vulcan',
    price: 3500,
    originalPrice: 4000,
    discount: 13,
    image: mockCard,
    badge: 'Популярное',
    game: 'cs2',
    rarity: 'classified',
    collection: 'cache',
    wear: 'Factory New'
  },
  {
    id: '9',
    title: 'M4A1-S | Hyper Beast',
    price: 800,
    image: mockCard,
    game: 'cs2',
    rarity: 'restricted',
    collection: 'inferno',
    wear: 'Well-Worn'
  },
  {
    id: '10',
    title: 'Desert Eagle | Blaze',
    price: 1800,
    originalPrice: 2000,
    discount: 10,
    image: mockCard,
    game: 'cs2',
    rarity: 'restricted',
    collection: 'mirage',
    wear: 'Factory New'
  },
  // Dota 2 скины
  {
    id: '11',
    title: 'Pudge Hook | Dragonclaw',
    price: 5000,
    image: mockCard,
    badge: 'Immortal',
    game: 'dota2',
    rarity: 'covert',
    collection: 'immortal',
    wear: 'Pristine'
  },
  {
    id: '12',
    title: 'Invoker Set | Dark Artistry',
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    image: mockCard,
    badge: 'Arcana',
    game: 'dota2',
    rarity: 'covert',
    collection: 'arcana',
    wear: 'Pristine'
  },
  // Rust скины
  {
    id: '13',
    title: 'AK47 | Fire Serpent',
    price: 800,
    image: mockCard,
    game: 'rust',
    rarity: 'restricted',
    collection: 'military',
    wear: 'Field-Tested'
  },
  {
    id: '14',
    title: 'Metal Chest Plate | Glory',
    price: 1500,
    originalPrice: 1800,
    discount: 17,
    image: mockCard,
    badge: 'Редкое',
    game: 'rust',
    rarity: 'classified',
    collection: 'glory',
    wear: 'Factory New'
  }
]

const ITEMS_PER_PAGE = 12

export default function BuyPage() {
  // Состояние для управления
  const [selectedGame, setSelectedGame] = useState('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Состояние фильтров
  const [filters, setFilters] = useState<IFilters>({
    priceRange: { min: 0, max: 10000 },
    rarity: [],
    collection: [],
    phase: []
  })

  // Состояние корзины
  const [cartItems, setCartItems] = useState<ICartItem[]>([])

  // Фильтрация и сортировка скинов
  const filteredAndSortedSkins = useMemo(() => {
    let result = [...mockSkins]

    // Фильтр по игре
    if (selectedGame !== 'all') {
      result = result.filter((skin) => skin.game === selectedGame)
    }

    // Фильтр по поиску
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter((skin) => skin.title.toLowerCase().includes(query))
    }

    // Фильтр по цене
    result = result.filter(
      (skin) =>
        skin.price >= filters.priceRange.min &&
        skin.price <= filters.priceRange.max
    )

    // Фильтр по редкости
    if (filters.rarity.length > 0) {
      result = result.filter((skin) => filters.rarity.includes(skin.rarity))
    }

    // Фильтр по коллекции
    if (filters.collection.length > 0) {
      result = result.filter((skin) =>
        filters.collection.includes(skin.collection)
      )
    }

    // Фильтр по фазе
    if (filters.phase.length > 0) {
      result = result.filter(
        (skin) => skin.phase && filters.phase.includes(skin.phase)
      )
    }

    // Сортировка по цене
    result.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    })

    return result
  }, [selectedGame, searchQuery, filters, sortOrder])

  // Пагинация
  const totalPages = Math.ceil(filteredAndSortedSkins.length / ITEMS_PER_PAGE)
  const paginatedSkins = filteredAndSortedSkins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Обработчики
  const handleGameChange = (game: string) => {
    setSelectedGame(game)
    setCurrentPage(1)
  }

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleFiltersChange = (newFilters: IFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 10000 },
      rarity: [],
      collection: [],
      phase: []
    })
    setCurrentPage(1)
  }

  const handleCartAction = (action: 'add' | 'remove', skinId: string) => {
    if (action === 'add') {
      const existingItem = cartItems.find((item) => item.skinId === skinId)
      if (existingItem) {
        // Увеличиваем количество
        setCartItems((prev) =>
          prev.map((item) =>
            item.skinId === skinId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
      } else {
        // Добавляем новый товар
        setCartItems((prev) => [...prev, { skinId, quantity: 1 }])
      }
    } else {
      // Удаляем товар из корзины
      setCartItems((prev) => prev.filter((item) => item.skinId !== skinId))
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Прокрутка к началу сетки
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.buyPage}>
      <PageTitle title='Купить скины CS2, Dota 2, Rust по выгодным ценам' />

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <FiltersPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onResetFilters={handleResetFilters}
          />
        </div>

        <div className={styles.rightColumn}>
          <ControlsPanel
            selectedGame={selectedGame}
            onGameChange={handleGameChange}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          <BuySkinsGrid
            skins={paginatedSkins}
            cartItems={cartItems}
            onCartAction={handleCartAction}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
