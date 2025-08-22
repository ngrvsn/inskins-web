import { Breadcrumbs, PageTitle } from '@/components/ui'

export default function MarketPage() {
  const breadcrumbItems = [
    { label: 'Маркет' }
  ]

  return (
    <div className="container">
      <Breadcrumbs items={breadcrumbItems} />
      <PageTitle>Маркет</PageTitle>

      {/* Здесь будет контент страницы */}
      <div style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
        Контент страницы "Маркет" будет здесь
      </div>
    </div>
  )
}