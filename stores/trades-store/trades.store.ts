import { create } from 'zustand'
import { TradesState } from './trades.store.types'

export const useTradesStore = create<TradesState>((set) => ({
  trades: [],
  isFetching: false,

  setTrades: (trades) => set(() => ({ trades })),

  addTrade: (trade) =>
    set((state) => ({ trades: { ...state.trades, [trade.id]: trade } })),

  removeTrade: (tradeId) =>
    set((state) => {
      const trades = state.trades.filter((t) => t.id !== tradeId)
      return { trades }
    }),

  clearTrades: () => set(() => ({ trades: [] })),

  calculateProfit: (price: number) =>
    set((state) => {
      const recalculatedTrades = state.trades.map((trade) => ({
        ...trade,
        profit: (trade.side === 'BUY'
          ? (price - trade.price) * trade.qty
          : (trade.price - price) * trade.qty
        ).toFixed(6),
      }))

      return { trades: recalculatedTrades }
    }),

  setIsFetching: (isFetching) => set(() => ({ isFetching })),
}))
