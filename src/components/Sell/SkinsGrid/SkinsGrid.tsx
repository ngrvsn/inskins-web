'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  SkinCard,
  GameSelector,
  SearchInput,
  SortDropdown,
  SelectAllCheckbox,
  RefreshButton,
  Spinner
} from '@/components/ui'
import { ISkinItem } from '@/types/skin'
import { AuthPrompt } from '../AuthPrompt/AuthPrompt'
import type {
  IUserInventoryWithPricesResponseDto,
  IUserInventoryItemWithPricesDto
} from '@/api/users/types'
import styles from './SkinsGrid.module.scss'
import mockCard from '@/assets/images/mockCard.png'
import greenCheckIcon from '@/assets/icons/green-check.svg'

interface ISkinsGridProps {
  onSelectionChange: (selectedSkins: ISkinItem[]) => void
  steamLink?: string
  inventoryData?: IUserInventoryWithPricesResponseDto | null
  selectedGameId?: number
  onGameChange?: (gameId: number) => void
  isAuthenticated?: boolean
  isLoading?: boolean
  inventoryError?: string | null
}

interface IFilterState {
  game: string
  search: string
  sort: 'asc' | 'desc'
  selectedSkins: string[]
}

// Мок данные для демонстрации (показываются только если нет Steam ссылки)
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
  { value: '730', label: 'CS2' },
  { value: '252490', label: 'Rust' },
  { value: '570', label: 'Dota 2' }
]

// Функция для маппинга данных API в ISkinItem
const mapInventoryItemToSkinItem = (
  item: IUserInventoryItemWithPricesDto,
  gameId: number
): ISkinItem => {
  // Определяем игру по gameId
  let game: 'csgo' | 'rust' | 'dota2' = 'csgo'
  if (gameId === 252490) game = 'rust'
  else if (gameId === 570) game = 'dota2'

  // Получаем цену из различных источников с приоритетом
  const price =
    item.prices?.suggested ||
    item.prices?.market ||
    item.prices?.steam ||
    item.prices?.buff ||
    0

  return {
    id: item.assetId,
    title: item.market_name || item.name,
    price: Math.round(price), // Округляем цену до целого числа
    image: item.image || mockCard,
    badge: item.exterior,
    status: item.tradable && item.marketable ? 'available' : 'unavailable',
    game
  }
}

export const SkinsGrid = ({
  onSelectionChange,
  steamLink,
  inventoryData,
  selectedGameId = 730,
  onGameChange,
  isAuthenticated = true,
  isLoading = false,
  inventoryError = null
}: ISkinsGridProps) => {
  const [filters, setFilters] = useState<IFilterState>({
    game: selectedGameId.toString(),
    search: '',
    sort: 'desc',
    selectedSkins: []
  })

  // Синхронизируем локальное состояние с пропсом selectedGameId
  useEffect(() => {
    setFilters((prev) => ({ ...prev, game: selectedGameId.toString() }))
  }, [selectedGameId])

  // Сбрасываем выбранные скины при смене данных инвентаря или игры
  useEffect(() => {
    setFilters((prev) => ({ ...prev, selectedSkins: [] }))
    onSelectionChange([])
  }, [inventoryData, selectedGameId]) // Убираем onSelectionChange из зависимостей

  // Получаем скины из API данных или используем мок данные
  const allSkins = useMemo(() => {
    // Если есть Steam ссылка, но нет данных инвентаря - не показываем мок данные
    if (steamLink && !inventoryData) {
      return []
    }

    // Если есть данные инвентаря, маппим их в ISkinItem
    if (inventoryData && inventoryData.items.length > 0) {
      return inventoryData.items
        .map((item) => mapInventoryItemToSkinItem(item, inventoryData.gameId))
        .filter((skin) => skin.price > 0) // Показываем только скины с ценой
    }

    // Если нет Steam ссылки, показываем мок данные для демонстрации
    if (!steamLink) {
      return mockSkins
    }

    return []
  }, [inventoryData, steamLink])

  // Фильтрация и сортировка скинов
  const filteredSkins = useMemo(() => {
    let result = allSkins.filter((skin) => {
      // Если есть данные инвентаря, показываем только скины из этого инвентаря
      // Иначе фильтруем по выбранной игре (для мок данных)
      const matchesGame = inventoryData
        ? true
        : (selectedGameId === 730 && skin.game === 'csgo') ||
          (selectedGameId === 252490 && skin.game === 'rust') ||
          (selectedGameId === 570 && skin.game === 'dota2')

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
  }, [allSkins, selectedGameId, inventoryData, filters.search, filters.sort])

  // Обработчики фильтров
  const handleGameChange = useCallback(
    (game: string) => {
      setFilters((prev) => ({ ...prev, game }))
      // Передаем изменение игры в родительский компонент
      if (onGameChange) {
        onGameChange(parseInt(game))
      }
    },
    [onGameChange]
  )

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }, [])

  const handleSortChange = useCallback((sort: 'asc' | 'desc') => {
    setFilters((prev) => ({ ...prev, sort }))
  }, [])

  // Обработчики выбора скинов
  const handleSkinSelect = useCallback(
    (skinId: string) => {
      setFilters((prev) => {
        const newSelectedSkins = prev.selectedSkins.includes(skinId)
          ? prev.selectedSkins.filter((id) => id !== skinId)
          : [...prev.selectedSkins, skinId]

        // Передаем выбранные скины родительскому компоненту
        const selectedSkinsData = allSkins.filter((skin) =>
          newSelectedSkins.includes(skin.id)
        )
        onSelectionChange(selectedSkinsData)

        return { ...prev, selectedSkins: newSelectedSkins }
      })
    },
    [allSkins, onSelectionChange]
  )

  const handleSelectAll = useCallback(() => {
    const allFilteredIds = filteredSkins.map((skin) => skin.id)
    const isAllSelected = allFilteredIds.every((id) =>
      filters.selectedSkins.includes(id)
    )

    const newSelectedSkins = isAllSelected
      ? filters.selectedSkins.filter((id) => !allFilteredIds.includes(id))
      : [...new Set([...filters.selectedSkins, ...allFilteredIds])]

    setFilters((prev) => ({ ...prev, selectedSkins: newSelectedSkins }))

    const selectedSkinsData = allSkins.filter((skin) =>
      newSelectedSkins.includes(skin.id)
    )
    onSelectionChange(selectedSkinsData)
  }, [filteredSkins, filters.selectedSkins, allSkins, onSelectionChange])

  const handleRefresh = useCallback(() => {
    // Сбрасываем выбранные скины при обновлении
    setFilters((prev) => ({ ...prev, selectedSkins: [] }))
    onSelectionChange([])
    // Логика обновления данных будет реализована в родительском компоненте
  }, [onSelectionChange])

  const isAllSelected =
    filteredSkins.length > 0 &&
    filteredSkins.every((skin) => filters.selectedSkins.includes(skin.id))

  return (
    <div className={styles.container}>
      {/* Панель фильтров */}
      <div
        className={`${styles.filterPanel} ${
          !isAuthenticated || isLoading ? styles.disabled : ''
        }`}
      >
        <GameSelector
          value={selectedGameId.toString()}
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

      {/* Сетка скинов или различные состояния */}
      <div className={styles.skinsGrid}>
        {!isAuthenticated ? (
          <div className={styles.authPrompt}>
            <AuthPrompt />
          </div>
        ) : isLoading ? (
          <div className={styles.loadingContainer}>
            <Spinner size='large' color='green' />
            <p className={styles.loadingText}>Загрузка инвентаря...</p>
          </div>
        ) : inventoryError ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{inventoryError}</p>
          </div>
        ) : steamLink && inventoryData && inventoryData.items.length === 0 ? (
          <div className={styles.emptyInventory}>
            <p className={styles.emptyText}>
              Инвентарь пуст или не содержит предметов для продажи
            </p>
          </div>
        ) : steamLink && !inventoryData && !isLoading ? (
          <div className={styles.noInventoryData}>
            <p className={styles.noInventoryText}>
              Введите корректную ссылку на обмен Steam для загрузки инвентаря
            </p>
          </div>
        ) : filteredSkins.length === 0 && (steamLink || allSkins.length > 0) ? (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>
              Не найдено предметов по заданным фильтрам
            </p>
          </div>
        ) : (
          filteredSkins.map((skin) => (
            <div
              key={skin.id}
              className={`${styles.skinCardWrapper} ${
                filters.selectedSkins.includes(skin.id) ? styles.selected : ''
              } ${skin.status === 'unavailable' ? styles.unavailable : ''}`}
              onClick={() =>
                skin.status === 'available' && handleSkinSelect(skin.id)
              }
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
