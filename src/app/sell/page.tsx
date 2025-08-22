'use client'

import { useState } from 'react'
import {
  Breadcrumbs,
  PageTitle,
  SteamLinkInput,
  SteamLoginButton
} from '@/components/ui'
import { SkinsGrid } from '@/components/Sell/SkinsGrid/SkinsGrid'
import { PaymentSidebar } from '@/components/Sell/PaymentSidebar/PaymentSidebar'
import { RecentDeals } from '@/components/RecentDeals/RecentDeals'
import { Statistics } from '@/components/Statistics/Statistics'
import InfoSection from '@/components/Sell/InfoSection/InfoSection'
import { ISkinItem } from '@/types/skin'
import { useAuth } from '@/hooks/useAuth'
import styles from './page.module.scss'

export default function SellPage() {
  const { isAuthenticated, login } = useAuth()
  const [steamLink, setSteamLink] = useState<string>('')
  const [selectedSkins, setSelectedSkins] = useState<ISkinItem[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('sbp')

  const breadcrumbItems = [{ label: 'Продать скины' }]

  const handleLinkChange = (link: string) => {
    setSteamLink(link)
  }

  const handleSelectionChange = (skins: ISkinItem[]) => {
    setSelectedSkins(skins)
  }

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method)
  }

  const handleProceed = () => {
    console.log('Proceeding with:', {
      selectedSkins,
      paymentMethod: selectedPaymentMethod,
      steamLink
    })
    // Здесь будет логика перехода к следующему шагу
  }

  return (
    <div className='container'>
      <Breadcrumbs items={breadcrumbItems} />
      <PageTitle>Продать скины</PageTitle>

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div
            className={`${styles.steamLinkSection} ${
              !isAuthenticated ? styles.disabled : ''
            }`}
          >
            <SteamLinkInput onLinkChange={handleLinkChange} />
          </div>
          <SkinsGrid
            onSelectionChange={handleSelectionChange}
            steamLink={steamLink}
            isAuthenticated={isAuthenticated}
            onLogin={login}
          />
        </div>

        <div
          className={`${styles.rightColumn} ${
            !isAuthenticated ? styles.disabled : ''
          }`}
        >
          <PaymentSidebar
            selectedSkins={selectedSkins}
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
            onProceed={handleProceed}
          />
        </div>
      </div>

      <InfoSection className={styles.infoSection} />
      <RecentDeals />
      <Statistics />
    </div>
  )
}
