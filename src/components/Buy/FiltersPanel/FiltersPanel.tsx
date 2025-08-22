'use client'

import { useState } from 'react'
import styles from './FiltersPanel.module.scss'

interface IFilters {
  priceRange: { min: number; max: number }
  rarity: string[]
  collection: string[]
  phase: string[]
}

interface IFiltersPanelProps {
  filters: IFilters
  onFiltersChange: (filters: IFilters) => void
  onResetFilters: () => void
}

interface ICollapsibleSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

interface ICheckboxGroupProps {
  options: { value: string; label: string; color?: string }[]
  selected: string[]
  onChange: (selected: string[]) => void
}

interface IPriceRangeProps {
  min: number
  max: number
  value: { min: number; max: number }
  onChange: (range: { min: number; max: number }) => void
}

// Компонент сворачивающейся секции
const CollapsibleSection = ({
  title,
  isOpen,
  onToggle,
  children
}: ICollapsibleSectionProps) => {
  return (
    <div className={styles.collapsibleSection}>
      <button className={styles.sectionHeader} onClick={onToggle}>
        <span className={styles.sectionTitle}>{title}</span>
        <svg
          className={`${styles.dropdownIcon} ${isOpen ? styles.open : ''}`}
          width='12'
          height='8'
          viewBox='0 0 12 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1 1.5L6 6.5L11 1.5'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      {isOpen && <div className={styles.sectionContent}>{children}</div>}
    </div>
  )
}

// Компонент для группы чекбоксов
const CheckboxGroup = ({
  options,
  selected,
  onChange
}: ICheckboxGroupProps) => {
  const handleCheckboxChange = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value]
    onChange(newSelected)
  }

  return (
    <div className={styles.checkboxList}>
      {options.map((option) => (
        <label key={option.value} className={styles.checkboxLabel}>
          <input
            type='checkbox'
            checked={selected.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            className={styles.checkbox}
          />
          <span
            className={styles.checkboxText}
            style={option.color ? { color: option.color } : {}}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}

// Компонент для диапазона цен с двойным ползунком
const PriceRange = ({ min, max, value, onChange }: IPriceRangeProps) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.max(
      min,
      Math.min(parseInt(e.target.value) || min, value.max)
    )
    onChange({ min: newMin, max: value.max })
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.min(
      max,
      Math.max(parseInt(e.target.value) || max, value.min)
    )
    onChange({ min: value.min, max: newMax })
  }

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseInt(e.target.value), value.max)
    onChange({ min: newMin, max: value.max })
  }

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseInt(e.target.value), value.min)
    onChange({ min: value.min, max: newMax })
  }

  return (
    <div className={styles.priceRange}>
      <div className={styles.priceInputs}>
        <div className={styles.priceInputWrapper}>
          <input
            type='number'
            value={value.min.toFixed(2)}
            onChange={handleMinInputChange}
            className={styles.priceInput}
          />
          <span className={styles.currency}>₽</span>
        </div>
        <span className={styles.separator}>-</span>
        <div className={styles.priceInputWrapper}>
          <input
            type='number'
            value={value.max.toFixed(2)}
            onChange={handleMaxInputChange}
            className={styles.priceInput}
          />
          <span className={styles.currency}>₽</span>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          <div
            className={styles.sliderRange}
            style={{
              left: `${((value.min - min) / (max - min)) * 100}%`,
              width: `${((value.max - value.min) / (max - min)) * 100}%`
            }}
          />
        </div>
        <input
          type='range'
          min={min}
          max={max}
          value={value.min}
          onChange={handleMinSliderChange}
          className={`${styles.slider} ${styles.sliderMin}`}
        />
        <input
          type='range'
          min={min}
          max={max}
          value={value.max}
          onChange={handleMaxSliderChange}
          className={`${styles.slider} ${styles.sliderMax}`}
        />
      </div>
    </div>
  )
}

export const FiltersPanel = ({
  filters,
  onFiltersChange,
  onResetFilters
}: IFiltersPanelProps) => {
  // Состояние для сворачивания секций
  const [openSections, setOpenSections] = useState({
    price: true,
    rarity: true,
    collection: true,
    phase: true
  })

  // Опции для редкости с цветовой индикацией
  const rarityOptions = [
    { value: 'consumer', label: 'Ширпотреб', color: '#B0C3D9' },
    { value: 'industrial', label: 'Промышленное', color: '#5E98D9' },
    { value: 'milspec', label: 'Армейское качество', color: '#4B69FF' },
    { value: 'restricted', label: 'Запрещенное', color: '#8847FF' },
    { value: 'classified', label: 'Засекреченное', color: '#D32CE6' },
    { value: 'covert', label: 'Тайное', color: '#EB4B4B' }
  ]

  // Опции для коллекций
  const collectionOptions = [
    { value: 'mirage', label: 'Mirage Collection' },
    { value: 'inferno', label: 'Inferno 2018' }
  ]

  // Опции для фаз
  const phaseOptions = [
    { value: 'phase1', label: 'Phase 1' },
    { value: 'phase2', label: 'Phase 2' },
    { value: 'phase3', label: 'Phase 3' },
    { value: 'phase4', label: 'Phase 4' }
  ]

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handlePriceRangeChange = (newRange: { min: number; max: number }) => {
    onFiltersChange({
      ...filters,
      priceRange: newRange
    })
  }

  const handleRarityChange = (selected: string[]) => {
    onFiltersChange({
      ...filters,
      rarity: selected
    })
  }

  const handleCollectionChange = (selected: string[]) => {
    onFiltersChange({
      ...filters,
      collection: selected
    })
  }

  const handlePhaseChange = (selected: string[]) => {
    onFiltersChange({
      ...filters,
      phase: selected
    })
  }

  return (
    <div className={styles.filtersPanel}>
      <h3 className={styles.title}>Фильтры</h3>

      <CollapsibleSection
        title='По цене'
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      >
        <PriceRange
          min={0}
          max={10000}
          value={filters.priceRange}
          onChange={handlePriceRangeChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title='По редкости'
        isOpen={openSections.rarity}
        onToggle={() => toggleSection('rarity')}
      >
        <CheckboxGroup
          options={rarityOptions}
          selected={filters.rarity}
          onChange={handleRarityChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title='По коллекции'
        isOpen={openSections.collection}
        onToggle={() => toggleSection('collection')}
      >
        <CheckboxGroup
          options={collectionOptions}
          selected={filters.collection}
          onChange={handleCollectionChange}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title='По фазе'
        isOpen={openSections.phase}
        onToggle={() => toggleSection('phase')}
      >
        <CheckboxGroup
          options={phaseOptions}
          selected={filters.phase}
          onChange={handlePhaseChange}
        />
      </CollapsibleSection>

      <button onClick={onResetFilters} className={styles.resetButton}>
        Сбросить все фильтры
      </button>
    </div>
  )
}
