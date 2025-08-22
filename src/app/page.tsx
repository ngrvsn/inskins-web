import styles from './page.module.scss'

export const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Добро пожаловать в Inskins</h1>
          <p className={styles.subtitle}>
            Надежный сервис для продаж скинов Steam с быстрыми выплатами
          </p>

          <div className={styles.actions}>
            <button className={styles.primaryButton}>Продать скины</button>
            <button className={styles.secondaryButton}>Купить скины</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
