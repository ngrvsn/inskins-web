// Модель для работы с токенами авторизации
// Импортируем функции управления токенами из централизованного места
export {
  getTokensFromStorage,
  saveTokensToStorage,
  clearTokensFromStorage,
  isTokenExpired,
} from '../config/interceptors'