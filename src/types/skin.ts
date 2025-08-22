import { StaticImageData } from 'next/image'

export interface ISkinItem {
    id: string
    title: string
    price: number
    image: string | StaticImageData
    badge?: string
    status: 'available' | 'unavailable'
    game: 'csgo' | 'rust' | 'dota2'
}