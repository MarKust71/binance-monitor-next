import { ParsedTrade } from '@/utils'

export type TradesState = {
  trades: ParsedTrade[]
  setTrades: (trades: ParsedTrade[]) => void
  addTrade: (trade: ParsedTrade) => void
  removeTrade: (tradeId: number) => void
  clearTrades: () => void
  calculateProfit: (price: number) => void
}
