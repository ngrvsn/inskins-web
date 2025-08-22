'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import {
  SkinCard,
  GameSelector,
  SearchInput,
  SortDropdown,
  SelectAllCheckbox,
  RefreshButton
} from '@/components/ui'
import { ISkinItem } from '@/types/skin'
import { AuthPrompt } from '../AuthPrompt/AuthPrompt'
import styles from './SkinsGrid.module.scss'
import mockCard from '@/assets/images/mockCard.png'
import greenCheckIcon from '@/assets/icons/green-check.svg'

interface ISkinsGridProps {
  onSelectionChange: (selectedSkins: ISkinItem[]) => void
  steamLink?: string
  isAuthenticated?: boolean
  onLogin?: () => void
}

interface IFilterState {
  game: string
  search: string
  sort: 'asc' | 'desc'
  selectedSkins: string[]
}

// Мок данные для демонстрации
const mockSkins: ISkinItem[] = [
  {
    id: '1',
    title: 'AK-47 | Redline',
    price: 2450,
    image: mockCard,
    badge: 'FT',
    status: 'available',
    game: 'csgo'
  },
  {
    id: '2',
    title: 'AWP | Dragon Lore',
    price: 125000,
    image: mockCard,
    badge: 'MW',
    status: 'available',
    game: 'csgo'
  },
  {
    id: '3',
    title: 'M4A4 | Howl',
    price: 45600,
    image: mockCard,
    badge: 'FN',
    status: 'available',
    game: 'csgo'
  },
  {
    id: '4',
    title: 'Karambit | Fade',
    price: 89200,
    image: mockCard,
    status: 'available',
    game: 'csgo'
  },
  {
    id: '5',
    title: 'Glock-18 | Water Elemental',
    price: 850,
    image: mockCard,
    badge: 'ST™',
    status: 'available',
    game: 'csgo'
  },
  {
    id: '6',
    title: 'USP-S | Kill Confirmed',
    price: 3200,
    image: mockCard,
    badge: 'MW',
    status: 'available',
    game: 'csgo'
  },
  {
    id: '7',
    title: 'Rust Skin Example',
    price: 1500,
    image: mockCard,
    status: 'available',
    game: 'rust'
  },
  {
    id: '8',
    title: 'Dota 2 Item Example',
    price: 5000,
    image: mockCard,
    status: 'available',
    game: 'dota2'
  }
]

const gameOptions = [
  { value: '', label: 'Все игры' },
  { value: 'csgo', label: 'CS:GO' },
  { value: 'rust', label: 'Rust' },
  { value: 'dota2', label: 'Dota 2' }
]

export const SkinsGrid = ({
  onSelectionChange,
  steamLink,
  isAuthenticated = true,
  onLogin
}: ISkinsGridProps) => {
  const [filters, setFilters] = useState<IFilterState>({
    game: '',
    search: '',
    sort: 'desc',
    selectedSkins: []
  })

  // Фильтрация и сортировка скинов
  const filteredSkins = useMemo(() => {
    let result = mockSkins.filter((skin) => {
      const matchesGame = !filters.game || skin.game === filters.game
      const matchesSearch =
        !filters.search ||
        skin.title.toLowerCase().includes(filters.search.toLowerCase())
      return matchesGame && matchesSearch
    })

    // Сортировка по цене
    result.sort((a, b) => {
      return filters.sort === 'asc' ? a.price - b.price : b.price - a.price
    })

    return result
  }, [filters.game, filters.search, filters.sort])

  // Обработчики фильтров
  const handleGameChange = (game: string) => {
    setFilters((prev) => ({ ...prev, game }))
  }

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const handleSortChange = (sort: 'asc' | 'desc') => {
    setFilters((prev) => ({ ...prev, sort }))
  }

  // Обработчики выбора скинов
  const handleSkinSelect = (skinId: string) => {
    const newSelectedSkins = filters.selectedSkins.includes(skinId)
      ? filters.selectedSkins.filter((id) => id !== skinId)
      : [...filters.selectedSkins, skinId]

    setFilters((prev) => ({ ...prev, selectedSkins: newSelectedSkins }))

    // Передаем выбранные скины родительскому компоненту
    const selectedSkinsData = mockSkins.filter((skin) =>
      newSelectedSkins.includes(skin.id)
    )
    onSelectionChange(selectedSkinsData)
  }

  const handleSelectAll = () => {
    const allFilteredIds = filteredSkins.map((skin) => skin.id)
    const isAllSelected = allFilteredIds.every((id) =>
      filters.selectedSkins.includes(id)
    )

    const newSelectedSkins = isAllSelected
      ? filters.selectedSkins.filter((id) => !allFilteredIds.includes(id))
      : [...new Set([...filters.selectedSkins, ...allFilteredIds])]

    setFilters((prev) => ({ ...prev, selectedSkins: newSelectedSkins }))

    const selectedSkinsData = mockSkins.filter((skin) =>
      newSelectedSkins.includes(skin.id)
    )
    onSelectionChange(selectedSkinsData)
  }

  const handleRefresh = () => {
    // Логика обновления данных
    console.log('Обновление данных скинов')
  }

  const isAllSelected =
    filteredSkins.length > 0 &&
    filteredSkins.every((skin) => filters.selectedSkins.includes(skin.id))

  return (
    <div className={styles.container}>
      {/* Панель фильтров */}
      <div
        className={`${styles.filterPanel} ${
          !isAuthenticated ? styles.disabled : ''
        }`}
      >
        <GameSelector
          value={filters.game}
          onChange={handleGameChange}
          options={gameOptions}
        />

        <SearchInput
          value={filters.search}
          onChange={handleSearchChange}
          placeholder='Поиск по скинам'
        />

        <SortDropdown value={filters.sort} onChange={handleSortChange} />

        <SelectAllCheckbox
          checked={isAllSelected}
          onChange={handleSelectAll}
          label='Выбрать все'
        />

        <RefreshButton onClick={handleRefresh} />
      </div>

      {/* Сетка скинов или сообщение об авторизации */}
      <div className={styles.skinsGrid}>
        {!isAuthenticated ? (
          <div className={styles.authPrompt}>
            <AuthPrompt onLogin={onLogin || (() => {})} />
          </div>
        ) : (
          filteredSkins.map((skin) => (
            <div
              key={skin.id}
              className={`${styles.skinCardWrapper} ${
                filters.selectedSkins.includes(skin.id) ? styles.selected : ''
              }`}
              onClick={() => handleSkinSelect(skin.id)}
            >
              <SkinCard
                title={skin.title}
                price={skin.price.toLocaleString('ru-RU')}
                image={skin.image}
                badge={skin.badge}
              />
              {filters.selectedSkins.includes(skin.id) && (
                <div className={styles.checkIcon}>
                  <Image
                    src={greenCheckIcon}
                    alt='Выбрано'
                    width={42}
                    height={42}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
