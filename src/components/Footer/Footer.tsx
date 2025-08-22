'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.scss'
import logo from '@/assets/images/logo.png'
import telegramFooter from '@/assets/icons/telegram-footer.svg'
import russianFlag from '@/assets/icons/russian-flag.svg'
import visaFooter from '@/assets/icons/visa-footer.svg'
import mastercardFooter from '@/assets/icons/mastercard-footer.svg'
import sberpayFooter from '@/assets/icons/sberpay-footer.svg'
import sbpFooter from '@/assets/icons/sbp-footer.svg'
import umoneyFooter from '@/assets/icons/umoney-footer.svg'
import { CurrencySelector } from '../ui'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        {/* Основная часть футера */}
        <div className={styles.mainContent}>
          {/* Левая часть - логотип и описание */}
          <div className={styles.leftSection}>
            <Link href='/' className={styles.logo}>
              <Image src={logo} alt='Inskins' width={120} height={48} />
            </Link>
            <p className={styles.description}>
              Надежный сервис для продаж скинов Steam с быстрыми выплатами
            </p>
          </div>

          {/* Центральная часть - навигация в 3 колонки */}
          <div className={styles.navigation}>
            <div className={styles.navColumn}>
              <h4 className={styles.navTitle}>МАРКЕТ</h4>
              <Link href='/buy-skins' className={styles.navLink}>
                Купить скины
              </Link>
              <Link href='/sell-skins' className={styles.navLink}>
                Продать скины
              </Link>
            </div>

            <div className={styles.navColumn}>
              <h4 className={styles.navTitle}>ПОМОЩЬ</h4>
              <Link href='/faq' className={styles.navLink}>
                FAQ
              </Link>
              <Link href='/contacts' className={styles.navLink}>
                Контакты
              </Link>
            </div>

            <div className={styles.navColumn}>
              <h4 className={styles.navTitle}>ПОЛЕЗНОЕ</h4>
              <Link href='/privacy' className={styles.navLink}>
                Политика конфиденциальности
              </Link>
              <Link href='/terms' className={styles.navLink}>
                Способы оплаты
              </Link>
              <Link href='/api' className={styles.navLink}>
                API
              </Link>
            </div>
          </div>

          {/* Правая часть - соц сети и настройки */}
          <div className={styles.rightSection}>
            <div className={styles.socialSection}>
              <h4 className={styles.socialTitle}>Соц. сети:</h4>
              <Link href='https://t.me/inskins' className={styles.socialLink}>
                <Image
                  src={telegramFooter}
                  alt='Telegram'
                  width={36}
                  height={36}
                />
              </Link>
            </div>

            <div className={styles.controls}>
              {/* Выбор валюты */}
              <CurrencySelector />

              {/* Выбор языка */}
              <div className={styles.controlGroup}>
                <button className={styles.languageButton}>
                  <Image
                    src={russianFlag}
                    alt='Русский'
                    width={16}
                    height={16}
                  />
                  Русский
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>ООО «Инскинс» © 2025</div>

          <div className={styles.paymentMethods}>
            <Image src={visaFooter} alt='Visa' width={32} height={20} />
            <Image
              src={mastercardFooter}
              alt='Mastercard'
              width={32}
              height={20}
            />
            <Image src={sberpayFooter} alt='SberPay' width={32} height={20} />
            <Image src={sbpFooter} alt='СБП' width={32} height={20} />
            <Image src={umoneyFooter} alt='ЮMoney' width={32} height={20} />
          </div>
        </div>
      </div>
    </footer>
  )
}
