import dayjs from 'dayjs'

/**
 * Рассчитывает дату выплаты (текущая дата + 8 дней)
 * @returns Строка с датой в формате "DD.MM.YYYY HH:mm"
 */
export const calculatePayoutDate = (): string => {
  return dayjs().add(8, 'day').format('DD.MM.YYYY HH:mm')
}

/**
 * Генерирует текст о Steam Trade Protection с актуальной датой выплаты
 * @returns Строка с информацией о выплате
 */
export const getPayoutProtectionText = (): string => {
  const payoutDate = calculatePayoutDate()
  return `выплата за скины будет произведена через 8 дней (после ${payoutDate})`
}