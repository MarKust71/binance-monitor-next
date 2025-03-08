import { ParsedTrade } from '@/utils'

export type BinanceTradesState = {
  trades: ParsedTrade[]
  isFetching: boolean
  setTrades: (trades: ParsedTrade[]) => void
  addTrade: (trade: ParsedTrade) => void
  removeTrade: (tradeId: number) => void
  clearTrades: () => void
  calculateProfit: (price: number) => void
  setIsFetching: (isFetching: boolean) => void
}
