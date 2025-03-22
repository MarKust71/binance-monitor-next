import { DbTradeQueryParams } from '@/stores/db-trades-store/db.trades.store.types'

export type GetDbTradesParams = {
  offset?: number
  limit?: number
  customQueryParams?: Partial<DbTradeQueryParams>
}
