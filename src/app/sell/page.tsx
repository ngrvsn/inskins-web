'use client'

import { useState, useCallback } from 'react'
import {
  Breadcrumbs,
  PageTitle,
  SteamLinkInput,
  Spinner
} from '@/components/ui'
import { SkinsGrid } from '@/components/Sell/SkinsGrid/SkinsGrid'
import { PaymentSidebar } from '@/components/Sell/PaymentSidebar/PaymentSidebar'
import { RecentDeals } from '@/components/RecentDeals/RecentDeals'
import { Statistics } from '@/components/Statistics/Statistics'
import InfoSection from '@/components/Sell/InfoSection/InfoSection'
import { ISkinItem } from '@/types/skin'
import { useAuth } from '@/hooks/useAuth'
import { type PaymentMethodId } from '@/components/ui/PaymentCard/PaymentCard'
import {
  EPaymentMethod,
  type IUserInventoryWithPricesResponseDto
} from '@/api/users/types'
import styles from './page.module.scss'

export default function SellPage() {
  const { isAuthenticated, isLoading, error } = useAuth()
  const [steamLink, setSteamLink] = useState<string>('')
  const [selectedGameId, setSelectedGameId] = useState<number>(730) // По умолчанию CS2
  const [inventoryData, setInventoryData] =
    useState<IUserInventoryWithPricesResponseDto | null>(null)
  const [inventoryError, setInventoryError] = useState<string | null>(null)
  const [selectedSkins, setSelectedSkins] = useState<ISkinItem[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethodId>(EPaymentMethod.SBP)

  const breadcrumbItems = [{ label: 'Продать скины' }]

  const handleLinkChange = useCallback(
    (
      link: string,
      inventory?: IUserInventoryWithPricesResponseDto,
      error?: string
    ) => {
      setSteamLink(link)
      setInventoryData(inventory || null)
      setInventoryError(error || null)
    },
    []
  )

  const handleGameChange = useCallback((gameId: number) => {
    setSelectedGameId(gameId)
    // Сбрасываем данные инвентаря и ошибки при смене игры
    setInventoryData(null)
    setInventoryError(null)
    setSelectedSkins([])
  }, [])

  const handleSelectionChange = useCallback((skins: ISkinItem[]) => {
    setSelectedSkins(skins)
  }, [])

  const handlePaymentMethodChange = useCallback((method: PaymentMethodId) => {
    setSelectedPaymentMethod(method)
  }, [])

  const handleProceed = useCallback(() => {
    // Здесь будет логика перехода к следующему шагу
  }, [])

  // Показываем индикатор загрузки при проверке авторизации
  if (isLoading) {
    return (
      <div className='container'>
        <Breadcrumbs items={breadcrumbItems} />
        <PageTitle>Продать скины</PageTitle>

        <div className={styles.loadingContainer}>
          <Spinner size='large' color='green' />
          <p className={styles.loadingText}>Проверка авторизации...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='container'>
      <Breadcrumbs items={breadcrumbItems} />
      <PageTitle>Продать скины</PageTitle>

      {/* Отображение ошибки авторизации */}
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <div
            className={`${styles.steamLinkSection} ${
              !isAuthenticated || isLoading ? styles.disabled : ''
            }`}
          >
            <SteamLinkInput
              onLinkChange={handleLinkChange}
              withTitle
              gameId={selectedGameId}
            />
          </div>
          <SkinsGrid
            onSelectionChange={handleSelectionChange}
            steamLink={steamLink}
            inventoryData={inventoryData}
            selectedGameId={selectedGameId}
            onGameChange={handleGameChange}
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            inventoryError={inventoryError}
          />
        </div>

        <div
          className={`${styles.rightColumn} ${
            !isAuthenticated || isLoading ? styles.disabled : ''
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
