'use client'

import { SkinCard } from '@/components/ui'
import styles from './RecentDeals.module.scss'
import mockCard from '@/assets/images/mockCard.png'

const mockDeals = [
  {
    id: 1,
    title: 'AK-47 | Redline',
    price: '2 450.00',
    badge: 'FT'
  },
  {
    id: 2,
    title: 'AWP | Dragon Lore',
    price: '125 000.00',
    badge: 'MW'
  },
  {
    id: 3,
    title: 'M4A4 | Howl',
    price: '45 600.00',
    badge: 'FN'
  },
  {
    id: 4,
    title: 'Karambit | Fade',
    price: '89 200.00'
  },
  {
    id: 5,
    title: 'Glock-18 | Water Elemental',
    price: '850.00',
    badge: 'ST™'
  },
  {
    id: 6,
    title: 'USP-S | Kill Confirmed',
    price: '3 200.00',
    badge: 'MW'
  }
]

export const RecentDeals = () => {
  return (
    <section className={styles.section}>
      <div className={styles.rightTopEllipse}></div>
      <div className={styles.rightBottomEllipse}></div>

      <div className={`${styles.container} container`}>
        <h2 className={styles.title}>Последние сделки</h2>
        <div className={styles.grid}>
          {mockDeals.map((deal) => (
            <SkinCard
              key={deal.id}
              title={deal.title}
              price={deal.price}
              image={mockCard}
              badge={deal.badge}
            />
          ))}
        </div>
      </div>
    </section>
  )
}