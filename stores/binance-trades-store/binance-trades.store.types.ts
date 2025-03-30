import { ParsedBinanceTrade } from '@/utils'

export type BinanceTradesState = {
  trades: ParsedBinanceTrade[]
  isFetching: boolean
  setTrades: (trades: ParsedBinanceTrade[]) => void
  addTrade: (trade: ParsedBinanceTrade) => void
  removeTrade: (tradeId: number) => void
  clearTrades: () => void
  calculateProfit: (price: number) => void
  setIsFetching: (isFetching: boolean) => void
}
