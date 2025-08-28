/**
 * Утилита для копирования текста в буфер обмена
 */

/**
 * Копирует текст в буфер обмена с обработкой ошибок
 * @param text - текст для копирования
 * @returns Promise<boolean> - true если копирование успешно, false если произошла ошибка
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Проверяем поддержку Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      // Используем современный Clipboard API
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback для старых браузеров или небезопасного контекста
      return fallbackCopyToClipboard(text)
    }
  } catch (error) {
    console.error('Ошибка при копировании в буфер обмена:', error)
    // Пробуем fallback метод в случае ошибки
    return fallbackCopyToClipboard(text)
  }
}

/**
 * Fallback метод копирования для старых браузеров
 * @param text - текст для копирования
 * @returns boolean - true если копирование успешно, false если произошла ошибка
 */
const fallbackCopyToClipboard = (text: string): boolean => {
  try {
    // Создаем временный textarea элемент
    const textArea = document.createElement('textarea')
    textArea.value = text

    // Делаем элемент невидимым
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'

    // Добавляем в DOM
    document.body.appendChild(textArea)

    // Выделяем текст
    textArea.focus()
    textArea.select()

    // Копируем в буфер обмена
    const successful = document.execCommand('copy')

    // Удаляем временный элемент
    document.body.removeChild(textArea)

    return successful
  } catch (error) {
    console.error('Ошибка в fallback методе копирования:', error)
    return false
  }
}

/**
 * Проверяет поддержку Clipboard API браузером
 * @returns boolean - true если Clipboard API поддерживается
 */
export const isClipboardSupported = (): boolean => {
  return !!(navigator.clipboard && window.isSecureContext)
}