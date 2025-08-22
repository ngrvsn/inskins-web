'use client'

import { GameSelector, SortDropdown, SearchInput } from '@/components/ui'
import styles from './ControlsPanel.module.scss'

interface IGameOption {
  value: string
  label: string
}

interface IControlsPanelProps {
  selectedGame: string
  onGameChange: (game: string) => void
  sortOrder: 'asc' | 'desc'
  onSortChange: (order: 'asc' | 'desc') => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

const gameOptions: IGameOption[] = [
  { value: 'all', label: 'Все игры' },
  { value: 'cs2', label: 'CS2' },
  { value: 'dota2', label: 'Dota 2' },
  { value: 'rust', label: 'Rust' }
]

export const ControlsPanel = ({
  selectedGame,
  onGameChange,
  sortOrder,
  onSortChange,
  searchQuery,
  onSearchChange
}: IControlsPanelProps) => {
  return (
    <div className={styles.controlsPanel}>
      <GameSelector
        value={selectedGame}
        onChange={onGameChange}
        options={gameOptions}
      />
      <SortDropdown value={sortOrder} onChange={onSortChange} />
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder='Поиск по скинам'
      />
    </div>
  )
}
