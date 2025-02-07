import { DbTrade } from '@/stores/db-trades-store/db.trades.store.types'

export type GetDbTrades = {
  data: DbTrade[]
  pagination: {
    has_next: boolean
    limit: number
    offset: number
    total: number
  }
}
