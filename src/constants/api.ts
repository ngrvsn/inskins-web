import { env } from 'next-runtime-env'

export const API_BASE_URL =
  env('NEXT_PUBLIC_API_BASE_URL') || 'https://back.inskins.in'
