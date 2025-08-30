'use client'

import { useState } from 'react'
import { ReferralTab } from '../ReferralTab/ReferralTab'
import { TransactionsTab } from '../TransactionsTab/TransactionsTab'
import styles from './ProfileTabs.module.scss'

interface IProfileTabsProps {
  activeTab?: 'transactions' | 'referral'
  onTabChange?: (tab: 'transactions' | 'referral') => void
}

export const ProfileTabs: React.FC<IProfileTabsProps> = ({
  activeTab: controlledActiveTab,
  onTabChange
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<
    'transactions' | 'referral'
  >('transactions')

  // Используем контролируемое состояние если передано, иначе внутреннее
  const activeTab = controlledActiveTab ?? internalActiveTab

  const handleTabChange = (tab: 'transactions' | 'referral') => {
    if (onTabChange) {
      onTabChange(tab)
    } else {
      setInternalActiveTab(tab)
    }
  }

  return (
    <div className={styles.profileTabs}>
      {/* Навигация табов */}
      <div className={styles.tabsNavigation}>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'transactions' ? styles.active : ''
          }`}
          onClick={() => handleTabChange('transactions')}
        >
          Транзакции
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === 'referral' ? styles.active : ''
          }`}
          onClick={() => handleTabChange('referral')}
        >
          Реферальная программа
        </button>
      </div>

      {/* Контент табов */}
      <div className={styles.tabContent}>
        {activeTab === 'transactions' && <TransactionsTab />}

        {activeTab === 'referral' && <ReferralTab />}
      </div>
    </div>
  )
}
