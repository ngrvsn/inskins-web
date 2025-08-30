'use client'

import styles from './ReferralTab.module.scss'

interface IReferralTabProps {}

export const ReferralTab: React.FC<IReferralTabProps> = () => {
  return (
    <div className={styles.referralTab}>
      <div className={styles.placeholder}>
        <div className={styles.icon}>🚧</div>
        <h3>Реферальная программа</h3>
        <p>
          Данный раздел находится в разработке.
          <br />
          Скоро здесь появится возможность приглашать друзей и получать бонусы!
        </p>
        <div className={styles.comingSoon}>Скоро...</div>
      </div>
    </div>
  )
}
