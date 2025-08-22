import styles from './InfoSection.module.scss'

interface IInfoSectionProps {
  className?: string
}

const InfoSection: React.FC<IInfoSectionProps> = ({ className }) => {
  return (
    <section className={`${styles.infoSection} ${className || ''}`}>
      <p className={styles.text}>
        Хочешь продать скины CS2. CS:GO и Dota 2? Тогда тебе на INSKINS. Здесь ты можешь,
        совершенно не напрягаясь сдать свои скины в любом количестве, моментально получив
        реальные средства на любую платежную систему или банковскую карту. Никаких аукционов,
        поисков покупателя и сложных схем. Все просто: зайди через аккаунт Steam, выбери
        вещи КС ГО, КС2 или Дота 2 из инвентаря, которые тебе мешают и получи деньги в
        течение нескольких секунд. INSKINS — это самый легкий и надежный способ вывести
        скины в деньги.
      </p>
    </section>
  )
}

export default InfoSection