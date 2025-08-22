import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.scss'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'

const sfProText = localFont({
  src: [
    {
      path: '../fonts/SFProText-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/SFProText-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/SFProText-Semibold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../fonts/SFProText-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  title: 'Inskins - Надежный сервис для продаж скинов Steam',
  description: 'Надежный сервис для продаж скинов Steam с быстрыми выплатами',
}

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='ru'>
      <body className={sfProText.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
