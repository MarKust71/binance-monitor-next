import {
  DbTrade,
  DbTradePagination,
} from '@/stores/db-trades-store/db.trades.store.types'

export type FetchDbTrades = {
  data: DbTrade[]
  pagination: DbTradePagination
}
