'use client'

import styles from './Statistics.module.scss'

const statisticsData = [
  {
    id: 1,
    value: '1 556',
    label: 'Активных лота'
  },
  {
    id: 2,
    value: '3 000',
    label: 'Продаж'
  },
  {
    id: 3,
    value: '14 000',
    label: 'Суммарных выплат'
  },
  {
    id: 4,
    value: 'на 14%',
    label: 'Цена ниже, чем в Steam'
  }
]

export const Statistics = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>ОБ INSKINS</h2>
        <div className={styles.stats}>
          {statisticsData.map((stat, index) => (
            <div key={stat.id} className={styles.statItem}>
              <div className={styles.valueContainer}>
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
              </div>
              {index < statisticsData.length - 1 && (
                <div className={styles.separator}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}