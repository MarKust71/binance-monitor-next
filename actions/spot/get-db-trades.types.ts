import {
  DbTrade,
  DbTradePagination,
} from '@/stores/db-trades-store/db.trades.store.types'

export type GetDbTrades = {
  data: DbTrade[]
  pagination: DbTradePagination
}
