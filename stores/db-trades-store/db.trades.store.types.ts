export type DbSide = 'buy' | 'sell'

export type DbTradeStatus =
  | 'open'
  | 'closed'
  | 'partial'
  | 'safe'
  | 'take_profit'
  | 'none'

export const dbTradeStatuses: DbTradeStatus[] = [
  'open',
  'partial',
  'safe',
  'take_profit',
  'closed',
  'none',
]

export type DbTrade = {
  id: number
  date_time: string
  symbol: string
  side: DbSide
  quantity: number
  rest_quantity: number
  price: number
  atr: number
  stop_loss: number
  take_profit: number
  close_price: number | null
  take_profit_safe: number
  take_profit_safe_price: number | null
  take_profit_safe_quantity: number | null
  take_profit_safe_date_time: string | null
  take_profit_partial: number
  take_profit_partial_price: number | null
  take_profit_partial_quantity: number | null
  take_profit_partial_date_time: string | null
  is_closed: boolean
  status: DbTradeStatus
  close_date_time: number | null
  created_at: string
  updated_at: string
}

export type DbTradePagination = {
  has_next: boolean
  limit: number
  offset: number
  total: number
}

export type DbTradeQueryParams = {
  excludeStatuses?: DbTradeStatus[]
}

export type DbTradesState = {
  trades: DbTrade[]
  pagination: DbTradePagination
  isFetching: boolean
  queryParams: Partial<DbTradeQueryParams>
  setTrades: (trades: DbTrade[]) => void
  setPagination: (pagination: DbTradePagination) => void
  setIsFetching: (isFetching: boolean) => void
  setQueryParams: (queryParams: Partial<DbTradeQueryParams>) => void
}
